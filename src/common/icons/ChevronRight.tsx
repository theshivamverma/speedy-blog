import React from 'react'
import { IconProps } from '../types';

const ChevronRight: React.FC<IconProps> = ({size = 16, className, color = '#000'}) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24"
      height={size}
      width={size}
      className={className}
      fill={color}
    >
      <path d="M13.1714 12.0007L8.22168 7.05093L9.63589 5.63672L15.9999 12.0007L9.63589 18.3646L8.22168 16.9504L13.1714 12.0007Z" />
    </svg>
  );
}

export default ChevronRight