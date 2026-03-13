'use client';
import MixColorsText from '@/components/ui/MixColorsText/MixColorsText';
import { SAVINGS_IDEAS } from '@/data/constants';
import useTranslation from '@/hooks/useTranslation';
import { TextItem } from '@/lib/types';
import { useSolarCalculationResult } from '@/services/calculation-service';
import Image from 'next/image';

const LeftEight = () => {
  const calculation = useSolarCalculationResult();
  const { dictionary } = useTranslation();
  const lifeTimeSavings =
    Number(calculation.data?.lifetime_savings?.replace(/[^0-9]/g, '')) || 0;

  const formattedTitle = dictionary['step-eight'].left.title?.map((item) => ({
    ...item,
    text: item.text.replace('{{lifetime_savings}}', `${lifeTimeSavings}`),
  }));

  const lifeTimeSavingsData = SAVINGS_IDEAS?.find(
    (item) => lifeTimeSavings <= item.max,
  );

  const getIdeaText = (
    tierData: typeof lifeTimeSavingsData,
    index: number,
  ): string => {
    if (!tierData) return '';

    const ideas = dictionary['step-eight'].left.ideas;

    if (typeof ideas === 'object' && ideas !== null && !Array.isArray(ideas)) {
      const tierIdeas = (ideas as Record<string, string[]>)[tierData.id];
      return tierIdeas?.[index] || '';
    }
    return '';
  };

  return (
    <div className="flex h-full flex-col gap-8">
      <MixColorsText
        content={formattedTitle as TextItem[]}
        contentClassName="text-[54px] font-semibold"
      />
      <div className="font-dm-sans grid flex-grow grid-cols-2 grid-rows-2 gap-6">
        {lifeTimeSavingsData?.data?.map((data, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-xl px-5 pt-5"
            style={{ background: data.background }}
          >
            <h5 className="w-full text-3xl font-bold text-white">
              {getIdeaText(lifeTimeSavingsData, index)}
            </h5>
            <div className="absolute -right-1/3 -bottom-[30%] h-96 w-96 rounded-full bg-white/10" />
            <div className="absolute -right-1/12 -bottom-[13%] z-[1] h-56 w-56 rounded-full bg-white/10" />
            <Image
              height={0}
              width={0}
              alt="scooty"
              sizes="100vw"
              src={data.imgSrc}
              priority
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftEight;
