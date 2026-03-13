"use client"
import Image from 'next/image';
import Modal from '../Modal/Modal';
import Button from '../Button';
import { CrossIcon, NextIcon } from '@/components/icons';
import useCustomRouter from '@/hooks/useCustomRouter';
import useTranslation from '@/hooks/useTranslation';

const UnServiceableModal = ({
  isOpen,
  onClose,
  onNext,
}: {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}) => {
  const router = useCustomRouter();
  const { dictionary } = useTranslation();

  return (
    <Modal open={isOpen} onClose={onClose} disableOutsideClick>
      <div className="relative flex max-w-[1413px] flex-col items-center justify-center rounded-3xl px-[214px] pt-[52px] pb-[77px]">
        <Image
          width={0}
          height={0}
          alt="unserviceable"
          sizes="100vw"
          className="h-[269px] w-[269px]"
          src="/images/location-pin.webp"
        />
        <CrossIcon
          onClick={onClose}
          className="absolute top-8 right-8 cursor-pointer"
        />
        <div className="mb-[92px] flex flex-col items-center gap-4 text-center">
          <h2 className="font-dm-sans text-[60px]/[84px] font-bold text-neutral-500">
            {dictionary.unserviceableModal.title}
          </h2>
          <p className="font-dm-sans text-[32px] font-medium tracking-[-1.28px] text-neutral-50">
            {dictionary.unserviceableModal.description?.map((item, index) => (
              <span
                key={index}
                className={`${item.highlighted ? 'font-semibold text-neutral-200' : ''} ${index !== 0 ? 'pl-2' : ''}`}
              >
                {item.text}
              </span>
            ))}
          </p>
        </div>
        <div className="flex gap-[59px]">
          <Button
            variant="tertiary"
            content={dictionary.unserviceableModal.button.back}
            leftIcon={<NextIcon className="fill-black-300" />}
            className="!w-full !px-[36px]"
            onClick={() => router.push('/step-one')}
          />
          <Button
            variant="primary"
            content={dictionary.unserviceableModal.button.generalEstimate}
            onClick={onNext}
          />
        </div>
      </div>
    </Modal>
  );
};

export default UnServiceableModal;
