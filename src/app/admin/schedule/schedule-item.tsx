"use client";

import { FC } from 'react';
import Image from 'next/image';
import { ISchedule } from '../../../interfaces';
import AppButton from '../../components/app/AppButton';

type Props = {
    schedule: ISchedule;
    onAction: (schedule: ISchedule, action: 'update' | 'delete') => void;
}


const ScheduleItem: FC<Props> = ({ schedule, onAction }) => {
  return (
    <div className="w-11/12 md:w-11/12 mx-auto flex justify-start items-center gap-6 my-2">
      <div>
        <Image 
          src="/svgs/date-icon.svg"
          alt="date" 
          width={20}
          height={20}
        />
      </div>
      <div>
        <p className="text-[#5A4B3D] text-sm font-inter">{schedule.scheduleDate} {schedule.startTime} - {schedule.endTime}</p>
      </div>
      <div>
        <AppButton 
          btnText={"Edit"}
          fill={"outline"}
          width={'max'}
          btnSize="sm"
          bgColor={"black"}
          onClick={() => onAction(schedule, 'update')}
        />
      </div>
      <div>
        <AppButton 
          btnText={"Delete"}
          fill={"outline"}
          width={'max'}
          btnSize="sm"
          bgColor={"black"}
          onClick={() => onAction(schedule, 'delete')}
        />
      </div>
    </div>
  )
}

export default ScheduleItem;