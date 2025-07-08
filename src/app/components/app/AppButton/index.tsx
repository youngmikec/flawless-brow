"use client";
import { FC } from "react";
// import LoadSpinner from "../Loaders/LoadSpinner";

type Props = {
  width?: 'full' | 'max' ;
  btnText: string,
  btnIcon?: JSX.Element,
  bgColor: 'primary' | 'gray' | 'blue';
  textColor?: string;
  disabled?: boolean;
  fill?: 'fill' | 'outline'
  iconPosition?: 'left' | 'right',
  onClick?: () => void,
  loading?: boolean;
  type?: "submit" | "button" | "reset";
}

const AppButton: FC<Props> = ({ 
  width = 'max',
  loading = false,
  btnText, 
  btnIcon, 
  bgColor = 'primary', 
  fill = 'fill', 
  iconPosition, 
  type = 'submit',
  disabled = false,
  onClick 
}) => {

  const handleOnClick = () => {
    if(onClick) onClick();
  } 

  return (
    <button
      type={ type }
      disabled={disabled}
      className={
        `
          ${width === 'full' ? 'w-full' : 'min-w-[100px] max-w-fit'} min-h-[35px] max-h-[45px] text-sm lato-regular delay-200 ease-in ${ disabled ? 'cursor-not-allowed' : 'cursor-pointer' }
          ${
            fill === 'fill' && 
            ` 
              ${bgColor === 'blue' && `bg-textBlue text-white hover:bg-white hover:text-textBlue border-textBlue border-[1px]`}
              ${bgColor === 'primary' && `bg-primary text-white hover:bg-white hover:text-primary border-primary border-[1px]`}
              ${bgColor === 'gray' && `bg-lightGray text-darkGray hover:bg-darkGray hover:text-lightGray border-lighterGray border-[1px]`}
            `
          }
          ${ fill === 'outline' && 
            ` bg-transparent 
              ${bgColor === 'primary' && `border-primary text-primary border-[1px] hover:bg-primary hover:text-[white]`} 
              ${bgColor === 'blue' && `border-textBlue text-textBlue border-[1px] hover:bg-textBlue hover:text-[white]`} 
              ${bgColor === 'gray' && `border-darkGray text-darkGray border-[1px] hover:bg-lightGray hover:text-darkGray`} 
            `
          } 
          flex justify-center items-center py-4 px-10 rounded-[50px] font-montserrat
        `
      }
      onClick={handleOnClick}
    >
      { 
        (iconPosition === 'left' && btnIcon) && 
        <div className="mx-2">{ btnIcon }</div>
      }
      { loading ? 
      (
        <div className="flex justify-center items-center gap-4">
            <div>
                {/* <LoadSpinner /> */}
            </div>
            <p>loading...</p>
        </div>
      )
      : <p className="text-[14px] font-montserrat">{btnText}</p> }
      { 
        (iconPosition === 'right' && btnIcon) && 
        <div className="mx-2">{ btnIcon }</div>
      }
    </button>
  )
}

export default AppButton;