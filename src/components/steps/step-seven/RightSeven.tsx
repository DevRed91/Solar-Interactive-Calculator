'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Image from 'next/image';
import { ConfettiOneIcon, ConfettiTwoIcon } from '@/components/icons';
import { useSolarCalculationResult } from '@/services/calculation-service';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { TextItem } from '@/lib/types';
import MixColorsText from '@/components/ui/MixColorsText/MixColorsText';

const RightSeven = () => {
  const navigate = useCustomRouter();
  const calculation = useSolarCalculationResult();
  const { dictionary } = useTranslation();

  return (
    <RightSectionWrapper
      title={dictionary['step-seven'].right.title as TextItem[]}
      nextButton={{
        content: dictionary['step-seven'].right.buttons.next,
        onClick: () => navigate.push('/step-eight'),
      }}
      previousButton={{
        content: dictionary['step-seven'].right.buttons.back,
        onClick: () => navigate.push('/step-five'),
        variant: 'tertiary',
      }}
      className="!gap-0"
    >
      <div className="font-dm-sans flex flex-grow flex-col items-center justify-between gap-10 pt-8 pb-[30px]">
        <div className="relative flex h-[173px] flex-col items-center justify-center">
          <div className="relative text-[92px] font-bold">
            <span className="text-green-success-500 absolute inset-0 -translate-y-2">
              ₹{calculation?.data?.lifetime_savings}
            </span>
            <span className="relative z-10 text-transparent [-webkit-text-stroke:1.71px_var(--color-green-success-500)]">
              ₹{calculation?.data?.lifetime_savings}
            </span>
          </div>
          <div className="text-[32px]/[45px] font-semibold text-neutral-200">
            {dictionary['step-seven'].right.lifetimeSavings.label}
          </div>
          <span className="absolute -top-[5%] -left-[10%]">
            <ConfettiOneIcon />
          </span>
          <span className="absolute top-1/2 -left-[15%]">
            <div className="h-[3px] w-3 rotate-[173deg] bg-red-800" />
          </span>
          <span className="absolute -bottom-[5%] -left-[10%]">
            <ConfettiTwoIcon />
          </span>
          <span className="absolute -top-[5%] -right-[10%]">
            <div className="h-[3px] w-3 rotate-[150deg] bg-[#FFC700]" />
          </span>
          <span className="absolute top-1/2 -right-[15%]">
            <ConfettiOneIcon className="-rotate-[19deg] [&_path]:stroke-[#2F38CF]" />
          </span>
          <span className="absolute -right-[10%] -bottom-[5%]">
            <ConfettiTwoIcon className="-rotate-[118deg] [&_path]:fill-[#53A8FF]" />
          </span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid w-full grid-cols-2 gap-3">
            <div className="flex h-[141px] items-center gap-[18px] rounded-xl bg-green-600 px-6 py-2">
              <Image
                height={0}
                width={0}
                sizes="100vw"
                alt="money"
                src="/icons/step-seven/money.svg"
                className="h-16 w-14"
              />
              <div className="flex flex-col">
                <h1 className="font-poppins text-green-success-500 text-[54px]/[76px] font-semibold">
                  ₹{calculation?.data?.monthly_savings}
                </h1>
                <div className="text-3xl font-medium text-neutral-100">
                  {dictionary['step-seven'].right.monthlySavings.label}
                </div>
              </div>
            </div>
            <div className="flex h-[141px] items-center gap-[18px] rounded-xl bg-green-600 p-6">
              <Image
                height={0}
                width={0}
                sizes="100vw"
                alt="money"
                src="/icons/step-seven/money.svg"
                className="h-16 w-14"
              />
              <div className="flex flex-col">
                <h1 className="font-poppins text-green-success-500 text-[54px]/[76px] font-semibold">
                  ₹{calculation?.data?.one_year_savings}
                </h1>
                <div className="text-3xl font-medium text-neutral-100">
                  {dictionary['step-seven'].right.yearlySavings.label}
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex flex-col gap-1 overflow-hidden rounded-2xl bg-linear-(--good-zero-bg) pt-5 pr-16 pb-6 pl-5">
            <MixColorsText
              content={dictionary['step-seven'].right.goodZero.title}
              contentClassName="!font-dm-sans !text-[28px]/[39px] -tracking-[1.12px]"
            />
            <div className="text-black-500 font-dm-sans text-2xl/[34px] font-medium -tracking-[0.96px]">
              {dictionary['step-seven'].right.goodZero.subtitle}
            </div>
            <Image
              height={0}
              width={0}
              sizes="100vw"
              alt="good-zero"
              src="/icons/step-seven/good-zero.svg"
              className="absolute right-0 bottom-0 h-[120px] w-[120px]"
            />
          </div>
          <div className="font-dm-sans bg-background-200 w-full rounded-xl p-3 text-center text-lg/[25px] font-medium tracking-[-0.72px] text-neutral-400">
            {dictionary['step-seven'].right.disclaimer}
          </div>
        </div>
      </div>
    </RightSectionWrapper>
  );
};

export default RightSeven;
