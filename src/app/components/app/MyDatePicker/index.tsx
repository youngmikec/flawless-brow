"use client";

import { useState, FC } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

type Props = {
  availableDates?: any[]
}

const MyDatePicker: FC<Props> = ({ availableDates }) => {


  const [selected, setSelected] = useState<Date>();

  return (
    <DayPicker
      animate
      mode="single"
      selected={selected}
      onSelect={setSelected}
      modifiers={{
        available: availableDates,
      }}
      modifiersStyles={{
        available: { backgroundColor: '#C5A46D1A', color: '#263238', borderRadius: '50%' },

        navigator: { backgroundColor: '#1A1A1A', color: '#fff' },

      }}
      disabled={(date) =>
        !availableDates?.some(
          (availableDate) =>
            availableDate.toDateString() === date.toDateString()
        )
      }
      // footer={
      //   selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
      // }
    />
  );
};

export default MyDatePicker;
