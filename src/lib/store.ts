import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SolarDataState {
  name: string;
  phoneNumber: string;
  roofSize: string;
  electricityBill: string;
  pinCode: string;
  source: string;
  otpSessionId: string;
  ecId: string;

  setName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  setRoofSize: (size: string) => void;
  setElectricityBill: (bill: string) => void;
  setPinCode: (pinCode: string) => void;
  setSource: (source: string) => void;
  setOtpSessionId: (otpSessionId: string) => void;
  setEcId: (ecId: string) => void;
  reset: () => void;
}

const initialState = {
  name: '',
  phoneNumber: '',
  roofSize: 'small',
  electricityBill: '1500',
  pinCode: '',
  source: '',
  otpSessionId: '',
  ecId: '',
};

interface CHSFormState {
  housingSociety: string;
  approvalStatus: string;
  monthlyElectricityBill: string;

  setHousingSociety: (society: string) => void;
  setApprovalStatus: (status: string) => void;
  setMonthlyElectricityBill: (monthlyElectricityBill: string) => void;
  reset: () => void;
}

const chsInitialState = {
  housingSociety: '',
  approvalStatus: '',
  monthlyElectricityBill: '',
};

interface BusinessFormState {
  name: string;
  phoneNumber: string;
  city: string;
  companyName: string;
  pinCode: string;
  monthlyElectricityBill: string;

  setName: (name: string) => void;
  setPhoneNumber: (phone: string) => void;
  setCompanyPinCode: (pinCode: string) => void;
  setMonthlyElectricityBill: (monthlyElectricityBill: string) => void;
  reset: () => void;
}

const businessInitialState = {
  name: '',
  phoneNumber: '',
  city: '',
  companyName: '',
  pinCode: '',
  monthlyElectricityBill: '',
};

export const useSolarStore = create<SolarDataState>()(
  persist(
    (set) => ({
      ...initialState,

      setName: (name) => set({ name }),
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setRoofSize: (size) => set({ roofSize: size }),
      setElectricityBill: (bill) => set({ electricityBill: bill }),
      setPinCode: (pinCode) => set({ pinCode }),
      setSource: (source) => set({ source }),
      setOtpSessionId: (otpSessionId) => set({ otpSessionId }),
      setEcId: (ecId) => set({ ecId }),
      reset: () => set((state) => ({ ...initialState, ecId: state.ecId })),
    }),
    {
      name: 'solar-store',
      partialize: (state) => ({
        name: state.name,
        phoneNumber: state.phoneNumber,
        roofSize: state.roofSize,
        electricityBill: state.electricityBill,
        pinCode: state.pinCode,
        source: state.source,
        otpSessionId: state.otpSessionId,
        ecId: state.ecId,
      }),
    },
  ),
);

export const useCHSFormStore = create<CHSFormState>()(
  persist(
    (set) => ({
      ...chsInitialState,
      setHousingSociety: (society) => set({ housingSociety: society }),
      setApprovalStatus: (status) => set({ approvalStatus: status }),
      setMonthlyElectricityBill: (monthlyElectricityBill) =>
        set({ monthlyElectricityBill: monthlyElectricityBill }),
      reset: () => set(chsInitialState),
    }),
    {
      name: 'chs-form-store',
      partialize: (state) => ({
        housingSociety: state.housingSociety,
        approvalStatus: state.approvalStatus,
        monthlyElectricityBill: state.monthlyElectricityBill,
      }),
    },
  ),
);

export const useBusinessFormStore = create<BusinessFormState>()(
  persist(
    (set) => ({
      ...businessInitialState,
      setName: (name) => set({ name }),
      setPhoneNumber: (phone) => set({ phoneNumber: phone }),
      setCompanyPinCode: (pinCode) => set({ pinCode: pinCode }),
      setMonthlyElectricityBill: (monthlyElectricityBill) =>
        set({ monthlyElectricityBill: monthlyElectricityBill }),
      reset: () => set(businessInitialState),
    }),
    {
      name: 'lead_submit_commercial',
      partialize: (state) => ({
        name: state.name,
        phoneNumber: state.phoneNumber,
        city: state.city,
        companyName: state.companyName,
        monthlyElectricityBill: state.monthlyElectricityBill,
      }),
    },
  ),
);
