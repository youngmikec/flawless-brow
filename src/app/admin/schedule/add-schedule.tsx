"use client";
import { FC, useState } from 'react';

import Image from 'next/image';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppButton from '../../components/app/AppButton';
import InputField from '../../components/form/InputField';
import { CreateSchedule, UpdateSchedule } from '../../providers';
import { useScheduleStore } from '../../../store/schedule-store';
import DatePickerDialog from '../../components/app/DatePickerDialog';

const ScheduleItem: FC = () => {
  return (
    <div className="w-11/12 md:w-11/12 mx-auto flex justify-start items-center gap-6 my-2">
      <div>
        <Image 
          src="/svgs/date-icon.svg"
          alt="date" 
          width={20}
          height={20}
        />
      </div>
      <div>
        <p className="text-[#5A4B3D] text-sm font-inter">August 20, 2025 09:00AM - 05:00PM</p>
      </div>
      <div>
        <AppButton 
          btnText={"Edit"}
          fill={"outline"}
          width={'max'}
          btnSize="sm"
          bgColor={"black"}
          onClick={() => console.log('edit')}
        />
      </div>
      <div>
        <AppButton 
          btnText={"Delete"}
          fill={"outline"}
          width={'max'}
          btnSize="sm"
          bgColor={"black"}
          onClick={() => console.log('Delete')}
        />
      </div>
    </div>
  )
}

const AddSchedule = () => {
  const { toggleScheduleModal } = useScheduleStore();
  const [formMode, setFormMode] = useState<'create' | 'update'>('create');
  const [selectedRecord, setSelectedRecord] = useState<any>(null);


  const validateForm = () => Yup.object({
    scheduleDate: Yup.string().required('Date is required'),
    startTime: Yup.string().required('Start Time is required'),
    endTime: Yup.string().required('End Time is required'),
  });

  const notify = (type: string, msg: string) => {
    if (type === "success") {
      toast.success(msg, {
      // position: toast.POSITION.TOP_RIGHT
      });
    }

    if (type === "error") {
      toast.error(msg, {
        // position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
    initialValues: {
      scheduleDate: '',
      startTime: '',
      endTime: '',
    },
    enableReinitialize: true,
    validationSchema: validateForm(),
    onSubmit: async (values) => {
      const payload = {
        ...values,
      }
      setSubmitting(true);
      try {
        const response = (formMode === 'update' && selectedRecord) ? await UpdateSchedule(selectedRecord?._id, payload) : await CreateSchedule(payload); 
        if(response) {
          const { success, message, data } = response.data;
          if(success){
            setSubmitting(false);
            notify('success', message);
            toggleScheduleModal(false);
          }
        }
      } catch (err: any) {
        setSubmitting(false);
        const { message } = err;
        notify('error', message);
      }
    }
  });

  const handleInputChange = (value: any, name: string) => {
    const event = {
      target: { name, value }
    };
    handleChange(event);
  };

  return (
    <>
      <div className="px-4">
        <p className="font-inter font-semibold text-sm text-[#5A4B3D] mb-4">Available Dates</p>

        <div className="max-h-[40vh] overflow-y-scroll">
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
          <ScheduleItem />
        </div>

        <form 
          className="mt-5"
          onSubmit={handleSubmit}
        >
          <p className="font-inter font-semibold text-sm text-[#5A4B3D] mb-4">Add a New Date</p>

          <div className="my-2">
            <DatePickerDialog
              name="scheduleDate"
              label="Date"
              isError={(touched.scheduleDate && errors.scheduleDate) ? true : false}
              errMsg={errors && errors.scheduleDate}
              value={values.scheduleDate}
              // onChange={handleInputChange}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
            <div className="my-2">
              <InputField 
                name="startTime"
                label="Start Time"
                type="time"
                value={values.startTime}
                onChange={handleInputChange}
                isError={(touched.startTime && errors.startTime) ? true : false}
                errMsg={errors && errors.startTime}
              />
            </div>
            <div className="my-2">
              <InputField 
                name="endTime"
                label="End Time"
                type="time"
                value={values.endTime}
                onChange={handleInputChange}
                isError={(touched.endTime && errors.endTime) ? true : false}
                errMsg={errors && errors.endTime}
              />
            </div>

          </div>

          <div className="flex justify-end gap-4 mb-4 border-t-[1px] border-gray-light mt-8 pt-4">
            <AppButton 
              btnText="Back"
              btnSize="md"
              bgColor={"black"}
              fill={"outline"}
              width={"max"}
              onClick={() => toggleScheduleModal(false)}
            />
            <AppButton 
              type={"submit"}
              btnText="Save"
              btnSize="md"
              bgColor={"primary"}
              fill="fill"
              width={"max"}
              loading={isSubmitting}
            />
          </div>      
        </form>

      </div>

      <ToastContainer />
    </>
  )
}

export default AddSchedule;