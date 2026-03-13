import { FC } from 'react';

const AnimatingDots: FC<{ color: string }> = ({ color }) => {
  return (
    <div className="flex space-x-3">
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
      ></div>
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
        style={{ animationDelay: '0.3s' }}
      ></div>
      <div
        className={`animate-pulse-scale h-3.5 w-3.5 rounded-full ${color}`}
        style={{ animationDelay: '0.6s' }}
      ></div>
    </div>
  );
};

export default AnimatingDots;
