'use client';
import { Controller, useForm } from 'react-hook-form';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Input from '@/components/ui/Input';
import TelephoneInput from '@/components/ui/TelephoneInput';
import { HousingSocietyStepOneInputs, TextItem } from '@/lib/types';
import { useSolarStore } from '@/lib/store';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { getFieldRules, useIsFormEqual } from '@/lib/utils';

const DEFAULT_VALUES = { name: '', phone: '', pinCode: '' };

const HousingSocietyStepOne = () => {
  const router = useCustomRouter();
  const { setName, setPhoneNumber, setPinCode } = useSolarStore();
  const { dictionary } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm<HousingSocietyStepOneInputs>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: HousingSocietyStepOneInputs) => {
    console.log(data);
    setName(data.name);
    setPhoneNumber(data.phone);
    setPinCode(data.pinCode);
    reset();

    router.push('/housing-society-step-two');
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary['housing-society-step-one'].title as TextItem[]}
      description={dictionary['housing-society-step-one'].subtitle}
      nextButton={{
        content: dictionary['housing-society-step-one'].buttons.next,
        onClick: handleSubmit(onSubmit),
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      previousButton={{
        content: dictionary['housing-society-step-one'].buttons.back,
        onClick: () => router.push('/step-one'),
        variant: 'tertiary',
      }}
    >
      <div className="mt-8 flex flex-1 flex-col gap-6">
        <Input
          {...register('name', {
            ...getFieldRules(
              dictionary.formValidations.rules.fieldKeys.name,
              2,
              50,
              dictionary.formValidations.rules.nameRules,
            ),
            pattern: {
              value: /^[a-zA-Z\s'-]+$/,
              message: getFieldRules(
                dictionary.formValidations.rules.fieldKeys.name,
                2,
                50,
                dictionary.formValidations.rules.nameRules,
              ).pattern.message,
            },
          })}
          placeholderText={dictionary.formValidations.namePlaceholder}
          className="w-full"
          errorText={errors?.name?.message}
        />

        <Controller
          name="phone"
          control={control}
          rules={{
            ...dictionary.formValidations.rules.phoneRules,
            pattern: {
              value: /^[6789]/,
              message:
                dictionary.formValidations.rules.phoneRules.pattern.message,
            },
          }}
          render={({ field: { value, onChange } }) => (
            <TelephoneInput
              value={value}
              onChange={onChange}
              errorText={errors?.phone?.message}
              placeHolderText={dictionary.formValidations.phonePlaceholder}
            />
          )}
        />

        <Input
          {...register('pinCode', {
            ...dictionary.formValidations.rules.pinCodeRules,
            pattern: {
              value: /^[0-9]{6}$/,
              message:
                dictionary.formValidations.rules.pinCodeRules.pattern.message,
            },
          })}
          placeholderText={dictionary.formValidations.inputPinCodePlaceholder}
          type="number"
          className="w-full"
          errorText={errors?.pinCode?.message}
          onWheel={(e) => e.currentTarget.blur()}
        />
      </div>
    </RightSectionWrapper>
  );
};

export default HousingSocietyStepOne;
