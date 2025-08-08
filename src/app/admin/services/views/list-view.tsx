"use client";
import { FC } from "react";
import { IService } from "../../../../interfaces";

type Props = {
    services: IService[];
}

const ListView: FC<Props> = ({ services }) => {
    return (
        <>
            <div className="w-full">
                <table className="w-full border-none border-collapse">
                    <thead>
                        <tr className="border-b-[1px] border-[#0000001F]">
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Service</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Description</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Duration</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Price</th>
                            <th className="px-4 py-2 text-[#1E2134] text-sm font-medium font-inter">Action</th>
                        </tr>
                    </thead>
                    <tbody>
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
                                                className="border-[1px] border-[#0000001F] text-[#1E2134] font-inter rounded-3xl flex justify-center items-center"  
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
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default ListView;