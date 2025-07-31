"use client";
import { FC } from "react";
import Image from "next/image";
import {
  MdDashboard,
  MdCalendarToday,
  MdPeople,
  MdMiscellaneousServices,
  MdPayment,
  MdSettings,
} from "react-icons/md";
import { TbSettings } from "react-icons/tb";
import { FiFolder } from "react-icons/fi";
import { FiFileText } from "react-icons/fi";
import { GoDeviceDesktop } from "react-icons/go";
import { PiShieldCheckBold } from "react-icons/pi";



import NavItem from "../NavItem";


export interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggle }) => {
  const navItems = [
    { icon: <TbSettings />, label: "Overview", path: "/admin" },
    { icon: <FiFolder />, label: "Appointments", path: "/admin/appointments" },
    { icon: <FiFileText />, label: "Clients", path: "/admin/clients" },
    { icon: <GoDeviceDesktop />, label: "Services", path: "/admin/services" },
    { icon: <PiShieldCheckBold />, label: "Payments", path: "/admin/payments" },
    { icon: <PiShieldCheckBold />, label: "Settings", path: "/admin/settings" },
  ];

  
  
  return (
    <aside
        style={{
          background: `url('/images/sidebar-pattern.png')`,
          backgroundColor: "#5a4b3d",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "color",
        }}
        className={`h-full w-64 text-white transform transition-transform duration-300 z-50 lg:translate-x-0 ${
            isOpen ? "translate-x-0" : "-translate-x-0"
        }`}
    >
      <div className="mb-6">
        <div className="text-2xl font-bold px-4 py-2 bg-[#5A4B3D] flex justify-center items-center">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={40}
            height={40}
            className="rounded-full"
          />
        </div>
      </div>
      <nav className="space-y-6 p-4">
        {navItems.map((item, index) => (
            <NavItem 
                key={index} 
                icon={item.icon} 
                label={item.label} 
                path={item.path}
            />
        ))}
      </nav>
      <div className="absolute bottom-6 left-4 p-4 flex items-center space-x-2">
        <Image
          src="/images/male.png"
          alt="User"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-sm font-medium">John Doe</p>
          <p className="text-xs">abcdef@gmail.com</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;