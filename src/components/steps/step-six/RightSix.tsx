'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Numpad from '@/components/ui/Numpad';
import { OTP_INPUT_LIMIT } from '@/data/constants';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { TextItem } from '@/lib/types';
import {
  useGetSolarCalculations,
  useSendOtp,
  useVerifyOtp,
} from '@/services/calculation-service';
import React, { useState, useEffect } from 'react';

const RightSix = () => {
  const [otp, setOtp] = useState<{ value: string; message: string }>({
    value: '',
    message: '',
  });
  const [timer, setTimer] = useState<number>(60);
  const [canResend, setCanResend] = useState<boolean>(false);
  const navigate = useCustomRouter();
  const {
    phoneNumber,
    pinCode,
    name,
    electricityBill,
    otpSessionId,
    setOtpSessionId,
    ecId,
    source,
  } = useSolarStore();
  const solarCalculations = useGetSolarCalculations();
  const { dictionary } = useTranslation();
  const verifyOtpQuery = useVerifyOtp();
  const sendOtpQuery = useSendOtp();

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    if (canResend) {
      sendOtpQuery.mutate(phoneNumber, {
        onSuccess: (data) => {
          if (data.statusCode === 200) {
            setOtpSessionId(data.result.sessionId);
            setOtp(() => ({ value: '', message: '' }));
            setTimer(60);
            setCanResend(false);
          }
        },
      });
    }
  };

  const handleNextStep = () => {
    verifyOtpQuery.mutate(
      {
        session_id: otpSessionId,
        otp: otp.value,
      },
      {
        onSuccess: (data) => {
          if (data.statusCode === 200) {
            setOtpSessionId('');
            setOtp((prev) => ({ ...prev, message: '' }));

            const body = {
              name: name,
              mobile: phoneNumber,
              pincode: pinCode?.toString(),
              average_monthly_bill: electricityBill,
              source: 'EC',
              ec_id: ecId,
              source_secondary: source,
            };

            solarCalculations.mutate(body, {
              onSuccess: () => {
                navigate.push('/step-seven');
              },
            });
          } else {
            setOtp((prev) => ({ ...prev, message: data.message }));
          }
        },
      },
    );
  };

  return (
    <>
      <RightSectionWrapper
        title={dictionary['step-six'].title as TextItem[]}
        nextButton={{
          content: dictionary['step-six'].buttons.submit,
          onClick: () => handleNextStep(),
          isLoading: verifyOtpQuery.isPending || solarCalculations.isPending,
          variant: otp.value.length === OTP_INPUT_LIMIT ? 'primary' : 'disable',
        }}
        previousButton={{
          content: dictionary['step-six'].buttons.back,
          onClick: () => navigate.push('/step-five'),
          variant: 'tertiary',
        }}
      >
        <>
          {/* TODO: need to update the rendering functionality of this like step nine */}
          <p className="font-dm-sans -mt-2 flex-grow text-[32px] leading-normal font-medium text-neutral-50">
            {dictionary['step-six'].subtitle.otpSent.replace(
              '{{phone}}',
              phoneNumber,
            )}
            <span
              className="font-dm-sans ml-2 transition-colors duration-200"
              onClick={handleResend}
            >
              {canResend ? (
                <span className="text-brand-blue-400 border-brand-blue-400 cursor-pointer border-b font-semibold">
                  {dictionary['step-six'].subtitle.resend}
                </span>
              ) : (
                <span>
                  <span className="cursor-not-allowed border-b border-neutral-50 font-semibold">
                    {dictionary['step-six'].subtitle.resend}{' '}
                  </span>{' '}
                  {dictionary['step-six'].subtitle.in} {`${timer}s`}
                </span>
              )}
            </span>
          </p>

          <Numpad
            key={otpSessionId} // this resets the numpad on every otp resend
            onChange={(value) =>
              setOtp((prev) => ({
                value,
                message: value.length === OTP_INPUT_LIMIT ? prev.message : '',
              }))
            }
            inputLimit={OTP_INPUT_LIMIT}
            inputPlaceholderText={
              dictionary.formValidations.inputOtpPlaceholder
            }
            errorText={
              otp.message !== ''
                ? (dictionary.formValidations.otpErrors[
                    otp.message as keyof typeof dictionary.formValidations.otpErrors
                  ] ?? otp.message)
                : undefined
            }
          />
        </>
      </RightSectionWrapper>
    </>
  );
};

export default RightSix;
