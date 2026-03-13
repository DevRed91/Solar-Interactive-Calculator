import {
  SavingsIcon,
  HSocietyIcon,
  BusinessIcon,
  RupeeCircleIcon,
  ClockIcon,
} from '@/components/icons';
import { LangType } from '@/lib/types';

//---------language--------------//

export const SUPPORTED_LOCALES: { value: LangType; label: string }[] = [
  { value: 'en', label: 'English' },
  { value: 'hi', label: 'Hindi' },
  { value: 'mr', label: 'Marathi' },
];

//-------------step-one-----------//

export const RIGHT_ONE_DATA = {
  info: [{ icon: SavingsIcon }, { icon: RupeeCircleIcon }, { icon: ClockIcon }],
  footer: [
    {
      icon: HSocietyIcon,
      href: '/housing-society-step-one',
    },
    {
      icon: BusinessIcon,
      href: '/business-step-one',
    },
  ],
};

//-------------step-seven-----------//

export const LEFT_SEVEN_OPTIONS = ['electricity', 'pinCode'] as const;

//-------------step-eight-----------//

export const SAVINGS_IDEAS = [
  {
    id: 'type1',
    max: 964892,
    data: [
      {
        imgSrc: '/images/step-eight/type1/option1.webp',
        background: 'linear-gradient(180deg, #8D8474 0%, #3A352D 100%)',
      },
      {
        imgSrc: '/images/step-eight/type1/option2.webp',
        background: 'linear-gradient(180deg, #415190 0%, #101F37 100%)',
      },
      {
        imgSrc: '/images/step-eight/type1/option3.webp',
        background: 'linear-gradient(180deg, #85786E 0%, #2D2825 100%)',
      },
      {
        imgSrc: '/images/step-eight/type1/option4.webp',
        background: 'linear-gradient(180deg, #328592 0%, #385D68 100%)',
      },
    ],
  },
  {
    id: 'type2',
    max: 1350852,
    data: [
      {
        imgSrc: '/images/step-eight/type2/option1.webp',
        background: 'linear-gradient(180deg, #8D8474 0%, #3A352D 100%)',
      },
      {
        imgSrc: '/images/step-eight/type2/option2.webp',
        background: 'linear-gradient(180deg, #415190 0%, #101F37 100%)',
      },
      {
        imgSrc: '/images/step-eight/type2/option3.webp',
        background: 'linear-gradient(180deg, #328592 0%, #385D68 100%)',
      },
      {
        imgSrc: '/images/step-eight/type2/option4.webp',
        background: 'linear-gradient(180deg, #007199 0%, #16163C 100%)',
      },
    ],
  },
  {
    id: 'type3',
    max: 1736813,
    data: [
      {
        imgSrc: '/images/step-eight/type2/option1.webp',
        background: 'linear-gradient(180deg, #415190 0%, #101F37 100%)',
      },
      {
        imgSrc: '/images/step-eight/type3/option1.webp',
        background: 'linear-gradient(180deg, #5274A2 0%, #1F2C3D 100%)',
      },
      {
        imgSrc: '/images/step-eight/type2/option3.webp',
        background: 'linear-gradient(180deg, #328592 0%, #385D68 100%)',
      },
      {
        imgSrc: '/images/step-eight/type3/option2.webp',
        background: 'linear-gradient(180deg, #AB9E76 0%, #363121 100%)',
      },
    ],
  },
  {
    id: 'type4',
    max: 2508724,
    data: [
      {
        imgSrc: '/images/step-eight/type4/option1.webp',
        background: 'linear-gradient(180deg, #BB6D68 0%, #773A36 100%)',
      },
      {
        imgSrc: '/images/step-eight/type4/option2.webp',
        background: 'linear-gradient(180deg, #5079B4 0%, #1E2F48 100%)',
      },
      {
        imgSrc: '/images/step-eight/type1/option4.webp',
        background: 'linear-gradient(180deg, #328592 0%, #385D68 100%)',
      },
      {
        imgSrc: '/images/step-eight/type3/option2.webp',
        background: 'linear-gradient(180deg, #AB9E76 0%, #363121 100%)',
      },
    ],
  },
  {
    id: 'type5',
    max: 3666600,
    data: [
      {
        imgSrc: '/images/step-eight/type5/option1.webp',
        background: 'linear-gradient(180deg, #B0AEB7 0%, #4A4851 100%)',
      },
      {
        imgSrc: '/images/step-eight/type1/option2.webp',
        background: 'linear-gradient(180deg, #415190 0%, #101F37 100%)',
      },
      {
        imgSrc: '/images/step-eight/type5/option2.webp',
        background: 'linear-gradient(180deg, #CB925B 0%, #6C4722 100%)',
      },
      {
        imgSrc: '/images/step-eight/type5/option3.webp',
        background: 'linear-gradient(180deg, #6296B7 0%, #2F5065 100%)',
      },
    ],
  },
];

//---------business--------------//

export const MONTHLY_ELECTRICITY_BILL_DATA = [
  {
    name: '₹0 - ₹50,000',
    _id: '0-50000',
  },
  {
    name: '₹50,000 - ₹2 Lacs',
    _id: '50000-100000',
  },
  {
    name: 'Above ₹2 Lacs',
    _id: '100000-500000',
  },
];

export const ROUTE_GROUPS = [
  {
    name: 'step',
    routes: ['step-two', 'step-three', 'step-four', 'step-five', 'step-six'],
  },
  {
    name: 'business',
    routes: ['business-step-one', 'business-step-two'],
  },
  {
    name: 'housing-society',
    routes: [
      'housing-society-step-one',
      'housing-society-step-two',
      'housing-society-step-three',
    ],
  },
];

export const OTP_INPUT_LIMIT = 4;

export const DEFAULT_CURRENCY_RANGE = {
  start: 500,
  end: 10000,
};

export const IDLE_TIMEOUT = 1 * 60 * 1000;
