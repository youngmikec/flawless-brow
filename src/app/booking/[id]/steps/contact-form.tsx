"use client"

import { FC } from 'react';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { AxiosResponse } from 'axios';
import { ApiResponse } from '../../../../interfaces';


import { CreateUser } from "../../../providers";
import ContactInputField from "../../../components/form/ContactInputField";
import AppButton from '../../../components/app/AppButton';


type Props = {
  toggleStep: (type: 'prev' | 'next') => void
}

const ContactForm: FC<Props> = ({ toggleStep }) => {

    const validateForm = () => Yup.object({
      fullName: Yup.string().required('Name is required'),
      phone: Yup.string().required('Phone is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      address: Yup.string().required('Address is required'),
      gender: Yup.string().required('Gender is required'),
      age: Yup.number().required('Age is required'),
    });

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
      initialValues: {
        fullName: '', 
        email: '',
        role: 'user',
        phone: '',
        address: '',
        gender: '',
        age: 0 
      },
      validationSchema: validateForm(),
      onSubmit: (values) => {
          const payload = {...values}
          setSubmitting(true);
          CreateUser(payload)
          .then((res: AxiosResponse<ApiResponse>) => {
              const { success, message, data } = res.data;
              if(success){
                setSubmitting(false);
                toggleStep('next');
              }
          })
          .catch((err: any) => {
              setSubmitting(false);
              // const { message } = err.response.data;
              // notify err
              // notify('error', message);
          })
      }
    });

    const handleInputChange = (value: any, name: string) => {
        const event = {
          target: { name, value }
        };
        handleChange(event);
    };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>

        <ContactInputField 
          type={'text'}
          name='fullName'
          label='Name *'
          value={values.fullName}
          isError={(touched.fullName && errors.fullName) ? true : false}
          errMsg={errors && errors.fullName}
          placeholder='Inter your Name.....'
          onChange={handleInputChange}
        />
        <ContactInputField 
          type={'email'}
          name='email'
          label='E-Mail-Address *'
          value={values.email}
          isError={(touched.email && errors.email) ? true : false}
          errMsg={errors && errors.email}
          placeholder='Enter your email'
          onChange={handleInputChange}
        />
        <ContactInputField 
          type={'text'}
          name='phone'
          label='Phone Number *'
          value={values.phone}
          isError={(touched.phone && errors.phone) ? true : false}
          errMsg={errors && errors.phone}
          placeholder='+234 000000000'
          onChange={handleInputChange}
        />
        <ContactInputField 
          type={'number'}
          name='age'
          label='Age *'
          value={values.age}
          isError={(touched.age && errors.age) ? true : false}
          errMsg={errors && errors.age}
          placeholder=''
          onChange={handleInputChange}
        />
        <ContactInputField 
          type={'text'}
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
          onSelectValue={handleInputChange}
        />
        <ContactInputField 
          type={'text'}
          name='address'
          label='Address *'
          value={values.address}
          isError={(touched.address && errors.address) ? true : false}
          errMsg={errors && errors.address}
          placeholder='Enter your email'
          onChange={handleInputChange}
        />

        <div className="my-4 flex gap-4 items-center">
          <AppButton
            btnText={'Back'}
            fill={'outline'}
            bgColor={"black"}
            width={"max"}
            type='button'
            onClick={() => toggleStep('prev')}
          />
          <AppButton
            btnText={'Book Now'}
            fill={'fill'}
            bgColor={'primary'}
            width={"max"}
            type={'submit'}
          />
        </div>
      </form>
    </div>
  )
}

export default ContactForm;

