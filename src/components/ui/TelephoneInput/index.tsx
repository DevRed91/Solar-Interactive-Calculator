import React from 'react';
import Input from '../Input';
import Image from 'next/image';
import { TelephoneInputProps } from '@/lib/types';

const TelephoneInput = ({
  value,
  onChange,
  errorText,
  placeHolderText = 'Enter phone number',
}: TelephoneInputProps) => {
  return (
    <div className="relative flex gap-[22px] rounded-xl border-2 border-transparent">
      <div
        className={`absolute left-0 z-[1] flex ${errorText ? 'h-[calc(100%-40px)]' : 'h-full'} items-center gap-3 pr-[22px] pl-[30px]`}
      >
        <Image
          height={0}
          width={0}
          sizes="100vw"
          alt="india-flag"
          src="/images/india-flag.webp"
          className="aspect-[47/32] h-8 w-12"
        />
        <div className="text-[32px] font-semibold text-black">+91</div>
        <div className="border-background-400 h-[34px] border-r pl-2.5" />
      </div>
      <Input
        placeholderText={placeHolderText}
        parentClassName={`[&>div>label]:peer-focus:!pl-[250px] ${value ? '[&>div>label]:!pl-[222px]' : '[&>div>label]:!pl-[152px]'} [&>div>label]:peer-focus:!translate-x-0`}
        className="pl-[185px]"
        type="number"
        maxLength={10}
        value={value}
        onChange={onChange}
        errorText={errorText}
        name="phone"
      />
    </div>
  );
};

export default TelephoneInput;
