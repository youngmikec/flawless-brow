"use client";
import { FC } from "react";
import { IService } from "../../../../interfaces";
import AppTable from "../../components/AppTable";

type Props = {
    services: IService[];
    onViewEditRecord: (record: IService) => void
}

const ListView: FC<Props> = ({ services, onViewEditRecord }) => {
    const tableHeaders: string[] = ['Service', 'Description', 'Duration', 'Price', 'Action'];

    return (
        <>
            <AppTable
                tableHeaders={tableHeaders}
            >
                {
                    services.length > 0 ? (
                        services.map((service) => (
                            <tr key={service.id} className="border-b-[1px] border-[#0000001F]">
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{service.title}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{service.description}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{service.duration}</td>
                                <td className="px-4 py-2 text-[#1E2134] text-xs font-inter">{service.price}</td>
                                <td className="px-4 py-2 text-xs">
                                    <div 
                                        className="border-[1px] px-4 py-1 cursor-pointer border-[#0000001F] text-[#1E2134] font-inter rounded-3xl flex justify-center items-center"  
                                        onClick={() => onViewEditRecord(service)}
                                    >
                                        View/Edit/Delete
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="border-b-[1px] border-[#0000001F]">
                            <td colSpan={5} className="text-center text-sm px-4 py-2">No services found</td>
                        </tr>
                    )
                }
            </AppTable>
        </>
    )
}

export default ListView;