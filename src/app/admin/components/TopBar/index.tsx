import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTimes } from 'react-icons/fa';
import { CgLogOff } from 'react-icons/cg';
import { usePathname } from "next/navigation";

import Breadcrumb from "../Breadcrumb";
import { AdminSidebarItems } from "../../../constants/admin-sidebar";
import { useAppStore } from '../../../../store/app-store';

type Props = {
  openScheduleModal: () => any;
}

const Topbar: FC<Props> = ({ openScheduleModal }) => {
  const { showSideBar, toggleLogoutModal, setShowSideBar } = useAppStore()
  const pathname = usePathname();
  const customeStyle = {
    sidebar: {
      zIndex: 60, 
      left: '-1rem', 
      paddingRight: '1rem', 
      height: '100vh',
      background: `url('/images/sidebar-pattern.png')`,
      backgroundColor: "#5a4b3d",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundBlendMode: "color",
    }
  }
  
  const openLogoutModal = () => {
    toggleLogoutModal(true);
    setShowSideBar(false);
  }


  return (
    <header className="flex justify-between items-center px-4 py-2 bg-white border-b shadow-md sticky top-0 z-40">
      <button className="lg:hidden text-2xl" onClick={() => setShowSideBar(true)}>
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
          <div
            className="text-[#B3261E] text-sm font-inter cursor-pointer"
            onClick={openScheduleModal}
          >
            Edit available date
          </div>
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

      {/* mobile sidebar */}
      <div 
        className={`
        absolute left-0 top-0 bottom-0 h-full
        bg-[#5a4b3d] text-left w-8/12 px-8 py-4 z-100
        ${showSideBar ? 'block' : 'hidden'}
        `} style={customeStyle.sidebar}
      >
        <div className=''>
            <div className="container text-right">
                <button className="text-black text-xl" onClick={() => setShowSideBar(false)} >
                  <FaTimes />
                </button>

                <ul className="list-none text-[#8c8c8c]">
                  { 
                    AdminSidebarItems.map((item, index) => (
                      <li
                        key={index}
                        className={`
                          my-6 py-3 px-4 text-center rounded-md
                          hover:bg-[#8c8c8c2a] hover:text-white
                          ${(pathname.includes(item.path) && pathname !== '/') ? 'bg-[#8c8c8c2a] text-white' : ''}
                          `} 
                        title={item.label}
                        onClick={() => setShowSideBar(false)}
                      >
                          <Link href={item.path}>
                              <div className='flex justify-start'>
                                  <div>
                                    <span>
                                      { item.icon }
                                    </span>
                                  </div>
                                  <div className='mx-2'>{ item.label }</div>
                              </div>   
                          </Link>
                      </li>
                    ))
                  }

                  <li 
                    className={`
                      cursor-pointer my-6 py-3 px-4 text-center rounded-md hover:bg-[#8652A4] hover:text-gray-300
                      ` 
                    }
                    title="account"
                    onClick={openLogoutModal}
                  >
                      <div className='flex justify-start'>
                          <div><span><CgLogOff className='text-xl'/></span></div>
                          <div className='mx-2'>Log Out</div>
                      </div>           
                  </li>       
                    
                </ul>
            </div>

        </div>
      </div>
      {/* mobile sidebar */}
    </header>
  );
};

export default Topbar;