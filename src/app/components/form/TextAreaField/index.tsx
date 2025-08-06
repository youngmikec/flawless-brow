"use client";

import { FC, useEffect, useState } from "react";
import { SelectOption } from "../SelectField";

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
  rows?: number;
  isLoading?: boolean;
  showBorder?: boolean;
  disableErrMsg?: boolean;
  isChild?: boolean;
  errMsg?: string | any;
  selectOptions?: SelectOption[] | any[];
  onChange: (value: string, fieldName: string) => any;
}

const TextAreaField: FC<Props> = ({
  value,
  labelPosition = 'out',
  labelAlign = 'left',
  label,
  name,
  placeholder,
  rightIcon,
  leftIcon,
  isError,
  rows = 30,
  showBorder = true,
  disableErrMsg = false,
  isLoading = false,
  isChild = false,
  errMsg = '',
  onChange,
}) => {
  const [localValue, setLocalValue] = useState<string>(value);


  const handleChange = (value: string, fieldName: string) => {
    setLocalValue(value);
    onChange && onChange(value, fieldName);
  }

  useEffect(() => {
    if(value){
      setLocalValue(value);
    }
  }, []);


  return isLoading ? (<p>Loading...</p>) : (
    <>
      <div className={`w-full relative ${!isChild && 'my-2'}`}>
        {
          (label && labelPosition === 'out') && 
          <div className="w-full mb-2">
            <label 
              htmlFor={name} 
              className={`block w-full font-montserrat text-[#263238] font-[500] text-sm ${labelAlign === 'left' ? 'text-left' : 'text-right'}`}
            >
              {label}
            </label>
          </div>
        }
        <div className={`${isError ? 'border-[#DD584F]' : 'border-lighterGray'} ${showBorder ? 'border-[1px]' : 'border-0'} rounded-[9px] bg-white`}>
          {
            (label && labelPosition === 'in') && 
            <div className={`w-full ${!isChild && 'px-4 pt-2'}`}>
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
                <textarea 
                    name={name}
                    rows={rows}
                    value={localValue} 
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value, name)} 
                    className={`w-full border-0 bg-inputGray rounded-[9px] font-montserrat placeholder:text-[#9FA6B2] focus:outline-none focus:ring-0 focus:border-0 ${isChild ? 'px-0': 'px-4'} ${labelPosition === 'out' ? 'py-2' : 'pt-2 pb-2'} lato-regular flex-1`}
                >
                </textarea>
            </div>
            
            {
              rightIcon && 
              <div className="flex justify-center items-center px-4">
                {rightIcon}
              </div>
            }
            
          </div>
        </div>

        {
          (isError && disableErrMsg) && 
          <p className="text-[#DD584F] my-2 text-xs font-semibold">{errMsg}</p>
        }
      </div>
    </>
  )
}

export default TextAreaField;