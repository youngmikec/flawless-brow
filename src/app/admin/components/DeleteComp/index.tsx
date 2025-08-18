"use client";

import { FC, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { useAppStore } from '../../../../store/app-store';
import LoadSpinner from '../../../components/app/Loaders/LoadSpinner';

type Props = {
  id?: string,
  action: (id: string) => any,
  onDeleteSuccess?: (msg: string, data: any) => any
}

const DeleteComp: FC<Props> = ({ id, action, onDeleteSuccess }) => {
  const { showDeleteModal, toggleDeleteModal, toggleAppModal } = useAppStore();
  const [deleting, setDeleting] = useState<boolean>(false);
  
  // close modal
  const closeModal = () => {
    toggleDeleteModal(false);
  }
  const handleDelete = async () => {
    try {
      setDeleting(true)
      const recordId: string = id ? id : '';
      const response = await action(recordId);
      if(response) {
        const { success, message, data } = response.data;
        if(success){
          setDeleting(false);
          onDeleteSuccess && onDeleteSuccess(message, data);
          toggleDeleteModal(false);
          toggleAppModal(false);
          // notify('success', message);
        }
      }
    }catch (err: any) {
      setDeleting(false)
    }
  }

    return (
    <>
      {
        showDeleteModal &&
        <div className="fixed top-0 bottom-0 left-0 right-0 bg-[#4242428f] w-full h-full z-30 overflow-scroll">
          <div className='my-16'>
            <div className="bg-white pb-8 rounded-2xl mx-auto w-11/12 sm:w-11/12 md:w-7/12 lg:w-5/12 min-h-[30vh]">
              <div className='flex justify-between items-center mb-8 p-2 lg:p-4'>
                <p className="font-bold text-lg md:text-xl text-black">Delete Modal</p>
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
                  <div className="p-6 text-center my-8">
                    <svg className="mx-auto mb-4 text-gray-400 w-12 h-12" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                    </svg>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this record?</h3>
                    <button 
                      data-modal-hide="popup-modal" 
                      type="button"
                      onClick={() => handleDelete()}
                      className="
                        text-white bg-red-600 hover:bg-red-800 focus:ring-4 
                        focus:outline-none focus:ring-red-300 font-medium rounded-lg 
                        text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                    >
                      { deleting ? "loading..." : "Delete" }
                    </button>
                    <button 
                      data-modal-hide="popup-modal" 
                      type="button"
                      onClick={() => closeModal()}
                      className="
                        text-gray bg-white hover:bg-gray-light focus:ring-4 focus:outline-none 
                        focus:ring-gray-light rounded-lg border border-gray-light text-sm font-medium px-5 py-2.5 
                        hover:text-gray focus:z-10"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
                {/* content */}
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default DeleteComp;