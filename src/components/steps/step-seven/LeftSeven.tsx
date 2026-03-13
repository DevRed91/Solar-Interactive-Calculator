'use client';
import {
  AspectRatioIcon,
  ChevronIcon,
  SolarPowerIcon,
} from '@/components/icons';
import { useEffect, useState } from 'react';
import CurrencySlider from '@/components/ui/CurrencySlider';
import { useSolarStore } from '@/lib/store';
import {
  useGetCalculationResult,
  useSolarCalculationResult,
} from '@/services/calculation-service';
import MotionsGraphicsImages from '@/components/ui/MotionsGraphicsImages';
import Numpad from '@/components/ui/Numpad';
import { DEFAULT_CURRENCY_RANGE, LEFT_SEVEN_OPTIONS } from '@/data/constants';
import { LeftSevenOptionsKey } from '@/lib/types';
import useTranslation from '@/hooks/useTranslation';
import { formatDisplayPrice } from '@/lib/utils';
import UnServiceableModal from '@/components/ui/UnServiceableModal';
import OverlayLoading from '@/components/ui/OverlayLoading';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const LeftSeven = () => {
  const [openOptions, setOpenOptions] = useState<
    Record<LeftSevenOptionsKey, boolean>
  >({
    electricity: false,
    pinCode: false,
  });
  const [pinCodeOptionData, setPinCodeOptionData] = useState<{
    value: string;
    errorText: string;
  }>({
    value: '',
    errorText: '',
  });
  const calculation = useSolarCalculationResult();
  const { dictionary } = useTranslation();
  const [isServiceableModal, setIsServiceableModal] = useState(false);
  const getCalculationResultQuery = useGetCalculationResult();
  const ref = useOutsideClick(() => {
    setOpenOptions({
      electricity: false,
      pinCode: false,
    });
  });
  const { electricityBill, setElectricityBill, pinCode, setPinCode } =
    useSolarStore();

  const closeOption = (option: LeftSevenOptionsKey) => {
    if (!openOptions[option]) return; // return if option is already closed
    if (option === 'pinCode' && pinCodeOptionData.errorText !== '') return; // do not close pincode if error exists
    setOpenOptions((prev) => ({ ...prev, [option]: false }));
    setPinCode(pinCodeOptionData.value);
  };

  const toggleOption = (option: LeftSevenOptionsKey) => {
    // close all other options
    const optionsToClose = LEFT_SEVEN_OPTIONS.filter((key) => key !== option);
    optionsToClose.forEach(closeOption);

    setOpenOptions((prev) => ({ ...prev, [option]: !prev[option] }));
  };

  useEffect(() => {
    setPinCodeOptionData({
      ...pinCodeOptionData,
      value: pinCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCode]);

  // Function to handle PIN code change, closes the drawer after entering 6 digits
  const handlePinCodeChange = (value: string) => {
    const newData = {
      value,
      errorText:
        value.length ===
        dictionary.formValidations.rules.pinCodeRules.maxLength.value
          ? ''
          : dictionary.formValidations.rules.pinCodeRules.minLength.message,
    };

    setPinCodeOptionData(newData);

    if (
      value.length ===
      dictionary.formValidations.rules.pinCodeRules.maxLength.value
    ) {
      if (value.startsWith('0')) {
        setPinCodeOptionData((prev) => ({
          ...prev,
          errorText:
            dictionary.formValidations.rules.pinCodeRules.pattern.message,
        }));
        return;
      }
      setPinCode(value);
    }
  };

  const handleModalClose = () => {
    setOpenOptions({
      electricity: false,
      pinCode: false,
    });
    setIsServiceableModal(false);
  };

  useEffect(() => {
    if (
      pinCode &&
      electricityBill &&
      (openOptions.pinCode || openOptions.electricity)
    ) {
      getCalculationResultQuery.mutate(
        {
          pincode: pinCode,
          average_monthly_bill: electricityBill,
        },
        {
          onSuccess: (data) => {
            if (data.statusCode === 404) {
              setIsServiceableModal(true);
            } else {
              handleModalClose();
            }
          },
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pinCode, electricityBill]);

  return (
    <>
      <div className="absolute h-[415.5px] w-[831px] items-center justify-center rounded-t-full bg-[#00BDFF] blur-[148px]" />
      <div
        className="font-dm-sans relative flex h-full w-full flex-col justify-between px-14 pt-48 pb-14"
        onClick={() => closeOption('electricity')}
      >
        <MotionsGraphicsImages
          className="!absolute inset-0 isolate h-full w-full"
          pulseAnimation={false}
        />

        <div className="grid w-full grid-cols-2 gap-[33px]">
          <div className="flex flex-col justify-between gap-1 rounded-xl border border-white/40 bg-white/20 p-6 backdrop-blur-sm">
            <div className="flex">
              <h1 className="flex flex-1 text-[60px]/[84px] font-semibold text-white">
                {calculation.data?.plant_size} kW
              </h1>
              <SolarPowerIcon className="size-16" />
            </div>
            <p className="font-dm-sans text-[28px]/[40px] leading-10 font-medium text-white opacity-80">
              {dictionary['step-seven'].left.systemSize}
            </p>
          </div>

          <div className="flex flex-col justify-between gap-1 rounded-xl border border-white/40 bg-white/20 p-6 backdrop-blur-sm">
            <div className="flex">
              <h1 className="flex flex-1 text-[60px]/[84px] font-semibold text-white">
                {calculation.data?.roof_area} sq.ft
              </h1>
              <AspectRatioIcon className="size-16" />
            </div>
            <p className="font-dm-sans text-[28px]/[40px] leading-10 font-medium text-white opacity-80">
              {dictionary['step-seven'].left.areaRequired}
            </p>
          </div>
        </div>
        <div
          className="relative flex gap-7 whitespace-nowrap"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Electricity Bill */}
          <div
            className={`border-2 ${openOptions.electricity ? 'bg-primary-200 border-primary-300' : 'bg-background-50 border-white/40'} flex w-fit cursor-pointer items-center justify-between gap-1 rounded-xl p-6 backdrop-blur-sm`}
            onClick={() => toggleOption('electricity')}
          >
            <div className="text-3xl leading-10 font-medium text-neutral-400">
              {dictionary['step-seven'].left.avgMonthlyBill}: &nbsp;
              {formatDisplayPrice(Number(electricityBill))}
            </div>
            <ChevronIcon
              className={`fill-black-400 shrink-0 ${openOptions.electricity ? 'rotate-180' : ''}`}
            />
          </div>
          {openOptions.electricity && (
            <CurrencySlider
              direction="row"
              defaultPrice={Number(electricityBill)}
              startPrice={DEFAULT_CURRENCY_RANGE.start}
              endPrice={DEFAULT_CURRENCY_RANGE.end}
              incrementBy={100}
              onChange={(value) => setElectricityBill(value)}
              className="absolute bottom-full grid !w-full -translate-y-4 grid-cols-3 rounded-xl bg-white !p-8"
              currencyClassName="!p-0 !text-[40px]/[56px] flex items-center justify-center"
              sliderClassName="col-span-2 [&>svg]:min-w-20 !h-[76px]"
            />
          )}
          {/* PIN Code */}
          <div
            className={`border-2 ${openOptions.pinCode ? 'bg-primary-200 border-primary-300' : 'bg-background-50 border-white/40'} flex w-[38%] cursor-pointer items-center justify-between gap-1 rounded-xl p-6 backdrop-blur-sm`}
            onClick={() => toggleOption('pinCode')}
          >
            <div className="text-3xl leading-10 font-medium text-neutral-400">
              {dictionary['step-seven'].left.pinCode}: {pinCode}
            </div>
            <ChevronIcon
              className={`fill-black-400 shrink-0 ${openOptions.pinCode ? 'rotate-180' : ''}`}
            />
          </div>
        </div>
        {openOptions.pinCode && (
          <div
            ref={ref}
            className="absolute bottom-0 left-0 z-20 w-screen bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Numpad
              inputPlaceholderText={
                dictionary.formValidations.inputPinCodePlaceholder
              }
              onChange={handlePinCodeChange}
              inputLimit={
                dictionary.formValidations.rules.pinCodeRules.maxLength.value
              }
              defaultInput={pinCodeOptionData.value}
              errorText={pinCodeOptionData.errorText}
              className="[&>div:first-child]:border-background-400 !mt-0 mb-4 [&_input]:my-3 [&_p]:mx-auto [&_p]:max-w-[700px] [&_p]:pb-3 [&>div:first-child]:border-b [&>div:first-child]:shadow-[0px_-14px_64px_0px_rgba(0,_0,_0,_0.08)] [&>div:last-child]:mt-4 [&>div:last-child]:max-w-[700px] [&>div>div]:mx-auto [&>div>div]:max-w-[700px]"
            />
          </div>
        )}
        <UnServiceableModal
          isOpen={isServiceableModal}
          onClose={handleModalClose}
          onNext={handleModalClose}
        />
      </div>
      {getCalculationResultQuery.isPending && <OverlayLoading />}
    </>
  );
};

export default LeftSeven;
