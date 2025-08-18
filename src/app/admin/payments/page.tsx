"use client";

import Link from "next/link";
import { FC } from "react";
import { useRouter } from "next/navigation";
import AppButton from "../../components/app/AppButton";
import { useBankAccounts } from '../../hooks/bank-account-hooks';
import { BankAccount } from "../../../interfaces";

const BankPropertyItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-inter text-gray font-[500]">{label}</p>
        <p className="text-xs font-inter text-gray">{value}</p>
    </div>
);

const BankDetail: FC<{ bankAccount: BankAccount }> = ({ bankAccount }) => {
    return (
        <div className="mt-8">
            <div className="bg-[#EAEAEA] w-full rounded-lg p-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>
                    <div>
                        <Link 
                            href={`/admin/payments/add-bank-account/${bankAccount._id}`} 
                            className="text-[#B3261E] font-semibold text-sm"
                        >Edit</Link>
                    </div>
                </div>

                <div>
                    <BankPropertyItem label="Bank Country" value={bankAccount.bankCountry} />
                    <BankPropertyItem label="Currency" value={bankAccount.currency} />
                </div>   

            </div>

            <div className="bg-[#EAEAEA] w-full rounded-lg px-4 py-2 mt-4">
                <div className="flex justify-between mb-4">
                    <h1 className="text-sm font-semibold font-inter text-primary">Accounts Details</h1>
                    <div>
                        <Link 
                            href={`/admin/payments/add-bank-account/${bankAccount._id}`} 
                            className="text-[#B3261E] font-semibold text-sm"
                        >Edit</Link>
                    </div>
                </div>

                <div>
                    <BankPropertyItem label="Bank Name" value={bankAccount.bankName} />
                    <BankPropertyItem label="Branch Name" value={bankAccount.branch} />
                    <BankPropertyItem label="Account Holder Name" value={bankAccount.accountName} />
                    <BankPropertyItem label="Account Number" value={bankAccount.accountNumber} />
                </div>                    

            </div>

            <div className="mt-8">
                <div className="bg-[#EAEAEA] w-full rounded-lg p-4">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-sm font-semibold font-inter text-primary">Additional Note</h1>
                    </div>

                    <div>
                        <p className="text-black">Please kindly make an initial deposit of 10% of the price to confirm your booking. The remaining balance would be paid in cash.</p>
                    </div>   
                </div>
            </div>
        </div>
    )
}


const PaymentsPage = () => {
    const router = useRouter();
    const goToAddPage = () => {
        router.push('/admin/payments/add-bank-account');
    }

    const { isLoading, data } = useBankAccounts("?isActive=true");
    
    return (
        <div className="">
            <h1 className="text-lg font-semibold font-inter text-primary">Payment</h1>
            <div 
                className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
            >
                <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>

                {
                    (data && data.length > 0) ? data.map((item: BankAccount, index: number) => (
                        <BankDetail
                            key={index}
                            bankAccount={item}
                        />
                    )) : 
                    <div className="">
                        <p className="text-center text-gray">No bank accounts found</p>
                        <div className="flex justify-center items-center">
                            <div className="my-4">
                                <AppButton
                                    btnText="Add Account"
                                    width="max"
                                    bgColor="primary"
                                    fill="fill"
                                    type="button"
                                    onClick={() => goToAddPage()}
                                />
                            </div>
                        </div>
                    </div>
                }

                {
                    (!isLoading && data && data.length > 0) &&
                    <div className="my-4">
                        <AppButton
                            btnText="Add Account"
                            width="max"
                            bgColor="primary"
                            fill="fill"
                            type="button"
                            onClick={() => goToAddPage()}
                        />
                    </div>
                }
                
                
            </div>
        </div>
    )
}

export default PaymentsPage;