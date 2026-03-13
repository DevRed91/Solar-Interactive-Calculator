'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import TagSelect from '@/components/ui/TagSelect/TagSelect';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useCHSFormStore, useSolarStore } from '@/lib/store';
import { HousingSocietyStepThreeInputs, TextItem } from '@/lib/types';
import { useIsFormEqual } from '@/lib/utils';
import { useLeadSubmitCHS } from '@/services/calculation-service';
import { useForm, Controller } from 'react-hook-form';

const DEFAULT_VALUES = {
  housingSocietyDesignation: '',
};

const HousingSocietyStepThree = () => {
  const router = useCustomRouter();
  const { dictionary } = useTranslation();
  const leadSubmitCHS = useLeadSubmitCHS();
  const { name, pinCode, phoneNumber } = useSolarStore();
  const { housingSociety, monthlyElectricityBill, approvalStatus } =
    useCHSFormStore();

  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<HousingSocietyStepThreeInputs>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: HousingSocietyStepThreeInputs) => {
    console.log(data);
    leadSubmitCHS.mutate(
      {
        society_name: housingSociety,
        name: name,
        mob_no: phoneNumber,
        designation: data.housingSocietyDesignation, // TODO
        bill: monthlyElectricityBill,
        pin: pinCode,
        source: 'EC',
        approval_status: approvalStatus,
      },
      {
        onSuccess: () => {
          reset();
          router.push('/housing-society-step-four');
        },
      },
    );
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary['housing-society-step-three'].title as TextItem[]}
      description={dictionary['housing-society-step-three'].subtitle}
      nextButton={{
        content: dictionary['housing-society-step-three'].buttons.submit,
        onClick: handleSubmit(onSubmit),
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      isSubmit={true}
      previousButton={{
        content: dictionary['housing-society-step-three'].buttons.back,
        onClick: () => router.push('/housing-society-step-two'),
        variant: 'tertiary',
      }}
    >
      <div className="flex flex-col gap-5">
        <Controller
          name="housingSocietyDesignation"
          control={control}
          rules={dictionary.formValidations.rules.housingSocietyDesignation}
          render={({ field: { onChange } }) => (
            <TagSelect
              data={dictionary['housing-society-step-three'].roles}
              onSelect={(option) => onChange(option.value)}
              errorText={errors.housingSocietyDesignation?.message}
            />
          )}
        />
      </div>
    </RightSectionWrapper>
  );
};

export default HousingSocietyStepThree;
