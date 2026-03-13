import { LEFT_SEVEN_OPTIONS } from '@/data/constants';
import { ChangeEvent, CSSProperties, JSX, ReactNode, SVGProps } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'disable';

export type LangType = 'en' | 'hi' | 'mr';

export interface ButtonProps {
  variant?: ButtonVariant;
  content?: string;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: () => void;
  isLoading?: boolean;
}

export interface RadioCardProps {
  data: {
    title: string;
    area: string;
    description: string;
    value: string;
  };
  isSelected: boolean;
  onSelect: () => void;
}

export type IconProps = SVGProps<SVGSVGElement>;

export interface RightSectionWrapperTypes {
  className?: string;
  mixColorsClassName?: string;
  mixColorsContentClassName?: string;
  title: TextItem[];
  description?: string;
  nextButton?: ButtonProps;
  previousButton?: ButtonProps;
  children: React.ReactElement;
  isSubmit?: boolean;
}

export interface TextItem {
  text: string;
  variant?: 'blue' | 'green';
  color?: string;
  break?: boolean;
}

export interface IconTextDisplayProps {
  content: TextItem[];
  className?: string;
  contentClassName?: string;
}

export interface CurrencySliderProps {
  direction?: 'row' | 'column';
  defaultPrice?: number;
  startPrice: number;
  endPrice: number;
  incrementBy: number;
  className?: string;
  currencyClassName?: string;
  sliderClassName?: string;
  onPrevClick?: (value: string) => void;
  onNextClick?: (value: string) => void;
  onDotClick?: (value: string) => void;
  onChange?: (value: string) => void;
}

export interface TelephoneInputProps {
  value: string;
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  errorText?: string;
  placeHolderText?: string;
}

export interface StepFiveFormData {
  name: string;
  phone: string;
  source: string;
}

export interface DropDownOption {
  label: string;
  value: string;
}

export interface DropDownProps {
  value: string;
  options: DropDownOption[];
  onSelect: (value: string) => void;
  leftIcon?: ReactNode;
  className?: string;
}

export interface FilterOption {
  _id: string;
  name: string;
  default?: boolean;
}

export interface FilterDropDownTextTypes {
  menuData: FilterOption[];
  onChange: (data: string) => void;
  className?: string;
  wrapperClassName?: string;
  style?: React.CSSProperties;
  label: string;
  x?: number;
  y?: number;
  icon?: JSX.Element;
  placeholder?: string;
  errorText?: string;
}

export interface MenuTypes {
  open: boolean;
  onClose: (event: MouseEvent) => void;
  children: React.ReactNode;
  style?: React.CSSProperties;
  x?: number;
  y?: number;
  className?: string;
  hideShadow?: boolean;
}
export interface TagOption {
  label: string;
  value: string;
  img?: string;
}

export interface TagSelectProps {
  data: TagOption[];
  onSelect: (value: TagOption) => void;
  errorText?: string;
  className?: string;
  tagClassName?: string;
}

export interface BusinessStepOneInputs {
  name: string;
  phone: string;
  city: string;
  pinCode: string;
}

export interface BusinessStepTwoInputs {
  name: string;
  monthlyElectricityBill: string;
}

export interface HousingSocietyStepOneInputs {
  name: string;
  phone: string;
  pinCode: string;
}

export interface HousingSocietyStepTwoInputs {
  housingSociety: string;
  monthlyElectricityBill: string;
  approvalStatus: string;
}

export interface HousingSocietyStepThreeInputs {
  housingSocietyDesignation: string;
}

export interface SolarCalculationBody {
  name: string;
  mobile: string;
  pincode: string;
  average_monthly_bill: string;
  source: string;
  ec_id: string;
  source_secondary: string;
}

export interface CalculationResultPayload {
  pincode: string;
  average_monthly_bill: string;
}

export interface LeadSubmitPayloadType {
  name: string;
  c_name: string;
  mob_no: string;
  com_pincode: string;
  bill: string;
  source: string;
}

export interface VerifyOtpPayloadType {
  session_id: string;
  otp: string;
}

export interface SolarCalculationResult {
  plant_size: string;
  lifetime_savings: string;
  five_years_savings: string;
  one_year_savings: string;
  monthly_savings: string;
  co2_savings: string;
  trees_saved: string;
  ev_distance: string;
  emi_value: string;
  total_cost_price: string;
  central_subsidy: string;
  state_subsidy: string;
  net_cost_price: string;
  roof_area: string;
  show_state_subsidy: boolean;
  roi: string;
}

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  style?: CSSProperties;
  disableOutsideClick?: boolean;
}

export type LeftSevenOptionsKey = (typeof LEFT_SEVEN_OPTIONS)[number];

export interface IStatus {
  title: string;
  checked: boolean;
}

export interface ITeamMember {
  name: string;
  role: string;
  image: string;
}

export interface IThankYouLeft {
  status: IStatus[];
}

export type ValidationMessages = {
  required: string;
  minLength: {
    message: string;
  };
  maxLength: {
    message: string;
  };
  pattern: {
    message: string;
  };
};

type ValidationRule = {
  value: number;
  message: string;
};

export type FieldRules = {
  required: string;
  minLength: ValidationRule;
  maxLength: ValidationRule;
  pattern: { message: string };
};

export interface ECMemberData {
  _id: string;
  ec_name: string;
}
