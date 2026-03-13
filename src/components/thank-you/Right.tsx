"use client"
import RightSectionWrapper from '@/components/layout/RightSectionWrapper';
import Image from 'next/image';
import useTranslation from '@/hooks/useTranslation';
import { EXPERIENCE_CENTER } from '../steps/step-one/LeftOne';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  location: 'Pune' | 'Nagpur' | 'Lucknow';
}

const ThankYouRight = () => {
  const { dictionary } = useTranslation();

  const isPune = EXPERIENCE_CENTER === 'Pune';
  const allMembers =
    (dictionary['thankYou']?.right?.teamSection?.members as TeamMember[]) || [];
  
  const filteredMembers = allMembers.filter((member) =>
    isPune ? member.location === 'Pune' : member.location === 'Nagpur',
  );

  return (
    <RightSectionWrapper
      title={dictionary['thankYou'].right.teamSection.title}
      className={`bg-primary-100 border-primary-200 ${isPune ? 'gap-1' : 'gap-8'} border-l`}
      mixColorsClassName={`${isPune ? 'mt-5' : 'mt-[60px]'} mx-[30px] py-2 pl-4 pr-10 !font-dm-sans bg-linear-(--thank-you-title-bg) rounded-xl`}
      mixColorsContentClassName="!font-dm-sans !text-[40px]/14 font-semibold -tracking-[0.8px] !text-black-500"
    >
      <div
        className={`grid !grow-0 grid-cols-2 ${isPune ? 'gap-y-5' : 'gap-y-8'} px-10 pt-0`}
      >
        {filteredMembers.map((item, index) => (
          <div key={index} className="flex flex-col items-center gap-3">
            <Image
              height={0}
              width={0}
              sizes="100vw"
              src={item.image}
              alt={item.name}
              className="aspect-[53/63] h-[207px] w-[174px] rounded-4xl rounded-bl-none object-cover"
            />
            <div className="font-dm-sans flex flex-col items-center gap-1">
              <div className="text-black-500 text-[32px]/[45px] font-semibold -tracking-[1.28px]">
                {item.name}
              </div>
              <div className="text-black-300 text-2xl/[34px] font-medium -tracking-[0.96px]">
                {item.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </RightSectionWrapper>
  );
}

export default ThankYouRight