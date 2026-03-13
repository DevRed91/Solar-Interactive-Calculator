'use client';
import { Controller, useForm } from 'react-hook-form';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Input from '@/components/ui/Input';
import TelephoneInput from '@/components/ui/TelephoneInput';
import { BusinessStepOneInputs, TextItem } from '@/lib/types';
import { useBusinessFormStore } from '@/lib/store';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { getFieldRules, useIsFormEqual } from '@/lib/utils';

const DEFAULT_VALUES = {
  name: '',
  phone: '',
  city: '',
  pinCode: '',
};

const RightSectionStepOne = () => {
  const router = useCustomRouter();
  const { setName, setPhoneNumber, setCompanyPinCode } = useBusinessFormStore();
  const { dictionary } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<BusinessStepOneInputs>({
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = (data: BusinessStepOneInputs) => {
    console.log(data);
    setName(data.name);
    setPhoneNumber(data.phone);
    setCompanyPinCode(data.pinCode);
    router.push('/business-step-two');
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary['businessStepOne'].title as TextItem[]}
      description={dictionary['businessStepOne'].subtitle}
      nextButton={{
        content: dictionary['businessStepOne'].buttons.next,
        onClick: handleSubmit(onSubmit),
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      previousButton={{
        content: dictionary['businessStepOne'].buttons.back,
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
              placeHolderText={dictionary.formValidations.phonePlaceholder}
              onChange={onChange}
              errorText={errors?.phone?.message}
            />
          )}
        />
        <div className="flex gap-6">
          <Input
            {...register('city', {
              ...getFieldRules(
                dictionary.formValidations.rules.fieldKeys.city,
                2,
                50,
                dictionary.formValidations.rules.nameRules,
              ),
              pattern: {
                value: /^[a-zA-Z\s'-]+$/,
                message: getFieldRules(
                  dictionary.formValidations.rules.fieldKeys.city,
                  2,
                  50,
                  dictionary.formValidations.rules.nameRules,
                ).pattern.message,
              },
            })}
            placeholderText={dictionary.formValidations.cityPlaceholder}
            className="w-full"
            errorText={errors?.city?.message}
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
            className="w-full"
            type="number"
            onWheel={(e) => e.currentTarget.blur()}
            errorText={errors?.pinCode?.message}
          />
        </div>
      </div>
    </RightSectionWrapper>
  );
};

export default RightSectionStepOne;
