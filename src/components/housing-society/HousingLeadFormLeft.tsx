'use client';
import Image from 'next/image';
import MixColorsText from '../ui/MixColorsText/MixColorsText';
import useTranslation from '@/hooks/useTranslation';
import { TextItem } from '@/lib/types';

const HousingLeadFormLeft = () => {
  const { dictionary } = useTranslation();
  return (
    <div className="relative h-full w-full">
      <Image
        src={'/images/housing-society.png'}
        sizes="100vw"
        width={0}
        height={0}
        alt="House-image"
        className="relative z-0 h-full w-full object-cover"
      />
      <div className="absolute right-[60px] bottom-[60px] left-[60px] z-10 flex flex-col gap-4">
        <MixColorsText
          content={
            dictionary.housingAndBusinessLeftSection.housingTitle as TextItem[]
          }
          contentClassName="!text-[54px]/[75px] !font-bold !tracking-[-1.08px]"
        />
        <p className="text-background-400 text-[32px]/[44px] font-medium tracking-[-1.28px]">
          {dictionary.housingAndBusinessLeftSection.subtitle}
        </p>
      </div>

      <div className="absolute bottom-0 h-[498px] w-full bg-gradient-to-t from-[#00010D]" />
    </div>
  );
};

export default HousingLeadFormLeft;
