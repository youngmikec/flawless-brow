"use client";
import { FC } from "react";
import { Appointment } from "../../../../interfaces";

type Props = {
    appointments: Appointment[];
}

const AppointmentListView: FC<Props> = ({ appointments }) => {
    return (
        <>
            <div className="w-full overflow-x-scroll">
                <table className="w-full border-none border-collapse">
                    <thead>
                        <tr className="border-b-[1px] border-[#0000001F]">
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Date/Time</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Customer Name</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Service</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Amount Paid</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Balance</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Status</th>
                            <th className="px-4 py-2 text-[#1E2134] text-xs md:text-sm text-left font-medium font-inter text-nowrap">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            appointments.length > 0 ? (
                                appointments.map((appointment: Appointment, index: number) => (
                                    <tr key={index} className="border-b-[1px] border-[#0000001F]">
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.createdAt?.toString()}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.customer?.fullName ? appointment?.customer?.fullName : `${appointment?.customer?.firstName} ${appointment?.customer?.lastName}`}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.productService?.title}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.currencySymbol || 'EUR'}{appointment?.amountPaid}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.currencySymbol || 'EUR'}{appointment?.balance ? appointment?.balance : 0}</td> 
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{appointment?.statusDesc}</td>
                                        <td className="px-4 py-2 text-xs">
                                            <div 
                                                className="border-[1px] border-[#0000001F] text-[#1E2134] px-4 py-1 font-inter rounded-3xl flex justify-center items-center"
                                            >
                                                View/Edit
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr className="border-b-[1px] border-[#0000001F]">
                                    <td colSpan={5} className="text-center text-sm px-4 py-2">No clients found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AppointmentListView;