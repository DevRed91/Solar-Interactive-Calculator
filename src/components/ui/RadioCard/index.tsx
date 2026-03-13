'use client';
import { CheckMarkIcon } from '@/components/icons';
import { RadioCardProps } from '@/lib/types';
import React, { FC } from 'react';

const RadioCard: FC<RadioCardProps> = ({
  data: { title, area, description },
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`border-2 p-8 pr-0 ${isSelected ? `bg-primary-100 border-primary-400` : 'bg-background-200 border-background-400'} w-full cursor-pointer rounded-xl`}
      onClick={onSelect}
    >
      <div className="flex items-center gap-8">
        {isSelected ? (
          <div className="bg-primary-500 flex h-8 w-8 items-center justify-center rounded-full p-1.5">
            <CheckMarkIcon />
          </div>
        ) : (
          <div className="border-brand-blue-500 flex h-8 w-8 items-center justify-center rounded-full border-2">
            <span className="sr-only">Radio button</span>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <h3
            className={`${isSelected ? 'text-primary-500' : 'text-black-500'} font-dm-sans text-[32px] font-semibold`}
          >
            {title} ({area})
          </h3>
          <p className="text-black-300 font-dm-sans text-2xl font-normal">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RadioCard;
