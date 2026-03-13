import dynamic from 'next/dynamic';
import LeftOne from '@/components/steps/step-one/LeftOne';
import RightOne from '@/components/steps/step-one/RightOne';
import RightTwo from '@/components/steps/step-two/RightTwo';
const RightThree = dynamic(
  () => import('@/components/steps/step-three/RightThree'),
);
import RightFour from '@/components/steps/step-four/RightFour';
const RightFive = dynamic(
  () => import('@/components/steps/step-five/RightFive'),
);
import LeftSix from '@/components/steps/step-six/LeftSix';
const RightSix = dynamic(() => import('@/components/steps/step-six/RightSix'));
const LeftSeven = dynamic(
  () => import('@/components/steps/step-seven/LeftSeven'),
);
const RightSeven = dynamic(
  () => import('@/components/steps/step-seven/RightSeven'),
);
const LeftEight = dynamic(
  () => import('@/components/steps/step-eight/LeftEight'),
);
import RightEight from '@/components/steps/step-eight/RightEight';
import LeftNine from '@/components/steps/step-nine/LeftNine';
import RightNine from '@/components/steps/step-nine/RightNine';
// Business Components
const RightSectionStepOne = dynamic(
  () => import('@/components/business-steps/step-one/Right'),
);
const RightSectionStepTwo = dynamic(
  () => import('@/components/business-steps/step-two/Right'),
);
const BusinessStepThreeLeft = dynamic(
  () => import('@/components/business-steps/step-three/Left'),
);
const BusinessStepThreeRight = dynamic(
  () => import('@/components/business-steps/step-three/Right'),
);

// Housing Society Components
const HousingSocietyStepOne = dynamic(
  () => import('@/components/housing-society/step-one/Right'),
);
const HousingSocietyStepTwo = dynamic(
  () => import('@/components/housing-society/step-two/Right'),
);
const HousingSocietyStepThree = dynamic(
  () => import('@/components/housing-society/step-three/Right'),
);
import HousingSocietyStepFourLeft from '@/components/housing-society/step-four/Left';
import HousingSocietyStepFourRight from '@/components/housing-society/step-four/Right';
import BusinessLeadFormLeft from '@/components/business-steps/BusinessLeadFormLeft';
import HousingLeadFormLeft from '@/components/housing-society/HousingLeadFormLeft';

export const steps = [
  {
    slug: 'step-one',
    leftComponent: LeftOne,
    rightComponent: RightOne,
  },
  {
    slug: 'step-two',
    leftComponent: LeftOne,
    rightComponent: RightTwo,
  },
  {
    slug: 'step-three',
    leftComponent: LeftOne,
    rightComponent: RightThree,
  },
  {
    slug: 'step-four',
    leftComponent: LeftOne,
    rightComponent: RightFour,
  },
  {
    slug: 'step-five',
    leftComponent: LeftOne,
    rightComponent: RightFive,
  },
  {
    slug: 'step-six',
    leftComponent: LeftSix,
    rightComponent: RightSix,
  },
  {
    slug: 'step-seven',
    leftComponent: LeftSeven,
    rightComponent: RightSeven,
  },
  {
    slug: 'step-eight',
    leftComponent: LeftEight,
    rightComponent: RightEight,
    leftClassName: '[background:white] !col-span-8 p-[60px]',
    rightClassName: '!col-span-12',
    hideLogo: true,
  },
  {
    slug: 'step-nine',
    leftComponent: LeftNine,
    rightComponent: RightNine,
    leftClassName:
      '[background:white] !col-span-13 [&>div]:!pr-12 [&>div]:!pt-20',
    rightClassName: '[&>div]:!p-0 !col-span-7',
    hideLogo: true,
  },
  // ================= Business Flow Steps ==================
  {
    slug: 'business-step-one',
    leftComponent: BusinessLeadFormLeft,
    rightComponent: RightSectionStepOne,
  },
  {
    slug: 'business-step-two',
    leftComponent: BusinessLeadFormLeft,
    rightComponent: RightSectionStepTwo,
  },
  {
    slug: 'business-step-three',
    leftComponent: BusinessStepThreeLeft,
    rightComponent: BusinessStepThreeRight,
    leftClassName:
      '[background:white] !col-span-13 [&>div]:!pr-12 [&>div]:!pt-20',
    rightClassName: '[&>div]:!p-0 !col-span-7',
    hideLogo: true,
  },
  {
    slug: 'housing-society-step-one',
    leftComponent: HousingLeadFormLeft,
    rightComponent: HousingSocietyStepOne,
  },
  {
    slug: 'housing-society-step-two',
    leftComponent: HousingLeadFormLeft,
    rightComponent: HousingSocietyStepTwo,
  },
  {
    slug: 'housing-society-step-three',
    leftComponent: HousingLeadFormLeft,
    rightComponent: HousingSocietyStepThree,
  },
  {
    slug: 'housing-society-step-four',
    leftComponent: HousingSocietyStepFourLeft,
    rightComponent: HousingSocietyStepFourRight,
    leftClassName:
      '[background:white] !col-span-13 [&>div]:!pr-12 [&>div]:!pt-20',
    rightClassName: '[&>div]:!p-0 !col-span-7',
    hideLogo: true,
  },
];
