"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";


export interface NabarItemProps {
  icon: JSX.Element;
  label: string;
  path: string;
}

const NavItem: FC<NabarItemProps> = ({ icon, label, path }) => {
    const router = useRouter();
    const navigateToPath = () => {
        router.push(path);
    };
    
    return (
        <div className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer" onClick={navigateToPath}>
            <div className="text-xl">{icon}</div>
            <span>{label}</span>
        </div>
    )
}

export default NavItem;