import { RightSectionWrapperTypes } from '@/lib/types';
import MixColorsText from '../ui/MixColorsText/MixColorsText';
import Button from '../ui/Button';
import { NextIcon, PreviousIcon } from '../icons';

function RightSectionWrapper({
  className = '',
  mixColorsClassName = '',
  mixColorsContentClassName = '',
  title,
  description,
  nextButton,
  previousButton,
  children,
  isSubmit,
}: RightSectionWrapperTypes) {
  return (
    <div
      className={`font-dm-sans flex h-full flex-col gap-4 [&>div:nth-child(2)]:flex-grow ${className}`}
    >
      <div className="flex flex-col gap-4">
        <MixColorsText
          content={title}
          className={mixColorsClassName}
          contentClassName={mixColorsContentClassName}
        />
        {description && (
          <p className="font-dm-sans text-[32px] font-medium -tracking-[1.28px] text-neutral-50">
            {description}
          </p>
        )}
      </div>
      {children}
      {(previousButton || nextButton) && (
        <div className="grid h-[120px] w-full grid-cols-3 items-center gap-10">
          {previousButton && (
            <Button
              {...previousButton}
              leftIcon={<NextIcon className="fill-black-300" />}
              className="!w-full !px-[36px]"
            />
          )}
          {nextButton && (
            <Button
              {...nextButton}
              isLoading={nextButton.isLoading}
              rightIcon={!isSubmit && <PreviousIcon className="fill-white" />}
              className="col-span-2"
            />
          )}
        </div>
      )}
    </div>
  );
}

export default RightSectionWrapper;
