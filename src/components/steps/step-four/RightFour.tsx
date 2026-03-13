'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import RadioCard from '@/components/ui/RadioCard';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { TextItem } from '@/lib/types';

function RightFour() {
  const navigate = useCustomRouter();
  const { roofSize, setRoofSize } = useSolarStore();
  const { dictionary } = useTranslation();

  return (
    <RightSectionWrapper
      title={dictionary['step-four'].title as TextItem[]}
      description={dictionary['step-four'].subtitle}
      nextButton={{
        content: dictionary['step-four'].buttons.next,
        onClick: () => navigate.push('/step-five'),
      }}
      previousButton={{
        content: dictionary['step-four'].buttons.back,
        onClick: () => navigate.push('/step-three'),
        variant: 'tertiary',
      }}
    >
      <div className="mt-10 flex h-full flex-col gap-3">
        <div className="flex flex-col gap-3">
          {dictionary['step-four'].options?.map((data, index) => (
            <RadioCard
              key={index}
              data={data}
              onSelect={() => setRoofSize(data.value)}
              isSelected={data.value === roofSize}
            />
          ))}
        </div>
      </div>
    </RightSectionWrapper>
  );
}

export default RightFour;
