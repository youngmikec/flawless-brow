"use client"
import { FC, useState, useEffect } from "react";
import MyDatePicker from "../../../components/app/MyDatePicker";
import TimeSlot from "../../../components/app/TimeSlot";
import AppButton from "../../../components/app/AppButton";
import { useAppointmentStore } from "../../../../store/appointment";
import { ISchedule } from '../../../../interfaces';
import { useSchedules } from '../../../hooks';
import { formatDate } from "../../../../utils";



type Props = {
  step: number;
  toggleStep: (step: "prev" | "next") => void;
}

const TimePickerComp: FC<Props> = ({ step, toggleStep }) => {

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<ISchedule | null>(null);
  const [availableSchedules, setAvailableSchedules]  = useState<ISchedule[]>([]);
  const [availableDates, setAvailableDates] = useState<any[]>([]);
  
  // new Date(2025, 7, 10),
  // new Date(2025, 7, 15),
  // new Date(2025, 7, 20),

  const { appendAppointData, createAppointment } = useAppointmentStore();


  const { data } = useSchedules("", true);

  const handleSeletTime = (data: string, type: 'time' | 'date') => {
    console.log(data, type);
    if(type === 'time') {
      const time = availableSchedules.find((schedule: ISchedule) => schedule._id === data);
      if(time){
        setSelectedTime(time);
        appendAppointData({ appointmentTime: time.startTime });
      }
    } else {
      setSelectedDate(data);
      appendAppointData({ appointmentDay: data });
    }
  }

  useEffect(() => {
    if(data) {
      setAvailableSchedules(data);
      const dates = data.map((schedule: ISchedule) => new Date(schedule.scheduleDate));
      setAvailableDates(dates);
    }
  }, [data]);


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
          {
            selectedDate !== '' && (
              <p className="text-sm text-[#192020] font-[300] text-center">{ formatDate(selectedDate) as string }</p>
            )
          }

          {
            availableSchedules.length && availableSchedules.map((schedule: ISchedule, idx: number) => (
              <div 
                className="my-4"
                key={idx}
              >
                <TimeSlot 
                  selectedTime={selectedTime}
                  schedule={schedule}
                  onClick={(scheduleResp) => handleSeletTime(scheduleResp?._id || '', 'time')} 
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
