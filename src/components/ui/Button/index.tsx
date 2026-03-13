'use client';
import React, { FC } from 'react';
import AnimatingDots from '../AnimatingDots';
import { ButtonProps, ButtonVariant } from '@/lib/types';

const baseStyles =
  'flex items-center justify-center gap-2 px-[107px] py-[34px] text-[40px] font-medium rounded-xl cursor-pointer font-semibold disabled:cursor-not-allowed w-full h-full';

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-primary-500 to-gradient-end text-background-0 text-white',
  secondary: 'bg-transparent text-brand border border-brand',
  tertiary: 'bg-black-10 text-black-300',
  disable: 'bg-neutral-500/50 text-white',
};

const animatingDotColors: Record<ButtonVariant, string> = {
  primary: 'bg-brand-200',
  secondary: 'bg-brand',
  tertiary: 'bg-black-300',
  disable: 'bg-brand-200',
};
const Button: FC<ButtonProps> = ({
  variant = 'primary',
  content,
  className = '',
  leftIcon,
  rightIcon,
  onClick,
  isLoading = false,
}) => {
  const isDisabled = isLoading || variant === 'disable';

  return (
    <button
      className={` ${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? (
        <AnimatingDots color={animatingDotColors[variant]} />
      ) : (
        <div className="inline-flex items-center gap-3">
          {leftIcon && <span>{leftIcon}</span>}
          {content && <span className="whitespace-nowrap">{content}</span>}
          {rightIcon && <span>{rightIcon}</span>}
        </div>
      )}
    </button>
  );
};

export default Button;
