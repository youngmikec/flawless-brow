"use client";

import { useEffect } from 'react';
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useParams, useRouter } from 'next/navigation';

import { useBankAccounts } from '../../../../hooks';
import AppButton from "../../../../components/app/AppButton";
import InputField from "../../../../components/form/InputField";
import { CreateBankAccount, UpdateBankAccount } from '../../../../providers';
import IsAuthenticatedPage from "../../../../components/auth/is-auth";
import { _notifyError, _notifySuccess } from '../../../../helpers/alerts';
import SelectField from '../../../../components/form/SelectField';
import { COUNTRIES, CURRENCY_SYMBOLS } from '../../../../constants/currency';

const UpdateBankAccountPage = () => {
  const router = useRouter();
  const params = useParams();
  const bankId: any = params['id'] || '';
  const formMode = bankId !== '' ? 'update' : 'create';

  const countriesOptions = COUNTRIES.map(c => ({ label: c.name, value: c.name}));

  const validateForm = () => Yup.object({
    accountName: Yup.string().optional(),
    accountNumber: Yup.string().optional(),
    bankName: Yup.string().optional(),
    branch: Yup.string().optional(),
    bankCountry: Yup.string().optional(),
    currency: Yup.string().optional(),
  });


  const { data } = useBankAccounts(`?_id=${bankId}&isActive=true`);

  const { 
    values, 
    errors, 
    touched, 
    handleSubmit, 
    handleChange, 
    setSubmitting, 
    isSubmitting, 
    setValues,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
      bankCountry: "",
      currency: "",
      sortCode: "",
      iban: "",
      isActive: true,
    },
    validationSchema: validateForm(),
    onSubmit: async (values) => {
      try {
        setSubmitting(true);
        const payload = {...values}; 
        const response = formMode === 'create' ? 
        await CreateBankAccount(payload) :
        await UpdateBankAccount(bankId, payload);
        const { success, message } = response.data;
        if(success){
          setSubmitting(false);
          _notifySuccess(message);
          router.push('/admin/payments');
        }
      } catch (error: any) {
        setSubmitting(false);
        const { message } = error;
        _notifyError(message);
      }
    }
  });

  const handleInputChange = (value: any, name: string) => {
      const event = {
        target: { name, value }
      };
      handleChange(event);

      if (name === "bankCountry") {
        const selectedCountry = COUNTRIES.find(c => c.name === value);
        if (selectedCountry) {
          setValues(prev => ({
            ...prev,
            bankCountry: selectedCountry.name,
            currency: selectedCountry.currency, // updates the currency field
          }));
        }
      }
  };

  useEffect(() => {
    if(data && data.length > 0){
      setValues({
        accountName: data[0].accountName || "",
        accountNumber: data[0].accountNumber || "",
        bankName: data[0].bankName || "",
        branch: data[0].branch || "",
        bankCountry: data[0].bankCountry || "",
        currency: data[0].currency || "",
        sortCode: data[0].sortCode || "",
        iban: data[0].iban || "",
        isActive: true,
      })
    }
  }, [data, setValues]);

  return (
    <div className="">
        <h1 className="text-lg font-semibold font-inter text-primary">Payment</h1>
        <div 
            className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
        >
            <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>

            <form onSubmit={handleSubmit}>
              <div className="w-full sm:w-10/12 md:w-9/12 lg:w-8/12">
                <div className="my-4">
                  <InputField
                    label="Account name"
                    placeholder="Account Name"
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
                    <SelectField 
                      label='Bank Country'
                      name='bankCountry'
                      value={values.bankCountry}
                      isError={(touched.bankCountry && errors.bankCountry) ? true : false}
                      errMsg={errors && errors.bankCountry}
                      selectOptions={countriesOptions}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="Currency"
                      type="text"
                      placeholder="Select Currency"
                      name="currency"
                      value={CURRENCY_SYMBOLS[values.bankCountry] || values.currency}
                      isError={(touched.currency && errors.currency) ? true : false}
                      errMsg={errors && errors.currency}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="Bank Sort Code"
                      type="text"
                      placeholder="sort code"
                      name="sortCode"
                      value={values.sortCode}
                      isError={(touched.sortCode && errors.sortCode) ? true : false}
                      errMsg={errors && errors.sortCode}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="">
                    <InputField
                      label="IBan"
                      type="text"
                      placeholder="IBan Code"
                      name="iban"
                      value={values.iban}
                      isError={(touched.iban && errors.iban) ? true : false}
                      errMsg={errors && errors.iban}
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

export default IsAuthenticatedPage(UpdateBankAccountPage);