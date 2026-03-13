import React from 'react';

const ProgressBar = ({
  width,
  className = '',
}: {
  width: number;
  className?: string;
}) => {
  return (
    <div className={`bg-black-10 h-2.5 w-full ${className}`}>
      <div
        className="bg-secondary-blue-300 h-full"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
