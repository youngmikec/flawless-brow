"use client";
import Image from "next/image";
import { FC } from "react";

interface StatCardProps {
    // Define any props needed for the StatCard component
    title: string;
    value: number | string;
    icon: string;
    isLoading?: boolean
}

const StatCard: FC<StatCardProps> = ({ title, value, icon, isLoading = false}) => {
    return (
        <div className="bg-white border-[1px] border-[#E0E0E0] rounded-lg p-4 flex justify-start items-center space-x-4">
            <div className="">
                <Image
                    src={icon}
                    alt={title}
                    width={30}
                    height={30}
                    className="w-8 h-8"
                />
            </div>
            <div>
                <p className="text-xs font-inter text-gray mb-4">{title}</p>
                <p className="text-lg font-inter font-semibold text-primary">{ isLoading ? 'loading' : value }</p>
            </div>
        </div>
    )
}

export default StatCard;