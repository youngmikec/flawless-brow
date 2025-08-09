"use client"
import { FC } from "react";
import MyDatePicker from "../../../components/app/MyDatePicker";
import TimeSlot from "../../../components/app/TimeSlot";
import AppButton from "../../../components/app/AppButton";


type Props = {
  toggleStep: (step: "prev" | "next") => void;
}

const TimePickerComp: FC<Props> = ({ toggleStep }) => {
  const availableDates = [
    new Date(2025, 7, 10),
    new Date(2025, 7, 15),
    new Date(2025, 7, 20),
  ];


  return (
    <>
      <div className="w-full flex flex-col md:flex-row gap-8">

        <div className="flex justify-center md:justify-start">
          <MyDatePicker availableDates={availableDates} />


        </div>
        <div>
          <p className="text-sm text-[#192020] font-[300] text-center">Montag, 18. September</p>

          <div className="my-4">
            <TimeSlot time="5:30 PM" />
          </div>
          <div className="my-4">
            <TimeSlot time="5:30 PM" />
          </div>
          <div className="my-4">
            <TimeSlot time="5:30 PM" />
          </div>
          <div className="my-4">
            <TimeSlot time="5:30 PM" />
          </div>
        </div>
      </div>

      <div className="my-4 flex gap-4 items-center">
        <AppButton
          btnText={'Back'}
          fill={'outline'}
          bgColor={"black"}
          width={"max"}
          onClick={() => toggleStep('prev')}
        />
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
