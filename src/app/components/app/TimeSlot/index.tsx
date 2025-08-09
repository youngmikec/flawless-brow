'use client';

import { useState } from "react";

interface TimeSlotProps {
  time: string;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time }) => {
  const [isSelected, setIsSelected ] = useState<boolean>(false);
  return (
    <div 
      onClick={() => setIsSelected(!isSelected)}
      className={`border-[1px] cursor-pointer bg-white border-[#5A4A3F] w-full px-4 py-2 rounded-md flex justify-center items-center ${isSelected ? 'bg-[#5A4A3F]' : ''}`}>
      <p className={`${isSelected ? 'text-white' : 'text-[#5A4A3F]'}`}>{time}</p>
    </div>
  );
};

export default TimeSlot;