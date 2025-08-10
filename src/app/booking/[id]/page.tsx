"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import TimePickerComp from "./steps/time-picker-comp";
import AddOnStep from "./steps/add-on-step";
import { useBankAccounts, useProductService } from "../../hooks";
import { BankAccount, IService } from "../../../interfaces";
import ContactForm from "./steps/contact-form";
import PaymentStep from "./steps/payment-step";
import AppButton from "@/app/components/app/AppButton";


const BookingPage: FC = () => {
  const router = useRouter();
  const params = useParams();

  const [step, setStep] = useState<number>(1);
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
      {
        step === 5 && (
          <div className="w-full h-full flex items-center justify-center">
              <div className="flex flex-col gap-8">
                <div className="flex justify-center items center">
                  <Image 
                    src="/images/check-done.png"
                    alt="checked done"
                    width={150}
                    height={150}
                  />
                </div>

                <div className="flex justify-center gap-4">
                  <div className="flex justify-start items-center gap-2">
                    <div>
                      <Image 
                        src="/svgs/calendar.svg"
                        alt="calendar"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <p>18 Set, 2025</p>
                    </div>
                  </div>
                  <div className="flex justify-start items-center gap-2">
                    <div>
                      <Image 
                        src="/svgs/clock.svg"
                        alt="clock"
                        width={20}
                        height={20}
                      />
                    </div>
                    <div>
                      <p>5:30 PM- 5:55 PM</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[#C5A46D] text-2xl font-semibold font-inter mb-4 text-center">Congratulations!</p>                  
                  <p className="text-black font-inter mb-4 text-center">Your appointment has been booked successfully.</p>                  
                </div>

                <div className="flex justify-center items-center">
                  <AppButton 
                    btnText="Back to home"
                    bgColor={'primary'}
                    fill="fill"
                    btnSize="md"
                    width={'max'}
                    type="button"
                    onClick={() => router.push('/')}
                  />
                </div>
              </div>
          </div>
        )
      }

      {
        step !== 5 && (
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
                step === 1 && <TimePickerComp step={step} toggleStep={toggleStep} />


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
        )
      }
    </div>
  );
}

export default BookingPage;