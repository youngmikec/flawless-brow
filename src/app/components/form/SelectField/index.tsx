"use client";

import { FC, useState, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import LoadSpinner from '../../app/Loaders/LoadSpinner';


export type SelectOption = {label: any, value: string}

type Props = {
  value: string | number | boolean | any;
  label?: string;
  bgColor?: string;
  border?: 'border' | 'no-border';
  labelPosition?: 'right' | 'left';
  textPosition?: 'right' | 'left'
  name: string;
  isLoading?: boolean;
  selectOptions: SelectOption[];
  isError: boolean;
  errMsg: string | any;
  onChange: (fieldName: string, value: any) => void;
  showEmptyOption?: boolean;
} 

const SelectField: FC<Props> = ({
  value,
  label,
  // bgColor = 'white',
  labelPosition = 'left',
  textPosition = 'left',
  border = 'border',
  name,
  selectOptions,
  isError,
  isLoading = false,
  errMsg,
  onChange,
  showEmptyOption = true
}) => {

  const [selectedOption, setSelectedOption] = useState<SelectOption>({label: '', value: ''});
  const [currentOption, setCurrentOption] = useState<SelectOption>({label: '', value: ''});
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handleSelect = (option: SelectOption) => {
    setSelectedOption(option);
    onChange && onChange(name, option.value);
    setShowOptions(false);
  }

  useEffect(() => {
    if(selectOptions.length > 0){
      setCurrentOption(selectOptions[0]);
    }
  }, [selectOptions]);

  useEffect(() => {
    if(selectedOption){
      setCurrentOption(selectedOption);
    }
  }, [selectedOption]);


  return (
    <>
      <div className={`w-full`}>
        {
          label && 
          <div className={`w-full flex text-left mb-1 ${labelPosition === 'left' ? 'md:text-left lg:text-left' : 'md:text-right lg:text-right'}`}>
            <label htmlFor={name} className="block w-full text-sm md:text-[13px] lg:text-[14px] font-montserrat text-[#263238] font-[500]">
              {label}
            </label>
          </div>
        }
        <div className={`
          w-full ${border === 'border' ? 'border-lighterGray border-[1px]' : 'border-0'} rounded-[9px] relative px-4 py-2 bg-white
        `}>
          <div className="flex justify-between gap-4 cursor-pointer min-h-[24px]" onClick={() => setShowOptions(prev => !prev)}>
            <div className="flex-grow">
              {
                (showEmptyOption && !isLoading) ? 
                <p className={`font-montserrat bg-inputGray text-[12px] md:text-[14px] lg:text-[14px] ${textPosition === 'right' ? 'md:text-right lg:text-right' : 'md:text-left lg:text-left'}`}>
                  { currentOption.label ? currentOption.label : 'Select Option' }
                </p> : 
                <LoadSpinner />
              }
            </div>
            
            {
              (border === 'border') && (
                <div className="flex justify-center items-center bg-inputGray">
                  <IoIosArrowDown size={16} className='text-textBlack' />
                </div>
              )
            }
            
          </div>
          {/* select options */}
          {
            showOptions && (
              <div className="absolute max-h-[150px] overflow-y-scroll left-0 right-0 top-12 ease-in-out delay-500 w-full rounded-[9px] bg-white px-3 py-2 min-h-[30px] shadow-md z-50">
                {
                  selectOptions.length > 0 ? selectOptions.map((item: SelectOption, idx: number) => {
                    return <p 
                      key={idx} 
                      className='text-sm text-black cursor-pointer my-1 py-1 px-1 hover:bg-gray-lighter'
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
          isError && 
          <p className="text-red my-2 text-xs font-semibold">{errMsg}</p>
        }
      </div>
    </>
  )
}

export default SelectField;