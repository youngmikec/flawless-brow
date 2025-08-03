"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import AppButton from "../../components/app/AppButton";

const BankPropertyItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center mb-3">
        <p className="text-xs font-inter text-gray font-[500]">{label}</p>
        <p className="text-xs font-inter text-gray">{value}</p>
    </div>
);


const PaymentsPage = () => {
    const router = useRouter();
    const goToAddPage = () => {
        router.push('/admin/payments/add-bank-account');
    }
    
    return (
        <div className="">
            <h1 className="text-lg font-semibold font-inter text-primary">Payment</h1>
            <div 
                className="mt-12 bg-white rounded-lg px-4 py-2 w-full"
            >
                <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>

                <div className="bg-[#EAEAEA] w-full rounded-lg p-4 mt-8">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-sm font-semibold font-inter text-primary">Bank Details</h1>
                        <div>
                            <Link href={"/admin/payments/"} className="text-[#B3261E] font-semibold text-sm">Edit</Link>
                        </div>
                    </div>

                    <div>
                        <BankPropertyItem label="Bank Country" value="England" />
                        <BankPropertyItem label="Currency" value="Pounds" />
                    </div>   

                </div>

                <div className="bg-[#EAEAEA] w-full rounded-lg px-4 py-2 mt-4">
                    <div className="flex justify-between mb-4">
                        <h1 className="text-sm font-semibold font-inter text-primary">Accounts Details</h1>
                        <div>
                            <Link href={"/admin/payments/"} className="text-[#B3261E] font-semibold text-sm">Edit</Link>
                        </div>
                    </div>

                    <div>
                        <BankPropertyItem label="Bank Name" value="Savings" />
                        <BankPropertyItem label="Branch Name" value="Savings" />
                        <BankPropertyItem label="Account Holder Name" value="John Doe" />
                        <BankPropertyItem label="Account Number" value="12345678" />
                    </div>                    

                </div>

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
    )
}

export default PaymentsPage;