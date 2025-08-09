"use client"

import { FC, useState } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosResponse } from "axios";

import ImageUploadComp from "../../../components/app/ImageUploadComp";
import InputField from "../../../components/form/InputField";
import AppButton from "../../../components/app/AppButton";
import { CreateUser } from "../../../providers";
import { ApiResponse } from "../../../../interfaces";


interface Props {
  toggleStep: (step: "prev" | "next") => void;
}

const PaymentStep: FC<Props> = ({ toggleStep }) => {

  const [paymentProof, setPaymentProof] = useState<string>('');

  const validateForm = () => Yup.object({
    amountPaid: Yup.number().required('Amount Paid is required'),
  });

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
      initialValues: {
        amountPaid: 0 
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
    <div className="w-full flex items-center justify-start gap-8 mb-6">
      <div>
        <p className="font-inter text-2xl font-semibold text-[#C5A46D mb-4">Kindly Upload your evidence of payment</p>

        <div className="my-4">
          <form className="w-full mb-4" onSubmit={handleSubmit}>
            <div className="my-4">
              <InputField 
                name="amountPaid"
                label="Amount Paid"
                type="number"
                value={values.amountPaid}
                isError={(touched.amountPaid && errors.amountPaid) ? true : false}
                errMsg={errors && errors.amountPaid}
                onChange={handleInputChange}
              />
            </div>
            <ImageUploadComp 
              onImageUploadComplete={setPaymentProof}
            />

            <div className="my-4 flex gap-4 items-center">
              <AppButton
                btnText={'Back'}
                fill={'outline'}
                bgColor={"black"}
                width={"max"}
                onClick={() => toggleStep('prev')}
              />
              <AppButton
                btnText={'Book Now'}
                fill={'fill'}
                bgColor={'primary'}
                width={"max"}
                loading={isSubmitting}
                onClick={() => toggleStep('next')}

              />
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default PaymentStep;