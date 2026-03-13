'use client';
import { Fragment } from 'react';
import Button from '@/components/ui/Button';
import { SmallRightArrowIcon } from '@/components/icons';
import MixColorsText from '@/components/ui/MixColorsText/MixColorsText';
import { RIGHT_ONE_DATA } from '@/data/constants';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { TextItem } from '@/lib/types';

const RightOne = () => {
  const navigate = useCustomRouter();
  const { info, footer } = RIGHT_ONE_DATA;
  const { dictionary } = useTranslation();

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="">
        <div className="flex flex-col gap-4">
          <MixColorsText content={dictionary['step-one'].title as TextItem[]} />
          <p className="font-dm-sans text-[32px]/[44px] font-medium text-neutral-50">
            {dictionary['step-one'].subtitle}
          </p>
        </div>
        <div className="mt-[86px] flex items-center gap-4">
          <div className="from-black-300 h-px w-full bg-gradient-to-l to-transparent" />
          <div className="text-black-300 font-dm-sans text-[32px]/[44px] font-medium whitespace-nowrap">
            {dictionary['step-one'].knowYour}
          </div>
          <div className="from-black-300 h-px w-full bg-gradient-to-r to-transparent" />
        </div>
        <div className="mt-[30px] flex items-center justify-around gap-12">
          {info?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="bg-secondary-blue-50 flex h-[100px] w-[100px] items-center justify-center rounded-full p-[25px]">
                <item.icon />
              </div>
              <p className="font-dm-sans max-w-32 text-center text-[28px]/[39px] font-medium -tracking-[1.12px] text-neutral-400">
                {dictionary['step-one'].metrics[index].label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <Button
          variant="primary"
          content={dictionary['step-one'].button.calculateSavings}
          className="animate-btn w-full"
          onClick={() => navigate.push('/step-two')}
        />
        <div className="flex items-center justify-between px-3 py-4">
          {footer?.map((item, index) => (
            <Fragment key={index}>
              <div
                onClick={() => navigate.push(item.href)}
                className="flex cursor-pointer items-center gap-2"
              >
                <item.icon />
                <p className="flex items-center">
                  <span className="text-primary-500 font-dm-sans text-[32px]/[44px] font-semibold">
                    {dictionary['step-one'].links[index]}
                  </span>
                  <SmallRightArrowIcon />
                </p>
              </div>
              {index === 0 && <div className="bg-black-200 h-11 w-0.5" />}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RightOne;
