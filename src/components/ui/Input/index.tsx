import React, { InputHTMLAttributes } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

const Input = ({
  parentClassName,
  className,
  placeholderText,
  disabled,
  value,
  readOnly,
  errorText,
  register,
  id,
  floatingLabel = true,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  parentClassName?: string;
  className?: string;
  placeholderText: string;
  disabled?: boolean;
  value?: string;
  readOnly?: boolean;
  errorText?: string;
  register?: UseFormRegisterReturn;
  id?: string;
  floatingLabel?: boolean;
}) => {
  const inputProps = register ? { ...register, ...props } : { value, ...props };
  const inputId = id || inputProps?.name;

  return (
    <div className={`w-full ${parentClassName}`}>
      <div className="relative">
        <input
          type="text"
          id={inputId}
          placeholder={floatingLabel ? ' ' : placeholderText}
          disabled={disabled}
          readOnly={readOnly}
          className={`peer focus:border-primary-400 focus:bg-primary-50 block w-full rounded-xl px-7.5 py-5 focus:border-2 ${
            floatingLabel ? 'pt-10 pb-4' : 'py-5'
          } bg-black-10 font-dm-sans [&::-moz-appearance]:textfield appearance-none border-0 text-[32px] font-semibold focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${
            errorText
              ? 'border-2 border-red-800 focus:border-red-800'
              : 'border-2 border-transparent'
          } ${className}`}
          {...inputProps}
        />
        {floatingLabel && (
          <label
            htmlFor={inputId}
            className={`font-dm-sans peer-placeholder-shown:text-neutral-dark-500 absolute start-2.5 top-4 z-10 origin-[0] translate-x-5 -translate-y-3.5 scale-70 transform text-[32px] font-medium text-neutral-100 duration-300 peer-placeholder-shown:translate-y-3.5 peer-placeholder-shown:scale-100 peer-focus:translate-x-5 peer-focus:-translate-y-3.5 peer-focus:scale-70 peer-focus:text-neutral-100 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4`}
          >
            {placeholderText}
          </label>
        )}
      </div>
      {errorText && (
        <p className="font-dm-sans mt-2 w-full text-left text-2xl leading-none font-medium text-red-800">
          {errorText}
        </p>
      )}
    </div>
  );
};

export default Input;
