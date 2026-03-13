'use client';
import { LanguageIcon } from '@/components/icons';
import Dropdown from '@/components/ui/Dropdown';
import MotionsGraphicsImages from '@/components/ui/MotionsGraphicsImages';
import useTranslation from '@/hooks/useTranslation';
import { useSolarStore } from '@/lib/store';
import { ECMemberData, LangType } from '@/lib/types';
import { useGetEcMember } from '@/services/calculation-service';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const EXPERIENCE_CENTER = process.env.NEXT_PUBLIC_EXPERIENCE_CENTER;

function LeftOne() {
  const { currentLocale, handleLocaleChange, supportedLocals } =
    useTranslation();
  const pathname = usePathname();
  const ecMember = useGetEcMember();
  const lastSegment = pathname.split('/').filter(Boolean).pop();
  const setEcId = useSolarStore((state) => state?.setEcId);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const routesGroup = ['step-four', 'step-five', 'step-six'];
  const routes = ['step-one', 'step-two'];

  useEffect(() => {
    if (!ecMember.isSuccess || !(ecMember.data?.length > 0)) return;

    if (EXPERIENCE_CENTER) {
      const selectedMember: ECMemberData | undefined = ecMember.data.find(
        (member: ECMemberData) =>
          member.ec_name
            .toLowerCase()
            .includes(EXPERIENCE_CENTER.toLowerCase()),
      );
      if (selectedMember) {
        setEcId(selectedMember._id);
      } else {
        setEcId(ecMember.data[0]._id);
      }
    } else {
      setEcId(ecMember.data[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ecMember.isSuccess, ecMember.data]);

  return (
    <>
      {!routes.includes(lastSegment as string) && (
        <div className="absolute h-[415.5px] w-[831px] items-center justify-center rounded-t-full bg-[#00BDFF] blur-[148px]" />
      )}
      {routes.includes(lastSegment as string) && (
        <Image
          src={
            lastSegment === 'step-one'
              ? '/images/background/step-one.webp'
              : lastSegment === 'step-two'
                ? '/images/background/step-two.webp'
                : ''
          }
          sizes="100vw"
          width={0}
          height={0}
          priority={true}
          alt="House-image"
          className="absolute bottom-0 left-0 h-full w-full object-cover"
        />
      )}
      {lastSegment === 'step-three' && (
        <>
          <video
            src="/video/small-house.mp4"
            autoPlay
            muted
            loop
            className="absolute inset-0 h-full w-full object-cover"
            onCanPlay={() => setIsVideoLoaded(true)}
          />
          <div
            className={`absolute inset-0 z-10 flex items-center justify-center bg-gray-200 ${
              !isVideoLoaded ? 'opacity-100' : 'opacity-0'
            } pointer-events-none`}
          >
            <Image
              width={198}
              height={134}
              alt="logo"
              priority
              src="/images/logo.webp"
              className="animate-pulse"
            />
          </div>
        </>
      )}
      {routesGroup?.includes(lastSegment ?? '') && <MotionsGraphicsImages />}
      {lastSegment === 'step-one' && (
        <div className="!absolute top-10 right-10 flex items-center gap-7">
          <Dropdown
            options={supportedLocals}
            onSelect={(value) => handleLocaleChange(value as LangType)}
            value={currentLocale}
            leftIcon={<LanguageIcon />}
          />
        </div>
      )}
    </>
  );
}

export default LeftOne;
