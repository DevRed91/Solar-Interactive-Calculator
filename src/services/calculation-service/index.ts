import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  calculations,
  checkPinCodeServiceable,
  leadSubmitCHS,
  getCalculationResult,
  leadSubmitCommercial,
  sendOtp,
  verifyOtp,
  getECNumber,
} from '../api';
import { isAxiosError } from 'axios';
import {
  CalculationResultPayload,
  LeadSubmitPayloadType,
  SolarCalculationBody,
  SolarCalculationResult,
  VerifyOtpPayloadType,
} from '@/lib/types';

export const useGetSolarCalculations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['get_solar_calculation'],
    mutationFn: (body: SolarCalculationBody) => calculations(body),
    onSuccess: (data) => {
      queryClient.setQueryData(
        ['solar_calculation_result'],
        data.result.calculatorData,
      );
    },
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message ?? 'Error getting solar calculations!',
        );
      }
    },
  });
};

export const useSolarCalculationResult = () => {
  return useQuery<SolarCalculationResult>({
    queryKey: ['solar_calculation_result'],
    queryFn: async () => {
      // fallback since we're only using cache
      throw new Error('No cached result available');
    },
    staleTime: Infinity,
    enabled: false,
  });
};

export const useGetEcMember = () => {
  return useQuery({
    queryKey: ['solar_ec_result'],
    queryFn: getECNumber,
    staleTime: Infinity,
    gcTime: Infinity,
    select: (data) => {
      return data.result;
    },
  });
};

export const useCheckPinCodeServiceable = () => {
  return useMutation({
    mutationKey: ['check_pincode_serviceable'],
    mutationFn: (pincode: string) => checkPinCodeServiceable(pincode),
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message ?? 'Error checking pin code!');
      }
    },
  });
};

export const useLeadSubmitCHS = () => {
  return useMutation({
    mutationKey: ['lead_submit_chs'],
    mutationFn: (body: {
      society_name: string;
      name: string;
      mob_no: string;
      designation: string;
      bill: string;
      pin: string;
      source: string;
      approval_status: string;
    }) => leadSubmitCHS(body),

    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message ?? 'Error while submitting CHS lead!',
        );
      }
    },
  });
};

export const useGetCalculationResult = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['fetch_calculation_result'],
    mutationFn: (data: CalculationResultPayload) => getCalculationResult(data),
    onSuccess: (data) => {
      if (data.statusCode !== 404) {
        queryClient.setQueryData(['solar_calculation_result'], data.result);
      }
    },
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message ?? 'Error getting calculation result!',
        );
      }
    },
  });
};

export const useSendOtp = () => {
  return useMutation({
    mutationKey: ['send_otp'],
    mutationFn: (phoneNumber: string) => sendOtp(phoneNumber),
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message ?? 'Error sending OTP!');
      }
    },
  });
};

export const useVerifyOtp = () => {
  return useMutation({
    mutationKey: ['verify_otp'],
    mutationFn: (body: VerifyOtpPayloadType) => verifyOtp(body),
    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message ?? 'Error verifying OTP!');
      }
    },
  });
};

export const useLeadSubmitBusiness = () => {
  return useMutation({
    mutationKey: ['lead_submit_commercial'],
    mutationFn: (body: LeadSubmitPayloadType) => leadSubmitCommercial(body),

    onError: (error) => {
      console.error(error);
      if (isAxiosError(error)) {
        alert(
          error.response?.data.message ??
            'Error while submitting Commercial lead!',
        );
      }
    },
  });
};
