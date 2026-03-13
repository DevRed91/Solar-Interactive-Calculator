import ProgressBar from '@/components/ui/ProgressBar';
import {
  calculateStepProgress,
  getStepBySlug,
  shouldShowProgressBar,
} from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import React from 'react';

async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const step = getStepBySlug(slug);
  if (!step) notFound();

  const progressWidth = calculateStepProgress(slug);
  const showProgressBar = shouldShowProgressBar(slug);
  return (
    <div className="grid h-screen w-full grid-cols-20">
      {/* left */}
      <div
        className={`relative col-span-11 flex h-full w-full items-center justify-center bg-linear-(--blue-sweep-gradient) ${step.leftClassName ?? ''}`}
      >
        {!step.hideLogo && (
          <Image
            src="/images/Group.svg"
            width={0}
            height={0}
            sizes="100vw"
            alt="solar logo"
            className="absolute top-12 left-12 z-[1] h-[94px] w-[137px] object-contain"
          />
        )}
        <step.leftComponent />
      </div>
      {/* right */}
      <div className={`relative col-span-9 ${step.rightClassName ?? ''}`}>
        {showProgressBar && (
          <ProgressBar
            width={progressWidth}
            className="absolute inset-x-0 top-0"
          />
        )}
        <div className="border-black-100 flex h-full w-full flex-col gap-10 border-l p-[60px]">
          <step.rightComponent />
        </div>
      </div>
    </div>
  );
}

export default Page;
