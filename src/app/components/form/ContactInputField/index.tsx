"use client"

import { FC, useEffect, useState } from "react";
import { SelectOption } from "../SelectField";
import Image from "next/image";

type Props = {
  value: string | number | boolean | any;
  label?: string;
  labelPosition?: 'out' | 'in';
  labelAlign?: 'left' | 'right';
  name: string;
  bgColor?: string;
  rightIcon?: JSX.Element;
  leftIcon?: JSX.Element;
  placeholder?: string;
  isError: boolean;
  isLoading?: boolean;
  showBorder?: boolean;
  disableErrMsg?: boolean;
  isChild?: boolean;
  errMsg?: string | any;
  selectOptions?: SelectOption[] | any[];
  type: 'text' | 'email' | 'phone' | 'date' | 'number' | 'password' | 'checkbox' | 'radio' | 'hidden' | 'file' | 'url' | 'search' | 'color' | 'datetime-local' | 'time' | 'month' | 'week' | 'range' | 'image' | 'submit' | 'reset' | 'button'
  // onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> | any) => void;
  onChange: (value: string, fieldName: string) => any;
  onSelectValue?: (value: string, fieldName: string) => any;
}

const ContactInputField: FC<Props> = ({ 
  value,
  labelPosition = 'out',
  labelAlign = 'left',
  label,
  name,
  // bgColor = 'white',

  placeholder,
  rightIcon,
  leftIcon,
  isError,
  showBorder = true,
  disableErrMsg = false,
  selectOptions = [],
  isLoading = false,
  isChild = false,
  errMsg = '',
  type = 'text',
  onChange,
  onSelectValue,
 }) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<string>(value);

  const handleChange = (value: string, fieldName: string) => {
    setLocalValue(value);
    onChange && onChange(value, fieldName);
  }

  const handleSelect = (option: SelectOption) => {
    setLocalValue(option.value)
    onSelectValue && onSelectValue(option.value, name);
    setShowOptions(false);
  }

  useEffect(() => {
    if(value){
      setLocalValue(value);
    }
  }, []);


  return (
    <div className="my-2">
      <div 
        className={`${isError ? 'border-[#DD584F]' : 'border-[#BDC3C6]'} w-full flex flex-row justify-start items-center gap-4 border-[1px] bg-white rounded-md px-4 py-1 relative `}
        >
        <div className="absolute -top-4 w-max bg-white z-10 p-1">
          { label }
        </div>

        <div>
          <Image 
            src="/svgs/user.svg"
            alt="user icon"
            width={15}
            height={15}
          />
        </div>
        <div>
          <hr className="w-[1px] h-6 bg-[#BDC3C6]" />
        </div>
        <div className="flex-grow">
          <input 
            type={type} 
            name={name} 
            value={localValue} 
            placeholder={placeholder}
            onClick={() => selectOptions.length > 0 && setShowOptions(prev => !prev)}
            onChange={(e) => handleChange(e.target.value, name)} 
            className={`w-full border-0 bg-inputGray rounded-[9px] font-montserrat placeholder:text-[#9FA6B2] focus:outline-none focus:ring-0 focus:border-0 ${isChild ? 'px-0': 'px-4'} ${labelPosition === 'out' ? 'py-2' : 'pt-2 pb-2'} lato-regular flex-1`}
          />
        </div>

        {/* select options */}
        {
          showOptions && (
            <div className="absolute left-0 right-0 top-12 w-full ease-in-out delay-500 rounded-[9px] bg-white py-2 min-h-[30px] max-h-max shadow-md z-50">
              {
                selectOptions.length > 0 ? selectOptions.map((item: SelectOption, idx: number) => {
                  return <p 
                    key={idx} 
                    className='text-sm text-textBlack lato-bold font-semibold cursor-pointer my-1 py-1 px-3 hover:bg-lighterGray'
                    onClick={() => handleSelect(item)}
                  >{item.label}</p>
                }) :
                <p className='text-sm text-textBlack lato-bold font-semibold'>No Options</p>
              }
            </div>
          )
        }
        {/* select options */}
      </div>


      {
        (isError && errMsg) && 
        <p className="text-[#DD584F] my-2 text-xs font-semibold">{errMsg}</p>
      }
    </div>
  )
}

export default ContactInputField;