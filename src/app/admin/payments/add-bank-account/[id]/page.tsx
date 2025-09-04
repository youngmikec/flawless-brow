"use client";

import AppButton from "../../../../components/app/AppButton";
import InputField from "../../../../components/form/InputField";
import IsAuthenticatedPage from "../../../../components/auth/is-auth";

// import SelectField from "../../../components/form/SelectField";


const AddBankAccountPage = () => {
  return (
    <div className="">
        <h1 className="text-lg font-semibold font-inter text-primary">Payment</h1>
        <div 
            className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
        >
            <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>

            <div className="w-full sm:w-10/12 md:w-8/12 lg:w-8/12">
              <div className="my-4">
                <InputField
                  label="Cardholder’s name"
                  placeholder="Seen on your card"
                  type="text"
                  name="accountName"
                  value={""}
                  isError={false}
                  onChange={() => {}}
                />
              </div>
              <div className="my-4">
                <InputField
                  label="Account Number"
                  placeholder="Account Number"
                  type="text"
                  name="accountNumber"
                  value={""}
                  isError={false}
                  onChange={() => {}}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="">
                  <InputField
                    label="Bank Name"
                    placeholder=""
                    type="text"
                    name="accountNumber"
                    value={""}
                    isError={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="">
                  <InputField
                    label="Branch Name"
                    placeholder="bank branch name"
                    type="text"
                    name="branchName"
                    value={""}
                    isError={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="">
                  <InputField
                    label="Bank Country"
                    placeholder=""
                    type="text"
                    name="bankCountry"
                    value={""}
                    isError={false}
                    onChange={() => {}}
                  />
                </div>
                <div className="">
                  <InputField
                    label="Currency"
                    name=""
                    value={""}
                    errMsg={""}
                    isError={false}
                    placeholder="Select Currency"
                    type="text"
                    onChange={() => {}}
                  />
                </div>

              </div>
            </div>

            <div className="my-4">
                <AppButton
                    btnText="Save Changes"
                    width="max"
                    bgColor="primary"
                    fill="fill"
                    type="button"
                    onClick={() => console.log("Add Bank Account Clicked")}
                />
            </div>
            
        </div>
    </div>
  );
}

export default IsAuthenticatedPage(AddBankAccountPage);