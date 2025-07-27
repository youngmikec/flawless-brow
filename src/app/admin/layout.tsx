"use client";

import Image from "next/image";
import { useState, FC } from "react";
import { FaBars } from "react-icons/fa";
import {
  MdDashboard,
  MdCalendarToday,
  MdPeople,
  MdMiscellaneousServices,
  MdPayment,
  MdSettings,
} from "react-icons/md";

export interface AdminLayoutProps {
  children: React.ReactNode;
}

export interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export interface NabarItemProps {
  icon: JSX.Element;
  label: string;
}

const Sidebar: FC<SidebarProps> = ({ isOpen, toggle }) => {
  const navItems = [
    { icon: <MdDashboard />, label: "Overview" },
    { icon: <MdCalendarToday />, label: "Appointments" },
    { icon: <MdPeople />, label: "Clients" },
    { icon: <MdMiscellaneousServices />, label: "Services" },
    { icon: <MdPayment />, label: "Payments" },
    { icon: <MdSettings />, label: "Settings" },
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
      className={`fixed top-0 left-0 h-full w-64 text-white transform transition-transform duration-300 z-50 lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="mb-6">
        <div className="text-2xl font-bold p-4 bg-[#5A4B3D]">
          <Image
            src="/images/logo-white.png"
            alt="logo"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
      </div>
      <nav className="space-y-4 p-4">
        {navItems.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} />
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

const NavItem: FC<NabarItemProps> = ({ icon, label }) => (
  <div className="flex items-center space-x-3 hover:text-gray-300 cursor-pointer">
    <div className="text-xl">{icon}</div>
    <span>{label}</span>
  </div>
);

const Topbar: FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white border-b shadow-md sticky top-0 z-40">
      <button className="lg:hidden text-2xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <h1 className="text-lg font-semibold">Edit available date</h1>
      <div className="text-xl">
        <span className="material-icons">notifications</span>
      </div>
    </header>
  );
};

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen bg-[#FAF8F3]">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="flex flex-col flex-1 lg:ml-64">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-4 overflow-auto flex-1 bg-[#FAF8F3]">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
