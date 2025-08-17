'use client';

import { useState, useEffect } from "react";

interface TimeSlotProps {
  time: string;
  selectedTime?: any;
  isSelected?: boolean;
  onClick: (time: string) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ time, isSelected = false, selectedTime, onClick }) => {
  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    setActive(selectedTime === time);
  }, [selectedTime, time]);

  return (
    <div 
      onClick={() => onClick(time)}
      className={`border-[1px] cursor-pointer border-[#5A4A3F] w-full px-4 py-2 rounded-md flex justify-center items-center ${active ? 'bg-[#5A4A3F]' : 'bg-white'}`}>
      <p className={`${active ? 'text-white' : 'text-[#5A4A3F]'}`}>{time}</p>
    </div>
  );
};

export default TimeSlot;