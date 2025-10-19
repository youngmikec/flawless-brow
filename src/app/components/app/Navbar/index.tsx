"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC } from "react";


const Navbar: FC = () => {
    // const { toggleSideMenu } = useStore();
    const router = useRouter();
    const links: { name: string; href: string }[] = [
        { name: "Home", href: "/" },
        { name: "About", href: "#tech-brow" },
        { name: "Services", href: "#services" },
        { name: "Gallery", href: "#gallery" },
        { name: "Policies", href: "#booking-policies" },
        { name: "Contact", href: "#contact" }
    ];
    const goToLogin = () => router.push('/login');

    return (
        <>
            {/* fixed top-0 z-20 */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 px-10 z-40  w-full bg-white">
                <div className="flex justify-between items-center gap-4">
                    <div className="hidden sm:block lg:block">
                        <ul className="flex justify-between gap-5">
                            {
                                links.map((link) => (
                                    <li key={link.name}>
                                        <Link 
                                            className="text-xs md:text-[14px] font-montserrat text-primary font-semibold active" 
                                            aria-current="page" 
                                            href={link.href}
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>

                    <div className="flex justify-start items-center -ml-10 min-w-[4/12]">
                        <Link className="navbar-brand flex items-center" href="/">
                            <Image 
                                src={'/images/logo.png'}
                                width={50}
                                height={50}
                                alt={'logo'}
                            />
                        </Link>
                    </div>

                    <div>
                        <div className="hidden md:block">
                            <div className="flex justify-start items-center gap-4">
                                <div>
                                    <Link href="mailto:B-Browstudio@outlook.com?subject=Hello%20B.Browstudio" target="_blank">
                                        <Image 
                                            src="/svgs/email-primary.svg"
                                            alt="email"
                                            width={25}
                                            height={25}
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <Link href="https://www.instagram.com/b.browstudio?igsh=MXV1Z2NqcnowOXVudQ%3D%3D&utm_source=qr" target="_blank">
                                        <Image 
                                            src="/svgs/instagram-primary.svg"
                                            alt="instagram"
                                            width={25}
                                            height={25}
                                        />
                                    </Link>
                                </div>
                                <div>
                                    <button 
                                        className="text-white text-center cursor-pointer bg-primary py-2 px-4 rounded-md" 
                                        type="button" 
                                        onClick={goToLogin}
                                    >
                                        Admin Login
                                    </button>
                                </div>
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
                                src={'/svgs/ham-menu.svg'}
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