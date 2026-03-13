'use client';
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Numpad from '@/components/ui/Numpad';
import UnServiceableModal from '@/components/ui/UnServiceableModal';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { TextItem } from '@/lib/types';
import { useCheckPinCodeServiceable } from '@/services/calculation-service';
import React, { useState } from 'react';

function RightTwo() {
  const [pin, setPin] = useState('');
  const { setPinCode } = useSolarStore();
  const router = useCustomRouter();
  const { dictionary } = useTranslation();
  const checkServiceabilityQuery = useCheckPinCodeServiceable();
  const [IsServiceableModal, setIsServiceableModal] = useState(false);
  const pinLength =
    dictionary.formValidations.rules.pinCodeRules.maxLength.value;
  const isPinLengthValid = pin?.toString().length === pinLength;

  const handlePinChange = () => {
    setPinCode(pin);
    checkServiceabilityQuery.mutate(pin, {
      onSuccess: (data) => {
        if (data.message.toLowerCase() === 'pincode is not serviceable') {
          setIsServiceableModal(true);
        } else {
          router.push('/step-three');
        }
      },
    });
  };

  return (
    <RightSectionWrapper
      title={dictionary['step-two'].title as TextItem[]}
      description={dictionary['step-two'].subtitle}
      nextButton={{
        content: dictionary['step-two'].buttons.next,
        onClick: handlePinChange,
        variant:
          isPinLengthValid && !pin.toString().startsWith('0')
            ? 'primary'
            : 'disable',
        isLoading: checkServiceabilityQuery.isPending,
      }}
      previousButton={{
        content: dictionary['step-two'].buttons.back,
        onClick: () => router.push('/step-one'),
        variant: 'tertiary',
      }}
      mixColorsContentClassName="[&:first-child]:text-black-500"
    >
      <>
        <Numpad
          inputPlaceholderText={
            dictionary.formValidations.inputPinCodePlaceholder
          }
          onChange={(value) => setPin(value)}
          inputLimit={pinLength}
          errorText={
            isPinLengthValid && pin.toString().startsWith('0')
              ? dictionary.formValidations.rules.pinCodeRules.pattern.message
              : ''
          }
        />
        <UnServiceableModal
          isOpen={IsServiceableModal}
          onClose={() => setIsServiceableModal(false)}
          onNext={() => router.push('/step-three')}
        />
      </>
    </RightSectionWrapper>
  );
}

export default RightTwo;
