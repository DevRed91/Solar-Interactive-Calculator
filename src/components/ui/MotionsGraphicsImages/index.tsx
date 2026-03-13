'use client';
import { useSolarStore } from '@/lib/store';
import Image from 'next/image';

const MotionsGraphicsImages = ({
  className,
  pulseAnimation = true,
}: {
  className?: string;
  pulseAnimation?: boolean;
}) => {
  const { roofSize } = useSolarStore();

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Image
        width={0}
        height={0}
        sizes="100vw"
        alt="Roof Image"
        src={`/images/roofs/${roofSize}-roof-terrace.webp`}
        priority={true}
        className={`absolute top-40 z-10 h-full w-full object-cover transition-opacity ease-in-out ${pulseAnimation ? 'animate-pulse' : ''} `}
      />
      <Image
        width={0}
        height={0}
        sizes="100vw"
        alt="Roof Image"
        priority={true}
        src={`/images/roofs/${roofSize}-roof.webp`}
        className={`absolute top-40 h-full w-full object-cover transition-opacity ease-in-out`}
      />
    </div>
  );
};

export default MotionsGraphicsImages;
