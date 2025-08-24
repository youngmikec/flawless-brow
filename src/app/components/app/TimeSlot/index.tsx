'use client';

import { useState, useEffect } from "react";
import { ISchedule } from '../../../../interfaces';

interface TimeSlotProps {
  schedule: ISchedule;
  selectedTime?: any;
  onClick: (time: ISchedule) => void;
}

const TimeSlot: React.FC<TimeSlotProps> = ({ schedule, selectedTime, onClick }) => {

  const [active, setActive] = useState<boolean>(false);
  useEffect(() => {
    setActive(schedule.startTime === selectedTime?.startTime);
  }, [schedule, selectedTime]);

  return (
    <div 
      onClick={() => onClick(schedule)}
      className={`border-[1px] cursor-pointer border-[#5A4A3F] w-full px-4 py-2 rounded-md flex justify-center items-center ${active ? 'bg-[#5A4A3F]' : 'bg-white'}`}>
      <p className={`${active ? 'text-white' : 'text-[#5A4A3F]'}`}>{ schedule?.startTime }</p>
    </div>
  );
};

export default TimeSlot;