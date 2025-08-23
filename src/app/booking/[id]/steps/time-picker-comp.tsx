"use client"
import { FC, useState, useEffect } from "react";
import MyDatePicker from "../../../components/app/MyDatePicker";
import TimeSlot from "../../../components/app/TimeSlot";
import AppButton from "../../../components/app/AppButton";
import { useAppointmentStore } from "../../../../store/appointment";
import { ISchedule } from '../../../../interfaces';
import { useSchedules } from '../../../hooks';



type Props = {
  step: number;
  toggleStep: (step: "prev" | "next") => void;
}

const TimePickerComp: FC<Props> = ({ step, toggleStep }) => {

  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [avialableSchedules, setAvailableSchedules]  = useState<ISchedule[]>([]);


  const { appendAppointData, createAppointment } = useAppointmentStore();

  const availableDates = [
    new Date(2025, 7, 10),
    new Date(2025, 7, 15),
    new Date(2025, 7, 20),
  ];

  const { data, refetch } = useSchedules("", true);

  useEffect(() => {
    data && setAvailableSchedules(data);
  }, [])

  const handleSeletTime = (data: string, type: 'time' | 'date') => {
    if(type === 'time') {
      setSelectedTime(data);
      appendAppointData({ appointmentTime: data });
    } else {
      setSelectedDate(data);
      appendAppointData({ appointmentDay: data });
    }
  }


  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">

        <div className="flex justify-center md:justify-start">
          <MyDatePicker 
            availableDates={availableDates} 
            onDateSelect={(data) => handleSeletTime(data, 'date')}

            // selectedDate={selectedDate}
          />


        </div>
        <div>
          <p className="text-sm text-[#192020] font-[300] text-center">Montag, 18. September</p>

          {
            avialableSchedules.length && avialableSchedules.map((schedule: ISchedule, idx: number) => (
              <div 
                className="my-4"
                key={idx}
              >
                <TimeSlot 
                  isSelected={selectedTime === schedule.startTime}
                  selectedTime={selectedTime}
                  time={`${schedule.startTime} - ${schedule.endTime}`} 
                  onClick={() => handleSeletTime(schedule.startTime, 'time')} 
                />
              </div>
            ))
          }
        </div>
      </div>

      <div className="my-4 flex gap-4 items-center">
        {
          step > 1 && (
            <AppButton
              btnText={'Back'}
              fill={'outline'}
              bgColor={"black"}
              width={"max"}
              onClick={() => toggleStep('prev')}
            />
          )
        }

        <AppButton
          btnText={'Continue'}
          fill={'fill'}
          bgColor={'primary'}
          width={"max"}
          onClick={() => toggleStep('next')}

        />
      </div>

    </>
  )
}

export default TimePickerComp;
