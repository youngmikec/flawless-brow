"use client";

import { useState, FC, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Sidebar from "./components/SideBar";
import Breadcrumb from "./components/Breadcrumb";

export interface AdminLayoutProps {
  children: React.ReactNode;
}


const Topbar: FC<{ toggleSidebar: (isOpen?: boolean) => void }> = ({ toggleSidebar }) => {
  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white border-b shadow-md sticky top-0 z-40">
      <button className="lg:hidden text-2xl" onClick={() => toggleSidebar()}>
        <Image 
          src={'/svgs/ham-menu.svg'}
          width={30}
          height={30}
          alt={'menu'}
        />
      </button>
      <div className="hidden md:block">
        <Breadcrumb
          navigation={[
            { name: "Overview", href: "/admin" },
            { name: "Liste des utilisateurs", href: "/admin/dashboard" },]}
          currentPage="Dashboard"
        />
      </div>
      <div className="flex justify-between items-center gap-20 min-w-[6/12]">
        <div>
          <Link 
            href="/admin/schedule"
            className="text-[#B3261E] text-sm font-inter"
          >
            Edit available date
          </Link>
        </div>
        <div>
            <Image
              src="/svgs/notification-bell.svg"
              alt="logo"
              width={15}
              height={15}
            />
        </div>
      </div>
    </header>
  );
};

const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const toggleSidebar = (isOpen: boolean | undefined) => {
    if(isOpen !== undefined){
      setSidebarOpen(isOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setSidebarOpen(true);
    }
  }, [windowWidth]);



  return (
    <div className="flex justify-start h-screen bg-[#FAF8F3] w-full">
      <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
      <div className="w-full flex flex-col">
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
