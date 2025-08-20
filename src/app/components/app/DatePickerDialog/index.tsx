"use client";
import { FC, useEffect, useId, useRef, useState } from "react";

import { format, isValid, parse } from "date-fns";
import { DayPicker } from "react-day-picker";
import MyDatePicker from "../MyDatePicker";

type Props = {
  availableDates?: any[];
  onDateSelect?: (date: any) => void,
  label: string;
  name: string;
  placeholder?: string;
  value?: string;
  labelPosition?: 'out' | 'in',
  labelAlign?: 'left' | 'right'
  isError: boolean;
  showBorder?: boolean;
  errMsg?: string | any;
  leftIcon?: JSX.Element;
}

const DatePickerDialog: FC<Props> = ({ 
  availableDates, 
  onDateSelect,
  label,
  name,
  leftIcon,
  value = "",
  errMsg = '',
  placeholder = 'MM/DD/YYYY',
  labelPosition = 'out',
  labelAlign = 'left',
  isError = false,
  showBorder = true,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();
  const headerId = useId();

  // Hold the month in state to control the calendar when the input changes
  const [month, setMonth] = useState(new Date());

  // Hold the selected date in state
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Hold the input value in state
  const [inputValue, setInputValue] = useState(value);

  // Hold the dialog visibility in state
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to toggle the dialog visibility
  const toggleDialog = () => setIsDialogOpen(!isDialogOpen);

  // Hook to handle the body scroll behavior and focus trapping
  useEffect(() => {
    const handleBodyScroll = (isOpen: boolean) => {
      document.body.style.overflow = isOpen ? "hidden" : "";
    };
    if (!dialogRef.current) return;
    if (isDialogOpen) {
      handleBodyScroll(true);
      dialogRef.current.showModal();
    } else {
      handleBodyScroll(false);
      dialogRef.current.close();
    }
    return () => {
      handleBodyScroll(false);
    };
  }, [isDialogOpen]);

  const handleDayPickerSelect = (date: Date | undefined) => {
    if (!date) {
      setInputValue("");
      setSelectedDate(undefined);
    } else {
      setSelectedDate(date);
      setInputValue(format(date, "MM/dd/yyyy"));
      onDateSelect?.(date);
    }
    dialogRef.current?.close();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value); // Keep the input value in sync

    const parsedDate = parse(e.target.value, "MM/dd/yyyy", new Date());

    if (isValid(parsedDate)) {
      setSelectedDate(parsedDate);
      setMonth(parsedDate);
    } else {
      setSelectedDate(undefined);
    }
  };

  const handleOnDateSelect = (date: any) => {
    setIsDialogOpen(false);
    onDateSelect?.(date);
  }

  useEffect(() => {
    if(value){
      setInputValue(value);
    }
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full mb-2">
        <label 
          htmlFor={name}
          className={`block w-full font-montserrat text-[#263238] font-[500] text-sm text-left ${labelAlign === 'left' ? 'text-left' : 'text-right'}`}
        >
          {label}
        </label>
      </div>

      <div className={`${isError ? 'border-[#DD584F]' : 'border-lighterGray'} ${showBorder ? 'border-[1px]' : 'border-0'} rounded-[9px] bg-white`}>
        {
          (label && labelPosition === 'in') && 
          <div className={`w-full px-4 pt-2`}>
            <label htmlFor={name} className="block w-full font-montserrat text-[#263238] font-[500] text-sm">
              {label}
            </label>
          </div>
        }
        <div className="flex justify-between">
          {
            leftIcon && 
            <div className="flex justify-center items-center ml-4">
              {leftIcon}
            </div>
          }
          <div className="flex-grow">
            <input 
              style={{ fontSize: "inherit" }}
              id="date-input"
              type="text" 
              name={name} 
              value={inputValue}
              placeholder={placeholder}
              onClick={toggleDialog}
              onChange={handleInputChange}
              // className={`w-full border-0 bg-transparent focus:outline-none focus:ring-0 focus:border-0 px-4 ${labelPosition === 'out' ? 'py-3' : 'pt-1 pb-2'} lato-regular flex-1`}
              className={`w-full border-0 bg-inputGray rounded-[9px] px-4 font-montserrat placeholder:text-[#9FA6B2] focus:outline-none focus:ring-0 focus:border-0 ${labelPosition === 'out' ? 'py-2' : 'pt-2 pb-2'} lato-regular flex-1`}
            />
          </div>
        </div>
      </div>

{/* 
      <input
        
        value={inputValue}
        placeholder=""
        
      />
      <button
        style={{ fontSize: "inherit" }}
        onClick={toggleDialog}
        aria-controls="dialog"
        aria-haspopup="dialog"
        aria-expanded={isDialogOpen}
        aria-label="Open calendar to choose booking date"
      >
        📆
      </button> */}
      <p aria-live="assertive" aria-atomic="true">
        {selectedDate !== undefined
          ? selectedDate.toDateString()
          : "Please type or pick a date"}
      </p>
      <dialog
        role="dialog"
        ref={dialogRef}
        id={dialogId}
        aria-modal
        aria-labelledby={headerId}
        onClose={() => setIsDialogOpen(false)}
      >
        <MyDatePicker 
          availableDates={availableDates}
          onDateSelect={handleOnDateSelect}
        />
        {/* <DayPicker
          month={month}
          onMonthChange={setMonth}
          autoFocus
          mode="single"
          selected={selectedDate}
          onSelect={handleDayPickerSelect}
          footer={
            selectedDate !== undefined &&
            `Selected: ${selectedDate.toDateString()}`
          }
        /> */}
      </dialog>
    </div>
  );
}

export default DatePickerDialog;
