'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import FilterDropDownText from '@/components/ui/FilterDropDownText';
import Input from '@/components/ui/Input';
import TelephoneInput from '@/components/ui/TelephoneInput';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { StepFiveFormData, TextItem } from '@/lib/types';
import { getFieldRules, useIsFormEqual } from '@/lib/utils';
import { useSendOtp } from '@/services/calculation-service';
import { useForm, Controller } from 'react-hook-form';

const DEFAULT_VALUES = {
  name: '',
  phone: '',
  source: '',
};

const RightFive = () => {
  const navigate = useCustomRouter();
  const {
    name,
    phoneNumber,
    source,
    setName,
    setPhoneNumber,
    setSource,
    setOtpSessionId,
  } = useSolarStore();
  const { dictionary } = useTranslation();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<StepFiveFormData>({
    defaultValues: {
      name: name,
      phone: phoneNumber,
      source: source,
    },
  });
  const sendOtpQuery = useSendOtp();

  const onSubmit = (data: StepFiveFormData) => {
    setName(data.name);
    setPhoneNumber(data.phone);
    setSource(data.source);

    sendOtpQuery.mutate(data.phone, {
      onSuccess: (data) => {
        if (data.statusCode === 200) {
          setOtpSessionId(data.result.sessionId);
          navigate.push(`/step-six`);
        }
      },
    });
  };

  const isSameAsDefault = useIsFormEqual(watch, DEFAULT_VALUES);

  return (
    <RightSectionWrapper
      title={dictionary['step-five'].title as TextItem[]}
      description={dictionary['step-five'].subtitle}
      nextButton={{
        content: dictionary['step-five'].buttons.next,
        onClick: handleSubmit(onSubmit),
        isLoading: sendOtpQuery.isPending,
        variant: !isSameAsDefault ? 'primary' : 'disable',
      }}
      previousButton={{
        content: dictionary['step-five'].buttons.back,
        onClick: () => navigate.push('/step-four'),
        variant: 'tertiary',
      }}
    >
      <>
        <form
          className={`${Object.keys(errors).length ? 'gap-4' : 'mt-10 gap-6'} flex h-full w-full flex-col`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholderText={dictionary.formValidations.namePlaceholder}
            className="w-full py-[27px] !font-medium"
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
            errorText={errors.name ? errors?.name.message : ''}
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
                placeHolderText={dictionary.formValidations.phonePlaceholder}
                value={value}
                onChange={onChange}
                errorText={errors?.phone?.message}
              />
            )}
          />
          <div className="flex flex-col gap-3">
            <p className="text-2xl leading-[34px] font-semibold -tracking-[0.96px] text-neutral-400">
              {dictionary.formValidations.sourceTitle}
            </p>
            <Controller
              name="source"
              control={control}
              rules={dictionary.formValidations.rules.source}
              render={({ field: { value, onChange } }) => (
                <FilterDropDownText
                  menuData={dictionary.formValidations.data.SOURCE_DATA}
                  onChange={onChange}
                  className="!top-auto !bottom-full mb-2 !max-h-[60vh]"
                  label={value}
                  placeholder={
                    value
                      ? undefined
                      : dictionary.formValidations.sourcePlaceholder
                  }
                  errorText={errors?.source?.message}
                />
              )}
            />
          </div>
        </form>
        <p className="font-dm-sans mb-4 text-[28px]/[39px] font-medium tracking-[-1px] text-neutral-100">
          {dictionary['step-five'].disclaimer}
        </p>
      </>
    </RightSectionWrapper>
  );
};

export default RightFive;
