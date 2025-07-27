"use client";

// import { useStore } from "@/app/Store";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";


const Navbar: FC = () => {
    // const { toggleSideMenu } = useStore();
    return (
        <>
            {/* fixed top-0 z-20 */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-4 px-10  w-full bg-white">
                <div className="flex justify-between items-center gap-4">
                    <div className="hidden sm:block lg:block">
                        <ul className="flex justify-between gap-5">
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"/"}
                                >
                                    Home
                                </Link>
                            </li>
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"#about"}
                                >
                                    About
                                </Link>
                            </li>
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"#services"}
                                >
                                    Services
                                </Link>
                            </li>
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"#gallery"}
                                >
                                    Gallery
                                </Link>
                            </li>
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"#policies"}
                                >
                                    Polices
                                </Link>
                            </li>
                            <li className="">
                                <Link 
                                    className="text-sm md:text-lg font-montserrat text-primary font-semibold active" 
                                    aria-current="page" 
                                    href={"#contact"}
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="flex justify-start items-center -ml-10 min-w-[4/12]">
                        <Link className="navbar-brand flex items-center" href="/">
                            <Image 
                                src={'/images/logo.png'}
                                width={70}
                                height={70}
                                alt={'logo'}
                            />
                        </Link>
                    </div>

                    <div>
                        <div className="flex justify-start gap-4">
                            <div>
                                <Link href="https://www.gmail.com/">
                                    <Image 
                                        src="/svgs/email-primary.svg"
                                        alt="email"
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                            </div>
                            <div>
                                <Link href="https://www.instagram.com/">
                                    <Image 
                                        src="/svgs/instagram-primary.svg"
                                        alt="instagram"
                                        width={30}
                                        height={30}
                                    />
                                </Link>
                            </div>
                        </div>
                        <button 
                            className="navbar-toggler cursor-pointer block md:hidden" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav"
                            aria-controls="navbarNav" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                            // onClick={toggleSideMenu}
                        >
                            <Image 
                                src={'/images/ham-menu.svg'}
                                width={30}
                                height={30}
                                alt={'menu'}
                            />
                        </button>
                    </div>
                    
                </div>
            </nav>
        </>
    )
};

export default Navbar;