"use client";

import { useState, FC, useEffect } from "react";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import LogoutComp from "./components/LogoutModal";
import AppScheduleModal from "./components/AppScheduleModal";
import AddSchedule from './schedule/add-schedule';
import { useScheduleStore } from "../../store/schedule-store";

export interface AdminLayoutProps {
  children: React.ReactNode;
}


const AdminLayout: FC<AdminLayoutProps> = ({ children }) => {
  const { toggleScheduleModal } = useScheduleStore();
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
    toggleScheduleModal(true);
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
        <div className='sm:w-5/12 md:w-4/12 lg:w-3/12 hidden min-h-screen
          sm:hidden
          md:block
          lg:block'
        >
          <Sidebar />
        </div>
        <div className='w-full sm:w-7/12 md:w-8/12 lg:w-9/12'>
          <div className='mx-auto w-full'>
            <TopBar 
              openScheduleModal={handleOpenScheduleModal}
            />
            <div className="p-4">
              { children }
              <AppScheduleModal title="Add or delete appointment">
                <AddSchedule />
              </AppScheduleModal>
            </div>
          </div>
        </div>
      </div>
      <LogoutComp />
    </>
  );
};

export default AdminLayout;
