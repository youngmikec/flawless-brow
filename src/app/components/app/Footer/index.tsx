
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";



const Footer: FC = () => {
    const style = {
        background: "Url(/images/Column.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center top",
        width: "100%",
        minHeight: "300px",
        backgroundBlendMode: 'color',
        backgroundColor: 'rgba(141, 123, 104, 0.4)'
    }
    return (
        <>
            <div 
                className="bg-black-gray text-white py-20 px-12 md:px-20"
                style={style}
            >
                <p className="text-white text-lg font-semibold my-12 text-center">Let's Connect</p>
                <div className="flex justify-center">
                    <p className="text-white text-4xl font-semibold my-12 text-center w-5/12">Find us, follow us, stay connected.</p>
                </div>

                <div className="flex justify-center items-center gap-8 my-10">
                    <div>
                        <Link href="https://www.gmail.com/">
                            <Image 
                                src="/svgs/email-white.svg"
                                alt="email"
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                    <div>
                        <Link href="https://www.instagram.com/">
                            <Image 
                                src="/svgs/instagram-white.svg"
                                alt="instagram"
                                width={50}
                                height={50}
                            />
                        </Link>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <div className="flex justify-start items-center gap-6">
                        <div>
                            <Link href="/">
                                <Image 
                                    src="/images/logo-white.png"
                                    alt="logo"
                                    width={60}
                                    height={60}
                                />
                            </Link>
                        </div>
                        <div className="flex flex-row gap-4">
                            <Link href="/" className="text-white">About</Link>
                            <Link href="/" className="text-white">Services</Link>
                            <Link href="/" className="text-white">Gallery</Link>
                            <Link href="/" className="text-white">Policies</Link>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <p className="text-white text-[13px] font-light">term of service</p>
                        <p className="text-white text-sm font-semibold">© 2023 synthex ai. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;