import { IconTextDisplayProps } from '@/lib/types';

const MixColorsText = ({
  content,
  className = '',
  contentClassName = '',
}: IconTextDisplayProps) => {
  const color = (value: string) => {
    return value === 'blue'
      ? 'text-primary-400'
      : value === 'green'
        ? 'text-green-success-500'
        : value
          ? value
          : 'text-neutral-500';
  };

  return (
    <h1 className={`font-poppins flex flex-wrap ${className}`}>
      {content?.map((item, index) => {
        return (
          <span
            key={index}
            className={`font-poppins text-[60px]/[84px] font-bold ${
              item.break ? 'w-full' : ''
            } ${color((item.variant || item.color) as string)} ${contentClassName}`}
          >
            {item.text}
            {index === content.length - 1 ? '' : <>&nbsp;</>}
          </span>
        );
      })}
    </h1>
  );
};

export default MixColorsText;
