'use client';
import { ArrowFilledIcon, ThumbIcon } from '@/components/icons';
import { CurrencySliderProps } from '@/lib/types';
import { formatDisplayPrice } from '@/lib/utils';
import { useState, useRef, useCallback, useEffect, useMemo } from 'react';

const CurrencySlider = ({
  direction = 'column',
  defaultPrice,
  startPrice,
  endPrice,
  incrementBy,
  className,
  currencyClassName,
  sliderClassName,
  onPrevClick,
  onNextClick,
  onDotClick,
  onChange,
}: CurrencySliderProps) => {
  const prices = useMemo(() => {
    const arr: number[] = [];
    for (let i = startPrice; i <= endPrice; i += incrementBy) {
      arr.push(i);
    }
    return arr;
  }, [startPrice, endPrice, incrementBy]);

  // Create an array of visual dots at intervals of 1000
  const visualDots: number[] = [];
  for (let i = startPrice; i <= endPrice; i += 1000) {
    if (i >= startPrice && i <= endPrice) {
      visualDots.push(i);
    }
  }

  const totalDots = prices?.length;

  const [activeIndex, setActiveIndex] = useState(
    defaultPrice
      ? Math.floor((defaultPrice - startPrice) / 100)
      : Math.floor(totalDots / 2),
  );

  const [isDragging, setIsDragging] = useState(false);
  const [dragStartIndex, setDragStartIndex] = useState<number | null>(null);

  const sliderRef = useRef<HTMLDivElement>(null);

  const formatSendPrice = (price: number) => price.toString();

  // Helper function to update active index WITHOUT calling onChange
  const updateActiveIndexOnly = useCallback((newIndex: number) => {
    setActiveIndex(newIndex);
  }, []);

  // Helper function to update active index and call onChange
  const updateActiveIndex = useCallback(
    (newIndex: number) => {
      setActiveIndex(newIndex);
      if (onChange) {
        onChange(formatSendPrice(prices[newIndex]));
      }
    },
    [onChange, prices],
  );

  // Handle click events on dots to update the active index
  const handleDotClick = (dotPrice: number) => {
    if (isDragging) return;
    const newIndex = prices.indexOf(dotPrice);
    if (newIndex !== -1) {
      updateActiveIndex(newIndex);
      if (onDotClick) {
        onDotClick(formatSendPrice(dotPrice));
      }
    }
  };

  // Move to the previous dot in the slider
  const handlePrev = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    updateActiveIndex(newIndex);
    if (onPrevClick) {
      onPrevClick(formatSendPrice(prices[newIndex]));
    }
  };

  // Move to the next dot in the slider
  const handleNext = () => {
    const newIndex = Math.min(totalDots - 1, activeIndex + 1);
    updateActiveIndex(newIndex);
    if (onNextClick) {
      onNextClick(formatSendPrice(prices[newIndex]));
    }
  };

  // Calculate the index based on the mouse position on the slider
  const getIndexFromPosition = useCallback(
    (clientX: number) => {
      if (!sliderRef.current) return activeIndex;
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = sliderRect.width;
      const relativeX = clientX - sliderRect.left;
      const percentage = Math.max(0, Math.min(1, relativeX / sliderWidth));
      const index = Math.round(percentage * (totalDots - 1));
      return Math.max(0, Math.min(totalDots - 1, index));
    },
    [activeIndex, totalDots],
  );

  // Set dragging state to true on mouse down event
  const handleMouseDown = () => {
    setIsDragging(true);
    setDragStartIndex(activeIndex);
  };

  // Update active index based on mouse movement while dragging (no onChange call)
  const handleMouseMove = useCallback(
    (event: globalThis.MouseEvent) => {
      if (!isDragging) return;
      const newIndex = getIndexFromPosition(event.clientX);
      if (newIndex !== activeIndex) {
        updateActiveIndexOnly(newIndex);
        if (onDotClick) {
          onDotClick(formatSendPrice(prices[newIndex]));
        }
      }
    },
    [
      isDragging,
      activeIndex,
      getIndexFromPosition,
      onDotClick,
      prices,
      updateActiveIndexOnly,
    ],
  );

  // Set dragging state to false on mouse up event and call onChange
  const handleMouseUp = useCallback(() => {
    if (isDragging && dragStartIndex !== activeIndex) {
      // Only call onChange if the index actually changed
      if (onChange) {
        onChange(formatSendPrice(prices[activeIndex]));
      }
    }
    setIsDragging(false);
    setDragStartIndex(null);
  }, [isDragging, dragStartIndex, activeIndex, onChange, prices]);

  // Set dragging state to true on touch start event
  const handleTouchStart = () => {
    setIsDragging(true);
    setDragStartIndex(activeIndex);
  };

  // Update active index based on touch movement while dragging (no onChange call)
  const handleTouchMove = useCallback(
    (event: globalThis.TouchEvent) => {
      if (!isDragging) return;
      const touch = event.touches[0];
      const newIndex = getIndexFromPosition(touch.clientX);
      if (newIndex !== activeIndex) {
        updateActiveIndexOnly(newIndex);
        if (onDotClick) {
          onDotClick(formatSendPrice(prices[newIndex]));
        }
      }
    },
    [
      isDragging,
      activeIndex,
      getIndexFromPosition,
      onDotClick,
      prices,
      updateActiveIndexOnly,
    ],
  );

  // Set dragging state to false on touch end event and call onChange
  const handleTouchEnd = useCallback(() => {
    if (isDragging && dragStartIndex !== activeIndex) {
      // Only call onChange if the index actually changed
      if (onChange) {
        onChange(formatSendPrice(prices[activeIndex]));
      }
    }
    setIsDragging(false);
    setDragStartIndex(null);
  }, [isDragging, dragStartIndex, activeIndex, onChange, prices]);

  // Calculate the transform value for slider positioning
  const getTransformValue = useCallback(
    (index: number) => {
      const percentage = index / (totalDots - 1);
      const transformValue = -44 * percentage;
      return `translateX(${transformValue}%)`;
    },
    [totalDots],
  );

  // Add and remove event listeners based on dragging state
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, {
        passive: false,
      });
      document.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    isDragging,
    handleMouseMove,
    handleMouseUp,
    handleTouchMove,
    handleTouchEnd,
  ]);

  return (
    <div className={`flex w-full flex-col gap-3 py-4 select-none ${className}`}>
      {/* Currency */}
      <div
        className={`font-poppins bg-background-300 text-brand-blue-400 rounded-xl py-4 text-center text-[54px]/[76px] font-medium ${currencyClassName}`}
      >
        {formatDisplayPrice(prices?.[activeIndex])}
      </div>

      {/* Slider with Navigation */}
      <div className={`flex h-30 items-center gap-3 ${sliderClassName}`}>
        <ArrowFilledIcon
          onClick={handlePrev}
          className="bg-black-10 h-full min-h-[64px] w-full max-w-[64px] rotate-180 cursor-pointer rounded-xl"
        />

        <div
          ref={sliderRef}
          className="bg-black-10 relative h-full w-full rounded-xl"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className="flex h-full w-full justify-evenly">
            {visualDots?.map((dotPrice, dotIndex) => (
              <div
                key={dotIndex}
                className="relative flex items-center justify-center"
              >
                <div
                  onClick={() => handleDotClick(dotPrice)}
                  className={`bg-black-100 h-3 w-3 cursor-pointer rounded-full`}
                />
              </div>
            ))}
          </div>

          <div
            className={`pointer-events-none absolute inset-y-0 cursor-grab active:cursor-grabbing ${
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{
              left: `${(activeIndex / (totalDots - 1)) * (direction === 'column' ? 92 : 93)}%`,
              transform: getTransformValue(activeIndex),
              userSelect: 'none',
            }}
          >
            <ThumbIcon className="h-full" />
          </div>
        </div>

        <ArrowFilledIcon
          onClick={handleNext}
          className="bg-black-10 h-full min-h-[64px] w-full max-w-[64px] cursor-pointer rounded-xl"
        />
      </div>
    </div>
  );
};

export default CurrencySlider;
