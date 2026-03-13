import { steps } from '@/data/step';
import { FieldRules, FilterOption, ValidationMessages } from './types';
import { ROUTE_GROUPS } from '@/data/constants';
import { useMemo } from 'react';
import { UseFormWatch } from 'react-hook-form';

export function getStepBySlug(slug: string) {
  return steps?.find((step) => step.slug === slug);
}

export function getNextSlug(slug: string): string | null {
  const index = steps.findIndex((s) => s.slug === slug);
  return index >= 0 && index < steps.length - 1 ? steps[index + 1].slug : null;
}

export function getPreviousSlug(slug: string): string | null {
  const index = steps.findIndex((step) => step.slug === slug);
  return index > 0 ? steps[index - 1].slug : null;
}

export const sortDataAlphabetically = (
  data: FilterOption[],
): FilterOption[] => {
  if (!Array.isArray(data)) return [];

  return data.sort((a, b) => {
    const aName = a.name?.toLowerCase();
    const bName = b.name?.toLowerCase();

    if (aName === 'all') return -1;
    if (bName === 'all') return 1;
    return aName.localeCompare(bName);
  });
};

// Function to calculate progress based on current route
export const calculateStepProgress = (currentSlug: string): number => {
  const currentGroup = ROUTE_GROUPS?.find((group) =>
    group.routes.includes(currentSlug),
  );

  if (currentGroup) {
    const currentIndex = currentGroup.routes.indexOf(currentSlug);
    return ((currentIndex + 1) / currentGroup.routes.length) * 100;
  }

  return 0;
};

// Function to check if progress bar should be shown
export const shouldShowProgressBar = (currentSlug: string): boolean => {
  const allRoutes = ROUTE_GROUPS.flatMap((group) => group.routes);
  return allRoutes.includes(currentSlug);
};

export const formatMessage = (
  template: string,
  values: Record<string, string | number>,
): string => {
  return template.replace(/{{(.*?)}}/g, (_, key) => String(values[key] ?? ''));
};

export const getFieldRules = (
  fieldLabel: string,
  min: number,
  max: number,
  messages: ValidationMessages,
): FieldRules => {
  return {
    required: formatMessage(messages.required, { field: fieldLabel }),
    minLength: {
      value: min,
      message: formatMessage(messages.minLength.message, {
        field: fieldLabel,
        min,
      }),
    },
    maxLength: {
      value: max,
      message: formatMessage(messages.maxLength.message, {
        field: fieldLabel,
        max,
      }),
    },
    pattern: {
      message: formatMessage(messages.pattern.message, { field: fieldLabel }),
    },
  };
};

export const formatDisplayPrice = (price: number) =>
  `₹${price.toLocaleString()}`;

export const deepEqual = <T extends Record<string, string>>(a: T, b: T) => {
  const keysA = Object.keys(a) as (keyof T)[];
  const keysB = Object.keys(b) as (keyof T)[];

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (a[key] !== b[key]) return false;
  }

  return true;
};

export function useIsFormEqual<T extends Record<string, string>>(
  watch: UseFormWatch<T>,
  defaultValues: T,
) {
  const currentValues = watch();

  return useMemo(
    () => deepEqual(currentValues, defaultValues),
    [currentValues, defaultValues],
  );
}
