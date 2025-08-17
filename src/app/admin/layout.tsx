"use client";

import { useState, FC, useEffect } from "react";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import LogoutComp from "./components/LogoutModal";

export interface AdminLayoutProps {
  children: React.ReactNode;
}


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
    // <div className="flex justify-start h-screen bg-[#FAF8F3]">
    //   <div className={sidebarOpen ? 'block' : 'hidden md:block'}>
    //     <Sidebar isOpen={sidebarOpen} toggle={toggleSidebar} />
    //   </div>
    //   <div className="w-full flex flex-col">
    //     <Topbar toggleSidebar={toggleSidebar} />
    //     <main className="p-4">{children}</main>
    //   </div>
    // </div>
    <>
      <div className='content-wrapper flex'>
        <div className='sm:w-5/12 lg:w-1/6 hidden min-h-screen
          sm:hidden
          md:block
          lg:block'
        >
          <Sidebar />
        </div>
        <div className='w-full lg:flex-1'>
          <div className='mx-auto w-full'>
            <TopBar toggleSidebar={toggleSidebar} />
            <div className="p-4">
              { children }
            </div>
          </div>
        </div>
      </div>
      <LogoutComp />
    </>
  );
};

export default AdminLayout;
