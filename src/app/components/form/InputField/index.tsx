"use client";

import { FC, useEffect, useState } from "react";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
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
  isLoading?: boolean;
  isError: boolean;
  showBorder?: boolean;
  errMsg?: string | any;
  disableErrMsg?: boolean;
  isChild?: boolean;
  selectOptions?: SelectOption[] | any[];
  type: 'text' | 'email' | 'phone' | 'date' | 'number' | 'password' | 'checkbox' | 'radio' | 'hidden' | 'file' | 'url' | 'search' | 'color' | 'datetime-local' | 'time' | 'month' | 'week' | 'range' | 'image' | 'submit' | 'reset' | 'button'
  // onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLSelectElement> | any) => void;
  onChange: (value: string, fieldName: string) => any;
  onSelectValue?: (value: string, fieldName: string) => any;
}

const InputField: FC<Props> = ({
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
  const [inputType, setInputType] = useState<string>(type)
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [localValue, setLocalValue] = useState<string>(value);
  // const [selectedValue, setSelectedValue] = useState<string>(value);

  const toggleShowPassword = () => {
    setShowPassword(prev => {
      const newState = !prev;
      setInputType(newState ? 'text' : 'password');
      return newState
    });
  }

  const handleChange = (value: string, fieldName: string) => {
    setLocalValue(value);
    onChange && onChange(value, fieldName);
  }

  const handleSelect = (option: SelectOption) => {
    onSelectValue && onSelectValue(option.value, name);
    setShowOptions(false);
  }

  useEffect(() => {
    if(value){
      setLocalValue(value);
    }
  }, []);
  useEffect(() => {
    if(selectOptions.length > 0){
      setShowOptions(true);
    }
  }, [selectOptions]);

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
              <input 
                type={inputType} 
                name={name} 
                value={localValue} 
                placeholder={placeholder}
                onClick={() => selectOptions.length > 0 && setShowOptions(prev => !prev)}
                onChange={(e) => handleChange(e.target.value, name)} 
                // className={`w-full border-0 bg-transparent focus:outline-none focus:ring-0 focus:border-0 px-4 ${labelPosition === 'out' ? 'py-3' : 'pt-1 pb-2'} lato-regular flex-1`}
                className={`w-full border-0 bg-inputGray rounded-[9px] font-montserrat placeholder:text-[#9FA6B2] focus:outline-none focus:ring-0 focus:border-0 ${isChild ? 'px-0': 'px-4'} ${labelPosition === 'out' ? 'py-2' : 'pt-2 pb-2'} lato-regular flex-1`}
              />
            </div>
            
            {
              rightIcon && 
              <div className="flex justify-center items-center px-4">
                {rightIcon}
              </div>
            }
            {
              type === 'password' && 
              <div className="cursor-pointer bg-inputGray flex justify-center items-center px-4" onClick={toggleShowPassword}>
                {
                  showPassword ? <BsFillEyeSlashFill size={16} /> : <BsFillEyeFill size={16} />
                }
              </div>
            }
          </div>
        </div>

        {/* select options */}
        {
            showOptions && (
              <div className="absolute left-0 rght-0 top-16 w-full ease-in-out delay-500 rounded-[9px] bg-white py-2 min-h-[30px] max-h-max shadow-md z-50">
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

        {
          (isError && errMsg) && 
          <p className="text-[#DD584F] my-2 text-xs font-semibold">{errMsg}</p>
        }
      </div>
    </>
  )
}

export default InputField;