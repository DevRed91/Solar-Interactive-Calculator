import Image from 'next/image';

const LeftFive = () => {
  return (
    <Image
      src={'/images/background/step-one.webp'}
      sizes="100vw"
      width={0}
      height={0}
      alt="House-image"
      className="absolute bottom-0 left-0 h-full w-full"
    />
  );
};

export default LeftFive;
