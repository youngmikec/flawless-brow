"use client";
import { FC, useEffect, useState } from 'react';

import Image from 'next/image';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AppButton from '../../components/app/AppButton';
import InputField from '../../components/form/InputField';
import { CreateSchedule, DeleteSchedule, UpdateSchedule } from '../../providers';
import { useScheduleStore } from '../../../store/schedule-store';
import { useAppStore } from "../../../store/app-store";
import DatePickerDialog from '../../components/app/DatePickerDialog';
import { useSchedules } from '../../hooks/schedule-hooks';
import { ISchedule } from '../../../interfaces';
import DeleteComp from '../components/DeleteComp';
import ScheduleItem from './schedule-item';

const AddSchedule = () => {
  const { toggleScheduleModal } = useScheduleStore();
  const { toggleDeleteModal } = useAppStore();
  const [schedules, setSchedules] = useState<ISchedule[]>([]);
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
      scheduleDate: selectedRecord ? selectedRecord.scheduleDate : '',
      startTime: selectedRecord ? selectedRecord.startTime : '',
      endTime: selectedRecord ? selectedRecord.endTime : '',
    },
    enableReinitialize: true,
    validationSchema: validateForm(),
    onSubmit: async (values) => {
      const payload = {
        ...values,
      }
      console.log('payload', payload);
      setSubmitting(true);
      try {
        const response = (formMode === 'update' && selectedRecord) ? await UpdateSchedule(selectedRecord?._id, payload) : await CreateSchedule(payload); 
        if(response) {
          const { success, message, data } = response.data;
          if(success){
            setSubmitting(false);
            notify('success', message);
            refetch && refetch("");
            setFormMode('create');
            setSelectedRecord(null);
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

  const { data, refetch } = useSchedules();

  const onAction = (schedule: ISchedule, action: 'update' | 'delete') => {
    if(action === 'update') {
      setFormMode('update');
      setSelectedRecord(schedule);
    }
    if(action === 'delete') {
      setSelectedRecord(schedule);
      toggleDeleteModal(true);
    }
  } 

  const onDeleteSuccess = () => {
    setSelectedRecord(null);
    toggleDeleteModal(false);
    refetch && refetch("");
  }

  useEffect(() => {
    setSchedules(data || []);
  }, [data]);

  return (
    <>
      <div className="px-4">
        <p className="font-inter font-semibold text-sm text-[#5A4B3D] mb-4">Available Dates</p>

        <div className="max-h-[40vh] overflow-y-scroll">
          {
            schedules.length > 0 ? (
              schedules.map((schedule) => (
                <ScheduleItem
                  key={schedule._id} 
                  schedule={schedule}
                  onAction={onAction}
                />
              ))
            ) : (
              <p className="text-center text-sm text-[#5A4B3D]">No schedules available</p>
            )
          }
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
              onDateSelect={(date) => handleInputChange(date, 'scheduleDate')}
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
              btnSize="sm"
              bgColor={"black"}
              fill={"outline"}
              width={"max"}
              onClick={() => toggleScheduleModal(false)}
            />
            <AppButton 
              type={"submit"}
              btnText={formMode === 'create' ? 'Save' : 'Update'}
              btnSize="sm"
              bgColor={"primary"}
              fill="fill"
              width={"max"}
              loading={isSubmitting}
            />
          </div>      
        </form>

      </div>

      <ToastContainer />
      <DeleteComp
        id={selectedRecord?._id} 
        action={DeleteSchedule}
        onDeleteSuccess={onDeleteSuccess}
      />
    </>
  )
}

export default AddSchedule;