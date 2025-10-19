
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";



const Footer: FC = () => {
    const style = {
        background: "Url(/images/Column.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        width: "100%",
        minHeight: "300px",
        backgroundBlendMode: 'color',
        backgroundColor: 'rgba(0, 0, 0, 0.4)'
    }
    return (
        <>
            <div 
                className="bg-black-gray text-white py-20 px-6 md:px-20"
                style={style}
            >
                <p className="text-white text-lg font-semibold my-12 text-center font-montserrat">Let&lsquo;s Connect</p>
                <div className="flex justify-center">
                    <p className="text-white text-6xl my-12 text-center w-11/12 md:w-5/12 font-style-script">Find us, follow us, stay <br /> connected.</p>
                </div>

                <div className="flex justify-center items-center gap-8 my-10">
                    <div>
                        <Link href="mailto:B-Browstudio@outlook.com?subject=Hello%20B.Browstudio" target="_blank">
                            <Image 
                                src="/svgs/email-white.svg"
                                alt="email"
                                width={60}
                                height={60}
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href="https://www.instagram.com/b.browstudio?igsh=MXV1Z2NqcnowOXVudQ%3D%3D&utm_source=qr" target="_blank">
                            <Image 
                                src="/svgs/instagram-white.svg"
                                alt="instagram"
                                width={60}
                                height={60}
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
                    <div className="flex justify-start items-center gap-6">
                        <div>
                            <Link href="/">
                                <Image 
                                    src="/images/logo-white.png"
                                    alt="logo"
                                    width={50}
                                    height={50}
                                />
                            </Link>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Link href="#tech-brow" className="text-white text-xs md:text-sm">About</Link>
                            <Link href="#services" className="text-white text-xs md:text-sm">Services</Link>
                            <Link href="#gallery" className="text-white text-xs md:text-sm">Gallery</Link>
                            <Link href="#booking-policies" className="text-white text-xs md:text-sm">Policies</Link>
                            <Link href="#faq" className="text-white text-xs md:text-sm">FAQ</Link>

                        </div>
                    </div>

                    <div className="flex gap-4">
                        <p className="text-white text-[11px] md:text-[13px] font-light text-nowrap">term of service</p>
                        <p className="text-white text-xs md:text-sm font-semibold">© 2023 synthex ai. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;