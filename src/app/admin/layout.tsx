"use client";

import { useState, FC, useEffect } from "react";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import LogoutComp from "./components/LogoutModal";
import AppModalComp from "./components/AppModal";
import AddSchedule from './schedule/add-schedule';
import { useAppStore } from '../../store/app-store';

export interface AdminLayoutProps {
  children: React.ReactNode;
}


const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { toggleAppModal } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);

  const toggleSidebar = (isOpen: boolean | undefined) => {
    if(isOpen !== undefined){
      setSidebarOpen(isOpen);
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  }

  const handleOpenScheduleModal = () => {
    toggleAppModal(true);
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
            <TopBar 
              toggleSidebar={toggleSidebar}
              openScheduleModal={handleOpenScheduleModal}
            />
            <div className="p-4">
              { children }
              <AppModalComp title="">
                <AddSchedule />
              </AppModalComp>
            </div>
          </div>
        </div>
      </div>
      <LogoutComp />
    </>
  );
};

export default AdminLayout;
