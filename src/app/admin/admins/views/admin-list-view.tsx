"use client";
import { FC } from "react";
import { User } from "../../../../interfaces";
import AppTable from "../../components/AppTable";

type Props = {
    admins: User[];
    onViewEditRecord: (record: User) => void
}

const AdminsListView: FC<Props> = ({ admins, onViewEditRecord }) => {
    const tableHeaders: string[] = ["Name", "Email", "Phone", "Address", "Action"];
    return (
        <>
            <AppTable
                tableHeaders={tableHeaders}
            >
                {
                    admins.length > 0 ? (
                        admins.map((client: User, index: number) => (
                            <tr key={index} className="border-b-[1px] border-[#0000001F]">
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.fullName ? client.fullName : `${client.firstName} ${client.lastName}`}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.email}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client.phone}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{client?.address}</td>
                                <td className="px-4 py-2 text-xs">
                                    <div 
                                        className="border-[1px] border-[#0000001F] text-[#1E2134] px-4 py-1 w-max font-inter rounded-3xl flex justify-start items-center cursor-pointer"
                                        onClick={() => onViewEditRecord(client)}
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

export default AdminsListView;