'use client';
import ThankYouLeft from '@/components/thank-you/Left';
import useTranslation from '@/hooks/useTranslation';

const LeftNine = () => {
  const { dictionary } = useTranslation();

  return <ThankYouLeft status={dictionary['thankYou'].left.steps} />;
};

export default LeftNine;
