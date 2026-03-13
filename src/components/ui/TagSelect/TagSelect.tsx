import { TagOption, TagSelectProps } from '@/lib/types';
import Image from 'next/image';
import React, { useState } from 'react';

const TagSelect = ({
  data,
  onSelect,
  errorText,
  className = '',
  tagClassName = '',
}: TagSelectProps) => {
  const [selectedOption, setSelectedOption] = useState<TagOption>();

  const handleSelectClick = (option: TagOption) => {
    setSelectedOption(option);
    onSelect(option);
  };

  return (
    <div className={`flex flex-wrap gap-4 bg-white py-4 ${className}`}>
      {data?.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSelectClick(option)}
          className={`flex shrink cursor-pointer items-center gap-5 rounded-xl text-2xl/10 font-semibold transition-all duration-150 ease-in-out ${option.img ? 'p-4' : 'px-8 py-4'} ${
            selectedOption?.value === option.value
              ? 'bg-primary-100 border-primary-400 text-primary-500 border-2'
              : 'bg-black-10 text-black-500 border-2 border-transparent'
          } ${tagClassName}`}
        >
          {option.img && (
            <Image
              src={option.img}
              alt={option.label}
              width={0}
              height={0}
              sizes="100vw"
              className="aspect-square h-[120px] w-[120px] object-contain object-center"
            />
          )}
          <span>{option.label}</span>
        </button>
      ))}
      {errorText && (
        <p className="font-dm-sans mt-2 w-full text-left text-2xl leading-none font-medium text-red-800">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default TagSelect;
