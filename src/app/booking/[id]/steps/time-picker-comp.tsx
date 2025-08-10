"use client"
import { FC, useState } from "react";
import MyDatePicker from "../../../components/app/MyDatePicker";
import TimeSlot from "../../../components/app/TimeSlot";
import AppButton from "../../../components/app/AppButton";
import { useAppointmentStore } from "../../../../store/appointment";



type Props = {
  step: number;
  toggleStep: (step: "prev" | "next") => void;
}

const TimePickerComp: FC<Props> = ({ step, toggleStep }) => {

  const [selectedDate, setSelectedDate] = useState<any | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);


  const { appendAppointData, createAppointment } = useAppointmentStore();

  const availableDates = [
    new Date(2025, 7, 10),
    new Date(2025, 7, 15),
    new Date(2025, 7, 20),
  ];

  console.log('createAppointment', createAppointment);
  console.log('selectedDate', selectedDate);
  console.log('selectedTime', selectedTime);
  console.log('availableDates', availableDates);




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

          <div className="my-4">
            <TimeSlot 
              isSelected={selectedTime === '5:30 PM'}
              selectedTime={selectedTime}
              time="5:30 PM" 
              onClick={() => handleSeletTime('5:30 PM', 'time')} 

            />
          </div>
          <div className="my-4">
            <TimeSlot 
              selectedTime={selectedTime}
              isSelected={selectedTime === '6:00 PM'} 
              time="6:00 PM" 
              onClick={() => handleSeletTime('6:00 PM', 'time')} 

            />
          </div>
          <div className="my-4">
            <TimeSlot 
              selectedTime={selectedTime}
              isSelected={selectedTime === '6:30 PM'}
              time="6:30 PM" 
              onClick={() => handleSeletTime('6:30 PM', 'time')} 

            />
          </div>
          <div className="my-4">
            <TimeSlot 
              selectedTime={selectedTime}
              isSelected={selectedTime === '7:00 PM'}
              time="7:00 PM" 
              onClick={() => handleSeletTime('7:00 PM', 'time')} 

            />
          </div>
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
          btnText={'Book Now'}
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
