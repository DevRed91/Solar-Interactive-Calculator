'use client';
import { BackSpaceIcon } from '@/components/icons';
import React, { useEffect, useState } from 'react';
import Input from '../Input';

interface NumpadProps {
  onChange?: (value: string) => void;
  errorText?: string;
  inputLimit?: number;
  defaultInput?: string;
  className?: string;
  inputPlaceholderText?: string;
}

const Numpad = ({
  onChange,
  errorText,
  inputLimit = 4,
  defaultInput = '',
  className = '',
  inputPlaceholderText = 'Enter PIN Code',
}: NumpadProps) => {
  const [input, setInput] = useState<string>(defaultInput);

  const handleButtonClick = (value: string) => {
    const updated = input + value;
    if (updated.length <= inputLimit) {
      setInput(updated);
      onChange?.(updated);
    }
  };

  const handleClear = () => {
    const updated = input.slice(0, -1);
    setInput(updated);
    onChange?.(updated);
  };

  useEffect(() => {
    setInput(defaultInput);
  }, [defaultInput]);

  return (
    <div
      className={`mt-10 flex h-full w-full flex-col items-center ${className}`}
    >
      <Input
        placeholderText={inputPlaceholderText}
        className="mb-3 w-full text-center !text-[40px]/14 placeholder:font-medium"
        value={input}
        readOnly
        floatingLabel={false}
        errorText={errorText}
      />
      <div className="mt-2 grid h-full w-full grid-cols-3 gap-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, '.', 0]?.map((number) => (
          <button
            key={number}
            onClick={() =>
              number !== '.' && handleButtonClick(number.toString())
            }
            disabled={number === '.'}
            className={`${
              number === '.'
                ? 'cursor-not-allowed opacity-30'
                : 'cursor-pointer'
            } bg-black-10 text-black-500 flex items-center justify-center rounded-lg px-16.5 py-2.5 text-[54px] leading-[84px] font-semibold`}
          >
            {number}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="bg-black-10 flex cursor-pointer items-center justify-center rounded-lg px-16.5 py-2.5"
        >
          <BackSpaceIcon />
        </button>
      </div>
    </div>
  );
};

export default Numpad;
