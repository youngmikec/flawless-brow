"use client";
import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { CgLogOff } from 'react-icons/cg';
import { usePathname } from "next/navigation";

import { AdminSidebarItems } from '../../../constants/admin-sidebar';
import AppAvatar from "../../../components/app/AppAvatar";
import { useAppStore } from "../../../../store/app-store";


const Sidebar: FC = () => {
  const { toggleLogoutModal } = useAppStore();
  const pathname = usePathname();
  const openLogoutModal = () => {
    toggleLogoutModal(true);
  }

  // return (
  //   <>
  //     <aside className="relative h-full w-full z-50 bg-[#5a4b3d4d]">
  //       <div
  //         style={{
  //           background: `url('/images/sidebar-pattern.png')`,
  //           backgroundColor: "#5a4b3d",
  //           backgroundSize: "cover",
  //           backgroundPosition: "center",
  //           backgroundRepeat: "no-repeat",
  //           backgroundBlendMode: "color",
  //         }}
  //         className={`h-full w-max text-white transform transition-transform duration-300  lg:translate-x-0 ${
  //           isOpen ? "translate-x-0 z-50" : "-translate-x-0"
  //         }`}
  //       >
  //         <div className="mb-6">
  //           <div className="text-2xl font-bold px-4 py-2 bg-[#5A4B3D] flex justify-center items-center">
              // <Image
              //   src="/images/logo-white.png"
              //   alt="logo"
              //   width={40}
              //   height={40}
              //   className="rounded-full"
              // />
  //           </div>
  //         </div>
  //         <nav className="space-y-6 p-4">
  //           {navItems.map((item, index) => (
  //               <div key={index} onClick={() => toggle(false)}>
  //                 <NavItem  
  //                   icon={item.icon} 
  //                   label={item.label} 
  //                   path={item.path}
  //                 />
  //               </div>
  //           ))}
  //         </nav>
  //         <div className="absolute bottom-6 left-4 p-4">
  //           <AppAvatar 
  //             userProfile={undefined}
  //           />
  //         </div>
  //       </div>
  //     </aside>
  //   </>
  // );

    return (
      <>
          <div 
            className="bg-[#5a4b3d4d] min-h-screen max-h-fit px-4 py-5 relative w-full"
            style={{
              background: `url('/images/sidebar-pattern.png')`,
              backgroundColor: "#5a4b3d",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "color",
            }}
          >
            <div className="my-5 px-4 flex justify-center items-center">
              <Image
                src="/images/logo-white.png"
                alt="logo"
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
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
                  >
                      <Link href={item.path}>
                          <div className='flex justify-start items-center space-x-3'>
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
{/* 
                  <div key={index} onClick={() => toggle(false)}>
                    <NavItem  
                      icon={item.icon} 
                      label={item.label} 
                      path={item.path}
                    />
                  </div> */}
                
            </ul>

            <div className="absolute bottom-6 left-4">
              <AppAvatar 
                userProfile={undefined}
              />
              <ul className="list-none">
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
      </>
    );
};

export default Sidebar;