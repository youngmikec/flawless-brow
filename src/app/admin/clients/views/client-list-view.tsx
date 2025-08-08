"use client";
import { FC } from "react";
import { User } from "../../../../interfaces";

type Props = {
    clients: User[];
}

const ClientsListView: FC<Props> = ({ clients }) => {
    return (
        <>
            <div className="w-full">
                <table className="w-full border-none border-collapse">
                    <thead>
                        <tr className="border-b-[1px] border-[#0000001F]">
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Name</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Email</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Phone</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Last Appointment</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Upcoming</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            clients.length > 0 ? (
                                clients.map((client: User, index: number) => (
                                    <tr key={index} className="border-b-[1px] border-[#0000001F]">
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.fullName ? client.fullName : `${client.firstName} ${client.lastName}`}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.email}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.phone}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client?.lastAppointment ? client?.lastAppointment.toString() : 'N/A'}</td>
                                        <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">--</td>
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

export default ClientsListView;