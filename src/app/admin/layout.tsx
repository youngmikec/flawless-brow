"use client";

import { useState, FC } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "./components/SideBar";
import Breadcrumb from "./components/Breadcrumb";

export interface AdminLayoutProps {
  children: React.ReactNode;
}


const Topbar: FC<{ toggleSidebar: () => void }> = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white border-b shadow-md sticky top-0 z-40">
      <button className="lg:hidden text-2xl" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div>
        <Breadcrumb
          navigation={[
            { name: "Overview", href: "/admin" },
            { name: "Liste des utilisateurs", href: "/admin/dashboard" },]}
          currentPage="Dashboard"
        />
      </div>
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
    <div className="flex justify-start h-screen bg-[#FAF8F3]">
      <div>
        <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      </div>
      <div className="flex flex-grow flex-col">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
