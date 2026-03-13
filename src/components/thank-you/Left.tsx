"use client"
import Image from 'next/image';
import {
  CheckedIcon,
  EllipseLeftIcon,
  EllipseRightIcon,
  SmallRightArrowIcon,
} from '@/components/icons';
import MixColorsText from '@/components/ui/MixColorsText/MixColorsText';
import { useSolarStore } from '@/lib/store';
import { IThankYouLeft, TextItem } from '@/lib/types';
import useTranslation from '@/hooks/useTranslation';
import Button from '../ui/Button';
import { renderStyledText } from '../steps/step-eight/RightEight';
import useAutoRedirection from '@/hooks/useAutoRedirection';

const ThankYouLeft = ({ status }: IThankYouLeft) => {
  const { name } = useSolarStore();
  const { dictionary } = useTranslation();
  const { counter, resetAndGoHome } = useAutoRedirection();

  return (
    <div className="flex h-full w-full flex-col justify-between gap-8 bg-[url('/images/background/step-nine.webp')] bg-top bg-repeat-x p-14">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div className="bg-green-success-500 mb-2 flex h-[94px] w-[94px] items-center justify-center overflow-hidden rounded-full p-2">
            <CheckedIcon className="h-14 w-14" />
          </div>
          <p className="text-black-300 font-dm-sans text-[40px]/[56px] font-medium">
            {dictionary.thankYou.left.greeting.replace('{{name}}', name)}
          </p>
          <MixColorsText
            content={dictionary.thankYou.left.title as TextItem[]}
          />
        </div>
        <div className="border-b-black-100 flex items-center justify-between border-b pb-[43px]">
          {status?.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              {item.checked ? (
                <div className="bg-green-success-500 flex h-10 w-10 items-center justify-center overflow-hidden rounded-full p-2">
                  <CheckedIcon className="h-6 w-6" />
                </div>
              ) : (
                <div className="relative flex h-10 w-10 flex-col items-center justify-center overflow-visible">
                  <span className="text-black-500 font-dm-sans -ml-1 text-center text-[31px] leading-normal font-semibold italic">
                    {index + 1}
                  </span>
                  <EllipseLeftIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  <EllipseRightIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              )}
              <p
                className={`font-dm-sans text-[28px]/[39px] font-semibold -tracking-[1.12px] ${
                  item.checked ? 'text-green-success-500' : 'text-black-500'
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-6">
          <div className="text-black-300 font-dm-sans text-[32px]/[45px] font-semibold -tracking-[1.28px]">
            {dictionary.thankYou.left.expectSection.title}
          </div>
          <div className="grid grid-cols-2 gap-6">
            {dictionary.thankYou.left.expectSection.data?.map((item, index) => (
              <div
                key={index}
                className="border-background-400 flex h-[118px] items-center overflow-hidden rounded-xl border"
              >
                <div className="relative h-full min-w-fit">
                  <Image
                    height={0}
                    width={0}
                    sizes="100vw"
                    src={item.image}
                    alt={item.image}
                    className="h-full w-max max-w-[167px] object-cover"
                  />
                  <div className="absolute -inset-y-5 -right-5 w-28 bg-linear-(--thank-you-gradient)" />
                </div>
                <MixColorsText
                  content={item.content}
                  className="z-[1]"
                  contentClassName="!text-2xl/[34px] !font-dm-sans -tracking-[0.96px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex w-[90%] items-center gap-6">
        <Button
          variant="primary"
          content={dictionary['thankYou'].right.buttons.home}
          leftIcon={
            <SmallRightArrowIcon className="fill-background-50 h-10 w-10 rotate-180" />
          }
          onClick={resetAndGoHome}
          className="!w-1/2"
        />
        <p className="text-black-400 font-dm-sans [&>*]:text-[28px]/[39px] [&>span]:font-normal">
          {renderStyledText(dictionary.thankYou.right.redirectNote, {
            seconds: counter.toString(),
          })}
        </p>
      </div>
    </div>
  );
};

export default ThankYouLeft;
