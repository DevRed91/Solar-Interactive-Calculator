'use client';
import { MONTHLY_ELECTRICITY_BILL_DATA } from '@/data/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { HousingSocietyStepTwoInputs, TextItem } from '@/lib/types';
import { useForm, Controller } from 'react-hook-form';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import dynamic from 'next/dynamic';
const FilterDropDownText = dynamic(
  () => import('../../ui/FilterDropDownText'),
  { ssr: false },
);
import Input from '../../ui/Input';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { getFieldRules, useIsFormEqual } from '@/lib/utils';
import { useCHSFormStore } from '@/lib/store';

const DEFAULT_VALUES = {
  housingSociety: '',
  monthlyElectricityBill: '',
  approvalStatus: '',
};

const HousingSocietyStepTwo = () => {
  const router = useCustomRouter();
  const { getParam, setParams } = useQueryParams();
  const { dictionary } = useTranslation();
  const { setApprovalStatus, setHousingSociety, setMonthlyElectricityBill } =
    useCHSFormStore();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<HousingSocietyStepTwoInputs>({
    defaultValues: {
      housingSociety: '',
      monthlyElectricityBill: getParam('monthlyElectricityBill') || '',
      approvalStatus: getParam('approvalStatus') || '',
    },
  });

  const onSubmit = (data: HousingSocietyStepTwoInputs) => {
    console.log(data);
    setApprovalStatus(data.approvalStatus);
    setHousingSociety(data.housingSociety);
    setMonthlyElectricityBill(data.monthlyElectricityBill);
    reset();

    router.push('/housing-society-step-three');
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary['housing-society-step-two'].title as TextItem[]}
      description={dictionary['housing-society-step-two'].subtitle}
      nextButton={{
        content: dictionary['housing-society-step-two'].buttons.next,
        onClick: handleSubmit(onSubmit),
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      previousButton={{
        content: dictionary['housing-society-step-two'].buttons.back,
        onClick: () => router.push('/housing-society-step-one'),
        variant: 'tertiary',
      }}
    >
      <div className="mt-8 flex flex-1 flex-col gap-6">
        <Input
          {...register('housingSociety', {
            ...getFieldRules(
              dictionary.formValidations.rules.fieldKeys.housing,
              2,
              50,
              dictionary.formValidations.rules.nameRules,
            ),
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message: getFieldRules(
                dictionary.formValidations.rules.fieldKeys.housing,
                2,
                50,
                dictionary.formValidations.rules.nameRules,
              ).pattern.message,
            },
          })}
          placeholderText={dictionary.formValidations.societyNamePlaceholder}
          className="w-full"
          errorText={errors?.housingSociety?.message}
        />
        <Controller
          name="monthlyElectricityBill"
          control={control}
          rules={dictionary.formValidations.rules.monthlyElectricityBill}
          render={({ field: { onChange } }) => (
            <FilterDropDownText
              menuData={MONTHLY_ELECTRICITY_BILL_DATA}
              onChange={(value) => {
                onChange(value);
                setParams({ monthlyElectricityBill: value });
              }}
              label={getParam('monthlyElectricityBill') ?? ''}
              placeholder={dictionary.formValidations.monthlyBillPlaceholder}
              wrapperClassName="w-[500px] [&>div]:min-h-[108px] [&>div>div>span]:text-[22.5px]/normal"
              errorText={errors?.monthlyElectricityBill?.message}
            />
          )}
        />
        <Controller
          name="approvalStatus"
          control={control}
          rules={dictionary.formValidations.rules.approvalStatus}
          render={({ field: { onChange } }) => (
            <FilterDropDownText
              menuData={
                dictionary.formValidations.data.AGM_APPROVAL_STATUS_DATA
              }
              onChange={(value) => {
                onChange(value);
                setParams({ approvalStatus: value });
              }}
              label={getParam('approvalStatus') ?? ''}
              placeholder={dictionary.formValidations.agmStatusPlaceholder}
              wrapperClassName="w-[500px] [&>div]:min-h-[108px] [&>div>div>span]:text-[22.5px]/normal"
              errorText={errors?.approvalStatus?.message}
            />
          )}
        />
      </div>
    </RightSectionWrapper>
  );
};

export default HousingSocietyStepTwo;
