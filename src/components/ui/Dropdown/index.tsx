'use client';
import { ChevronIcon } from '@/components/icons';
import { DropDownProps } from '@/lib/types';
import { useState, useRef, useEffect } from 'react';

const Dropdown = ({
  options,
  onSelect,
  className = '',
  value,
  leftIcon,
}: DropDownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`bg-primary-500 relative w-[249px] cursor-pointer rounded-xl p-2.5 ${className}`}
    >
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full cursor-pointer items-center justify-between gap-[14px] transition outline-none"
      >
        <div className="flex flex-grow items-center justify-center gap-2 overflow-hidden">
          {leftIcon}
          <span className="text-background-50 font-dm-sans truncate text-[40px]/[56px]">
            {value
              ? options?.find((o) => o.value === value)?.label
              : options?.[0]?.label}
          </span>
        </div>
        <ChevronIcon
          className={`min-h-[34px] min-w-[34px] transition-all ${open ? '' : 'rotate-180'}`}
        />
      </button>
      <div
        className={`bg-background-50 absolute top-full right-0 mt-4 flex w-[368px] origin-top transform flex-col overflow-hidden rounded-xl transition-all duration-200 ${
          open
            ? 'max-h-fit scale-y-100 opacity-100'
            : 'max-h-0 scale-y-0 opacity-0'
        }`}
      >
        {options?.map((option) => (
          <div
            key={option.value}
            onClick={() => {
              onSelect(option.value);
              setOpen(false);
            }}
            className={`text-black-300 font-dm-sans cursor-pointer px-8 py-4 text-[32px]/[44px] font-medium ${
              value === option.value ? 'bg-primary-100' : ''
            }`}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
