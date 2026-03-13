'use client';
import { useMemo, useState } from 'react';
import Menu from './Menu';
import { sortDataAlphabetically } from '@/lib/utils';
import { FilterDropDownTextTypes } from '@/lib/types';
import { CheckMarkThinIcon, ChevronIcon } from '@/components/icons';

function FilterDropDownText({
  menuData,
  onChange,
  className = '',
  style,
  x = 0,
  y = 0,
  label,
  wrapperClassName = '',
  icon,
  placeholder,
  errorText,
}: FilterDropDownTextTypes) {
  const [openMenu, setOpenMenu] = useState(false);
  const sortedMenuData = useMemo(
    () => sortDataAlphabetically(menuData),
    [menuData],
  );

  const { displayText, hasSelection } = useMemo(() => {
    const selectedOption = sortedMenuData?.find((data) => data._id === label);
    const defaultOption = sortedMenuData?.find((data) => data.default === true);
    const hasSelection = Boolean(label || defaultOption);
    const displayText = selectedOption?.name || defaultOption?.name || '';

    return {
      selectedOption,
      defaultOption,
      displayText,
      hasSelection,
    };
  }, [sortedMenuData, label]);

  return (
    <div className={`font-dm-sans relative w-full ${wrapperClassName}`}>
      <div
        className={`bg-black-10 flex h-25 w-full cursor-pointer items-center gap-2 rounded-xl border-2 px-7.5 py-3 text-[32px]/11 transition-colors duration-200 ${
          errorText
            ? 'border-red-800'
            : openMenu
              ? 'border-primary-400 bg-primary-50'
              : 'border-transparent'
        }`}
        onClick={() => setOpenMenu(true)}
      >
        {icon && <>{icon}</>}
        <div className="flex w-full min-w-[100px] flex-col items-start justify-between">
          {placeholder && (
            <span
              className={`font-dm-sans mb-1 ${
                hasSelection
                  ? 'text-lg/6 font-medium text-neutral-100'
                  : 'sr-only'
              } ${errorText ? 'text-red-800' : ''}`}
            >
              {placeholder}
            </span>
          )}
          <div className="flex w-full items-center justify-between">
            <h1
              className={`${hasSelection ? 'font-semibold text-black' : 'text-neutral-dark-500 font-medium'} ${errorText ? 'text-red-800' : ''}`}
            >
              {hasSelection ? displayText : placeholder}
            </h1>
          </div>
        </div>
        <ChevronIcon
          className={`${
            hasSelection ? 'fill-black' : 'fill-black-200'
          } ${openMenu ? '' : 'rotate-180'}`}
        />
      </div>
      <Menu
        open={openMenu}
        onClose={() => setOpenMenu(false)}
        className={`absolute top-full mt-2 max-h-[30vh] w-full rounded-xl bg-white !p-0 text-[32px]/11 shadow-lg ${className} `}
        style={style}
        y={y}
        x={x}
      >
        {sortedMenuData?.map((data) => (
          <div
            key={data._id}
            id={data._id}
            className={`flex cursor-pointer items-center justify-between px-6 py-5 ${
              label === data._id || (label === undefined && data.default)
                ? 'bg-background-300'
                : ''
            }`}
            onClick={() => {
              onChange(data._id);
              setOpenMenu(false);
            }}
          >
            <h1 className="font-dm-sans text-[32px]/11 font-semibold text-black">
              {data.name}
            </h1>
            {(label === data._id || (label === undefined && data.default)) && (
              <CheckMarkThinIcon className="h-9 w-9 fill-neutral-50" />
            )}
          </div>
        ))}
      </Menu>
      {errorText && (
        <p className="font-dm-sans mt-2 w-full text-left text-2xl leading-none font-medium text-red-800">
          {errorText}
        </p>
      )}
    </div>
  );
}

export default FilterDropDownText;
