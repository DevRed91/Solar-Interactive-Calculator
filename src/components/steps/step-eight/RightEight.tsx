'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import { useSolarCalculationResult } from '@/services/calculation-service';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { TextItem } from '@/lib/types';

export const renderStyledText = (
  template: string,
  values: Record<string, string | undefined> = {},
) => {
  const replaced = template.replace(
    /{{(.*?)}}/g,
    (_, key) => values[key] || '',
  );

  const parts = replaced.split(/(<[^>]+>[^<]*<\/[^>]+>)/g).filter(Boolean);

  return parts?.map((part, i) => {
    if (part.startsWith('<light>')) {
      return <span key={i}>{part.replace(/<\/?light>/g, '')}</span>;
    }
    if (part.startsWith('<green>')) {
      return (
        <span key={i} className="text-green-success-500 font-bold">
          {part.replace(/<\/?green>/g, '')}
        </span>
      );
    }
    if (part.startsWith('<highlight>')) {
      return (
        <span
          key={i}
          className="text-primary-400 bg-primary-100 rounded-sm px-2.5 font-semibold"
        >
          {part.replace(/<\/?highlight>/g, '')}
        </span>
      );
    }
    if (part.startsWith('<strong>')) {
      return <strong key={i}>{part.replace(/<\/?strong>/g, '')}</strong>;
    }
    return (
      <span key={i} className="text-black-400 text-[32px] font-semibold">
        {part}
      </span>
    );
  });
};

const RightEight = () => {
  const calculation = useSolarCalculationResult();
  const navigate = useCustomRouter();
  const { dictionary } = useTranslation();
  const paybackPeriod = Math.ceil(
    Number(calculation?.data?.net_cost_price?.replaceAll(',', '')) /
      Number(calculation?.data?.monthly_savings?.replaceAll(',', '')) /
      12,
  );

  return (
    <RightSectionWrapper
      title={dictionary['step-eight'].right.title as TextItem[]}
      nextButton={{
        content: dictionary['step-eight'].right.buttons.cta,
        onClick: () => navigate.push('/step-nine'),
      }}
      previousButton={{
        content: dictionary['step-eight'].right.buttons.back,
        onClick: () => navigate.push('/step-seven'),
        variant: 'tertiary',
      }}
      className="[&>div:nth-child(2)]:grow-0"
    >
      <div className="font-dm-sans mb-auto flex w-full flex-col gap-6 py-4">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-3">
            <div className="text-black-400 col-span-2 text-3xl leading-10 font-medium">
              {dictionary['step-eight'].right.breakdown.totalCost}
            </div>
            <div className="text-black-500 text-end text-4xl font-semibold">
              ₹{calculation.data?.total_cost_price}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-black-400 col-span-2 text-3xl leading-10 font-medium">
              {dictionary['step-eight'].right.breakdown.pmsgySubsidy}
            </div>
            <div className="text-green-success-500 text-end text-4xl font-semibold">
              -₹{calculation.data?.central_subsidy}
            </div>
          </div>
          <div className="grid grid-cols-3">
            <div className="text-black-400 col-span-2 text-3xl leading-10 font-medium">
              {dictionary['step-eight'].right.breakdown.stateSubsidy}
            </div>
            <div className="text-green-success-500 text-end text-4xl font-semibold">
              -₹{calculation.data?.state_subsidy}
            </div>
          </div>
          <div className="border-black-100 grid grid-cols-3 border-t py-6">
            <div className="text-black-500 col-span-2 text-3xl leading-10 font-semibold">
              {dictionary['step-eight'].right.breakdown.netCost}
            </div>
            <div className="text-black-500 text-end text-4xl font-bold">
              ₹{calculation.data?.net_cost_price}
            </div>
          </div>
        </div>
        <div className="font-dm-sans bg-background-200 w-full rounded-xl p-3 text-lg/[25px] font-medium tracking-[-0.72px] text-neutral-400">
          {dictionary['step-eight'].right.disclaimer}
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-primary-50 rounded-xl px-5 py-4 text-[28px] leading-10 font-medium text-neutral-400">
            {renderStyledText(dictionary['step-eight'].right.savingsNote, {
              savings: calculation?.data?.monthly_savings,
              paybackPeriod: paybackPeriod.toString(),
            })}
          </div>
          <div className="bg-primary-50 rounded-xl px-6 py-4 text-[28px] leading-10 font-medium text-neutral-400">
            {renderStyledText(dictionary['step-eight'].right.roiNote, {
              roi: calculation?.data?.roi,
            })}
          </div>
        </div>
      </div>
    </RightSectionWrapper>
  );
};

export default RightEight;
