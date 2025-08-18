"use client";

import * as Yup from 'yup'
import { useFormik } from "formik";
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';

import AppButton from "../../../components/app/AppButton";
import InputField from "../../../components/form/InputField";
import { CreateBankAccount } from '../../../providers';
import { ApiResponse } from '../../../../interfaces';
import { useUser } from '../../../../store/user';
import { getItem } from '../../../helpers';

// import SelectField from "../../../components/form/SelectField";


const AddBankAccountPage = () => {
  const userStore = useUser();
  const router = useRouter();
  const validateForm = () => Yup.object({
    accountName: Yup.string().required('Account name is required'),
    accountNumber: Yup.string().required('Account number is required'),
    bankName: Yup.string().required('Bank name is required'),
    branch: Yup.string().required('Branch is required'),
    bankCountry: Yup.string().required('Bank country is required'),
    currency: Yup.string().required('Currency is required'),
    user: Yup.string().optional(),
    });

    const { values, errors, touched, handleSubmit, handleChange, setSubmitting, isSubmitting, } = useFormik({
      initialValues: {
        accountName: "",
        accountNumber: "",
        bankName: "",
        branch: "",
        bankCountry: "",
        currency: "",
        user: "",
        isActive: true,
      },
      validationSchema: validateForm(),
      onSubmit: (values) => {
        setSubmitting(true);
        const payload = {...values};
        (userStore.loggedInUser) ? 
        payload.user = userStore.loggedInUser?._id :
        payload.user = getItem('clientD')?.id;
        
        CreateBankAccount(payload)
        .then((res: AxiosResponse<ApiResponse>) => {
            const { success } = res.data;
            if(success){
                setSubmitting(false);
                router.push('/admin/payments');
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
    <div className="">
        <h1 className="text-lg font-semibold font-inter text-primary">Payment</h1>
        <div 
            className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
        >
            <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>

            <form onSubmit={handleSubmit}>
              <div className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12">
                <div className="my-4">
                  <InputField
                    label="Cardholder’s name"
                    placeholder="Seen on your card"
                    type="text"
                    name="accountName"
                    value={values.accountName}
                    isError={(touched.accountName && errors.accountName) ? true : false}
                    errMsg={errors && errors.accountName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="my-4">
                  <InputField
                    label="Account Number"
                    placeholder="Account Number"
                    type="text"
                    name="accountNumber"
                    value={values.accountNumber}
                    isError={(touched.accountNumber && errors.accountNumber) ? true : false}
                    errMsg={errors && errors.accountNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="">
                    <InputField
                      label="Bank Name"
                      placeholder=""
                      type="text"
                      name="bankName"
                      value={values.bankName}
                      isError={(touched.bankName && errors.bankName) ? true : false}
                      errMsg={errors && errors.bankName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="Branch Name"
                      placeholder="bank branch name"
                      type="text"
                      name="branch"
                      value={values.branch}
                      isError={(touched.branch && errors.branch) ? true : false}
                      errMsg={errors && errors.branch}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="Bank Country"
                      placeholder=""
                      type="text"
                      name="bankCountry"
                      value={values.bankCountry}
                      isError={(touched.bankCountry && errors.bankCountry) ? true : false}
                      errMsg={errors && errors.bankCountry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="Currency"
                      type="text"
                      placeholder="Select Currency"
                      name="currency"
                      value={values.currency}
                      isError={(touched.currency && errors.currency) ? true : false}
                      errMsg={errors && errors.currency}
                      onChange={handleInputChange}
                    />
                  </div>

                </div>
              </div>

              <div className="my-4">
                  <AppButton
                    type="submit"
                    btnText="Save Changes"
                    width="max"
                    bgColor="primary"
                    fill="fill"
                    loading={isSubmitting}
                  />
              </div>
            </form>
            
        </div>
    </div>
  );
}

export default AddBankAccountPage;