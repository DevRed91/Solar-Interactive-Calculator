'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import CurrencySlider from '@/components/ui/CurrencySlider';
import { DEFAULT_CURRENCY_RANGE } from '@/data/constants';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { TextItem } from '@/lib/types';

function RightThree() {
  const navigate = useCustomRouter();
  const { electricityBill, setElectricityBill } = useSolarStore();
  const { dictionary } = useTranslation();

  return (
    <>
      <RightSectionWrapper
        title={dictionary['step-three'].title as TextItem[]}
        description={dictionary['step-three'].subtitle}
        nextButton={{
          content: dictionary['step-three'].buttons.next,
          onClick: () => navigate.push('/step-four'),
        }}
        previousButton={{
          content: dictionary['step-three'].buttons.back,
          onClick: () => navigate.push('/step-two'),
          variant: 'tertiary',
        }}
      >
        <div className="mt-10 h-full">
          <CurrencySlider
            defaultPrice={Number(electricityBill)}
            startPrice={DEFAULT_CURRENCY_RANGE.start}
            endPrice={DEFAULT_CURRENCY_RANGE.end}
            incrementBy={100}
            onChange={(value) => setElectricityBill(value)}
          />
        </div>
      </RightSectionWrapper>
    </>
  );
}

export default RightThree;
