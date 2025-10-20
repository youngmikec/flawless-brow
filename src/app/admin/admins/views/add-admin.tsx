"use client"
import { FC } from "react";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { User } from "../../../../interfaces";
import { CreateAdmin, UpdateAdmin } from "../../../providers";
import InputField from "../../../components/form/InputField";
import AppButton from "../../../components/app/AppButton";
import { useAppStore } from "../../../../store/app-store";
import Image from "next/image";
import SelectField from "@/app/components/form/SelectField";


type Props = {
  formMode: 'create' | 'update';
  selectedRecord: User | null;
  onSuccess?: () => any;
}


const AddAdmin: FC<Props> = ({ formMode, selectedRecord, onSuccess }) => {
  const { toggleAppModal, toggleDeleteModal } = useAppStore();

  const validateForm = () => Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('First Name is required'),
    email: Yup.string().required('First Name is required'),
    age: Yup.number().required('Age is required'),
    phone: Yup.string().required('Phone number is required'),
    // address: Yup.string().required('Address is required'),
    gender: Yup.string().required('Gender is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
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
      firstName: selectedRecord ? selectedRecord.firstName : '',
      lastName: selectedRecord ? selectedRecord.lastName : '',
      email: selectedRecord ? selectedRecord.email : '',
      age: selectedRecord ? selectedRecord.age : '',
      role: 'admin',
      phone: selectedRecord ? selectedRecord.phone : '',
      // address: selectedRecord ? selectedRecord.address : '',
      gender: selectedRecord ? selectedRecord.gender : '',
      password: '',
      confirmPassword: '',
    },
    enableReinitialize: true,
    validationSchema: formMode === 'create' && validateForm(),
    onSubmit: async (values) => {
      const { confirmPassword, ...payload } = values;
      setSubmitting(true);
      try {
        const response = (formMode === 'update' && selectedRecord) ? await UpdateAdmin(selectedRecord?._id, payload) : await CreateAdmin(payload); 
        if(response) {
          const { success, message, data } = response.data;
          if(success){
            onSuccess && onSuccess();
            setSubmitting(false);
            notify('success', message);
            toggleAppModal(false);
          }
        }
      } catch (err: any) {
        setSubmitting(false);
        const { message } = err?.response?.data;
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

  const handleDeleteService = () => {
    toggleDeleteModal(true);
  }


  return (
    <>
      <div className="px-4 my-4">
        {
          (formMode === 'update' && selectedRecord) && (
            <div className="flex justify-end mb-4">
              <div 
                className="flex justify-start gap-2 items-center cursor-pointer"
                onClick={handleDeleteService}
              >
                <Image 
                  src="/svgs/delete-icon.svg"
                  alt="delete icon"
                  width={15}
                  height={15}
                />
                <p className="text-[#B3261E] font-inter font-[500] text-sm">Delete Service</p>
              </div>
            </div>
          )
        }

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField 
                type={'text'}
                name='firstName'
                label='First Name *'
                value={values.firstName}
                isError={(touched.firstName && errors.firstName) ? true : false}
                errMsg={errors && errors.firstName}
                placeholder='Inter your Name.....'
                onChange={handleInputChange}
            />
            <InputField 
                type={'text'}
                name='lastName'
                label='Last Name *'
                value={values.lastName}
                isError={(touched.lastName && errors.lastName) ? true : false}
                errMsg={errors && errors.lastName}
                placeholder='Inter your Name.....'
                onChange={handleInputChange}
            />

            <InputField 
                type={'email'}
                name='email'
                label='Email *'
                value={values.email}
                isError={(touched.email && errors.email) ? true : false}
                errMsg={errors && errors.email}
                placeholder='Enter your email'
                onChange={handleInputChange}
            />
            <InputField 
                type={'text'}
                name='phone'
                label='Phone Number *'
                value={values.phone}
                isError={(touched.phone && errors.phone) ? true : false}
                errMsg={errors && errors.phone}
                placeholder='+234 000000000'
                onChange={handleInputChange}
            />
            <InputField 
                type={'number'}
                name='age'
                label='Age *'
                value={values.age}
                isError={(touched.age && errors.age) ? true : false}
                errMsg={errors && errors.age}
                placeholder=''
                onChange={handleInputChange}
            />
            <SelectField 
                name='gender'
                label='Gender *'
                value={values.gender}
                isError={(touched.gender && errors.gender) ? true : false}
                errMsg={errors && errors.gender}
                selectOptions={[
                    { value: 'male', label: 'Male' },
                    { value: 'female', label: 'Female' },
                    { value: 'other', label: 'Other' },
                ]}
                onChange={handleInputChange}
            />
            <InputField 
                type={'password'}
                name='password'
                label='Password *'
                value={values.password}
                isError={(touched.password && errors.password) ? true : false}
                errMsg={errors && errors.password}
                placeholder='Enter your password'
                onChange={handleInputChange}
            />

            <InputField 
                type={'password'}
                name='confirmPassword'
                label='Confirm Password *'
                value={values.confirmPassword}
                isError={(touched.confirmPassword && errors.confirmPassword) ? true : false}
                errMsg={errors && errors.confirmPassword}
                placeholder='Confirm your password'
                onChange={handleInputChange}
            />
          </div>


          <div className="flex justify-end gap-4 mb-4 border-t-[1px] border-gray-light mt-8 pt-4">
                <AppButton 
                    btnText="Back"
                    btnSize="md"
                    bgColor={"black"}
                    fill={"outline"}
                    width={"max"}
                    onClick={() => toggleAppModal(false)}
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

export default AddAdmin;