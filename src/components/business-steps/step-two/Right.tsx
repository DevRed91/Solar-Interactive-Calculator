'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import dynamic from 'next/dynamic';
const FilterDropDownText = dynamic(
  () => import('@/components/ui/FilterDropDownText'),
  {
    ssr: false,
  },
);
import Input from '@/components/ui/Input';
import { MONTHLY_ELECTRICITY_BILL_DATA } from '@/data/constants';
import { useQueryParams } from '@/hooks/useQueryParams';
import { BusinessStepTwoInputs, TextItem } from '@/lib/types';
import { Controller, useForm } from 'react-hook-form';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { getFieldRules, useIsFormEqual } from '@/lib/utils';
import { useLeadSubmitBusiness } from '@/services/calculation-service';
import { useBusinessFormStore } from '@/lib/store';

const DEFAULT_VALUES = {
  name: '',
  monthlyElectricityBill: '',
};

const RightSectionStepTwo = () => {
  const router = useCustomRouter();
  const { getParam, setParams } = useQueryParams();
  const leadSubmitBusiness = useLeadSubmitBusiness();
  const { name, phoneNumber, pinCode } = useBusinessFormStore();
  const { dictionary } = useTranslation();

  const {
    handleSubmit,
    register,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<BusinessStepTwoInputs>({
    defaultValues: {
      name: '',
      monthlyElectricityBill: getParam('monthlyElectricityBill') || '',
    },
  });

  const onSubmit = (data: BusinessStepTwoInputs) => {
    console.log(data);
    leadSubmitBusiness.mutate(
      {
        name: name,
        c_name: data.name,
        mob_no: phoneNumber,
        com_pincode: pinCode,
        bill: data.monthlyElectricityBill,
        source: 'EC',
      },
      {
        onSuccess: () => {
          reset();
          router.push('/business-step-three');
        },
      },
    );
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary.businessStepTwo.title as TextItem[]}
      description={dictionary.businessStepTwo.subtitle}
      nextButton={{
        content: dictionary.businessStepTwo.buttons.submit,
        onClick: handleSubmit(onSubmit),
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      previousButton={{
        content: dictionary.businessStepTwo.buttons.back,
        onClick: () => router.push('/business-step-one'),
        variant: 'tertiary',
      }}
    >
      <div className="mt-5 flex flex-1 flex-col gap-6">
        <Input
          {...register('name', {
            ...getFieldRules(
              dictionary.formValidations.rules.fieldKeys.company,
              2,
              50,
              dictionary.formValidations.rules.nameRules,
            ),
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message: getFieldRules(
                dictionary.formValidations.rules.fieldKeys.company,
                2,
                50,
                dictionary.formValidations.rules.nameRules,
              ).pattern.message,
            },
          })}
          placeholderText={dictionary.formValidations.companyPlaceholder}
          className="w-full"
          errorText={errors.name?.message}
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
              wrapperClassName="[&>div]:min-h-[108px] [&>div>div>span]:text-[22.5px]/normal"
              label={getParam('monthlyElectricityBill') ?? ''}
              placeholder={dictionary.formValidations.monthlyBillPlaceholder}
              errorText={errors?.monthlyElectricityBill?.message}
            />
          )}
        />
        {/* TODO: remove this field after confirmation */}
        {/* <Input
          {...register('designation', {
            ...getFieldRules(
              dictionary.formValidations.rules.fieldKeys.designation,
              2,
              50,
              dictionary.formValidations.rules.nameRules,
            ),
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message: getFieldRules(
                dictionary.formValidations.rules.fieldKeys.designation,
                2,
                50,
                dictionary.formValidations.rules.nameRules,
              ).pattern.message,
            },
          })}
          placeholderText={dictionary.formValidations.designationPlaceholder}
          className="w-full"
          errorText={errors.designation?.message}
        /> */}
      </div>
    </RightSectionWrapper>
  );
};

export default RightSectionStepTwo;
