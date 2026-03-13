'use client';
import ThankYouLeft from '@/components/thank-you/Left';
import useTranslation from '@/hooks/useTranslation';

const BusinessStepThreeLeft = () => {
  const { dictionary } = useTranslation();

  return (
    <ThankYouLeft status={dictionary['housing-society-step-four'].steps} />
  );
};

export default BusinessStepThreeLeft;
