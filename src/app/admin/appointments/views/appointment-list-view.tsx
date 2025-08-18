"use client";
import { FC } from "react";
import { Appointment } from "../../../../interfaces";
import AppTable from "../../components/AppTable";

type Props = {
    appointments: Appointment[];
}

const AppointmentListView: FC<Props> = ({ appointments }) => {
    const tableHeaders: string[] = ["Date/Time", "Customer Name", "Service", "Amount Paid", "Balance", "Status", "Action"];
    return (
        <>
            <AppTable
                tableHeaders={tableHeaders}
            >
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
            </AppTable>
        </>
    )
}

export default AppointmentListView;