import {
  CalculationResultPayload,
  LeadSubmitPayloadType,
  SolarCalculationBody,
  VerifyOtpPayloadType,
} from '@/lib/types';
import axios, { AxiosError } from 'axios';

const GATEWAY_BASE_URL = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;
const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN;
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID;

const calculatorAction = axios.create({
  baseURL: GATEWAY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-tenant-id': TENANT_ID,
    'x-auth-token': AUTH_TOKEN,
  },
});

export const calculations = async (body: SolarCalculationBody) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/lead-submit-with-calculator',
      body,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const getECNumber = async () => {
  try {
    const response = await calculatorAction.get('/cms/lead/ec/get-ec-member');
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const checkPinCodeServiceable = async (pincode: string) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/pincode-serviceable',
      {
        pincode,
      },
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const sendOtp = async (phone_number: string) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/send-otp',
      { phone_number },
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const verifyOtp = async (body: VerifyOtpPayloadType) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/verify-otp',
      body,
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const leadSubmitCHS = async (body: {
  society_name: string;
  name: string;
  mob_no: string;
  designation: string;
  bill: string;
  pin: string;
  source: string;
  approval_status: string;
}) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/lead-submit-chs',
      body,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const getCalculationResult = async (data: CalculationResultPayload) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/solar-calculator',
      data,
    );
    return response.data;
  } catch (err) {
    if (err instanceof AxiosError) {
      throw err?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};

export const leadSubmitCommercial = async (body: LeadSubmitPayloadType) => {
  try {
    const response = await calculatorAction.post(
      '/cms/website/ctruh/lead-submit-commercial',
      body,
    );
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error?.response?.data?.message || 'API Error occurred';
    }
    throw 'Something went wrong!';
  }
};
