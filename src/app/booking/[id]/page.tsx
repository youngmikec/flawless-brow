"use client";

import { FC, useEffect, useState } from "react";
import TimePickerComp from "./steps/time-picker-comp";
import AppButton from "../../components/app/AppButton";
import AddOnStep from "./steps/add-on-step";
import { useBankAccounts, useProductService } from "../../hooks";
import { useParams } from "next/navigation";
import { BankAccount, IService } from "@/interfaces";
import ContactForm from "./steps/contact-form";
import PaymentStep from "./steps/payment-step";


const BookingPage: FC = () => {
  const params = useParams();

  const [step, setStep] = useState<number>(4);
  const [productService, setProductService] = useState<IService | null>(null);
  const [bankAccount, setBankAccount] = useState<BankAccount | null>(null);



  const [addOnServices, setAddOnServices] = useState<any[]>([]);

  const serviceId: string = params.id as string;


   const { data } = useProductService(`?_id=${serviceId}`, true);
   const { data: accountsResponse } = useBankAccounts('', true);




  const toggleStep = (type: 'prev' | 'next') => {
    setStep(prev => {
      if (type === 'prev') {
        if (prev === 0) {
          return 0;
        } else {
          return prev - 1;
        }

      }
      if (prev === 5) {
        return 5;
      }else {
        return prev + 1;  
      }

    });

  }

  useEffect(() => {
    if (data) {
      const service: IService = data[0];
      setProductService(service);
      setAddOnServices(service.addOnServices);
    }
  }, [data]);

  useEffect(() => {
    if (accountsResponse) {
      setBankAccount(accountsResponse[0]);
    }

  }, [accountsResponse])

  return (
    <div className="w-full min-h-[100vh] max-h-full bg-[#FAF8F3] pt-20">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto w-11/12 md:w-9/12">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold font-montserrat mb-8">Services</h1>

          <div>
            <p className="text-3xl font-bold font-style-script text-[#5A4A3F] mb-4">{productService?.title || "--"}</p>


            <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Duration: {productService?.duration || "--"}</p>


            <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Price: {productService?.price || "--"}</p>
            <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Working hours: Monday-Saturday </p>

            <p className="font-inter text-sm font-normal text-[#1A1A1A] my-4">
              {productService?.description || "--"}
            </p>

          </div>

          {
            (bankAccount && step === 4) && (
              <div className="my-5">
                <p className="font-inter text-sm font-normal text-[#1A1A1A] mb-4">Please kindly make an initial deposit of 10% of the price to confirm your booking. The remaining balance would be paid in cash.</p>
                <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Bank name: {bankAccount?.bankName || "--"}</p>
                <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Account name: {bankAccount?.accountName || "--"}</p>
                <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Account Number: {bankAccount?.accountNumber || "--"}</p>
                <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> Sort Code: {bankAccount?.sortCode || "--"}</p>
                <p className="font-inter text-sm font-semibold text-[#1A1A1A]"> IBAN: {bankAccount?.iban || "--"}</p>
              </div>
            )
          }

        </div>
        <div>
          {
            step === 1 && <TimePickerComp toggleStep={toggleStep} />

          }
          {
            step === 2 && 
            <AddOnStep 
              addOnServices={addOnServices} 
              toggleStep={toggleStep}
            />

          }
          {
            step === 3 && <ContactForm toggleStep={toggleStep} />
          }
          {
            step === 4 && <PaymentStep toggleStep={toggleStep} />

          }

        </div>
      </div> 
    </div>
  );
}

export default BookingPage;