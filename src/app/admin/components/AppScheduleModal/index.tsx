"use client"

import React, { ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

import { useScheduleStore } from '../../../../store/schedule-store';

type Props = {
    children: ReactNode,
    title: string;
}

const AppScheduleModal = ({ children, title }: Props) => {
  const { showScheduleModal, toggleScheduleModal } = useScheduleStore();
  // close modal
  const closeModal = () => {
    toggleScheduleModal(false)
  }

  return (
    <>
      {
        showScheduleModal &&
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#4242428f] w-full h-full z-30 overflow-scroll">
          <div className='my-16'>
            <div className="bg-white pb-8 rounded-2xl mx-auto w-11/12 sm:w-11/12 md:w-7/12 lg:w-4/12 min-h-[50vh]">
              <div className='flex justify-between items-center mb-8 p-2 lg:p-4'>
                <p className="font-bold text-lg md:text-xl text-black">{ title }</p>
                <div className="relative">
                  <button 
                    onClick={() => closeModal()} 
                    type="button" 
                    className=" hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ml-auto flex justify-center items-center" 
                    data-modal-hide="popup-modal">
                    <FaTimes size={20} className="text-[#1D1C1DB2]" />
                  </button>
                </div>
              </div>

                {/* content */}
                <div className='min-h-52'>
                  { children }
                </div>
                {/* content */}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default AppScheduleModal;