"use client";
import Image from "next/image";
import { FC } from "react";
import AppButton from "../../app/AppButton";


const FreeService: FC = () => {
    return (
        <div className="w-full bg-white py-28">
            <div className="mx-auto w-11/12 md:w-9/12">
                <div className="w-full rounded-3xl min-h-[250px] bg-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6">
                        <p className="text-3xl font-inter text-black mb-2 font-[600]">Patch Fix: Try it for free</p>
                        <p className="text-black text-xs font-[600] mb-4">Duration: 15minutes</p>

                        <p className="text-xs text-black mb-8">
                            Service: A quick and essential safety check to ensure you don’t have any sensitivities to the products used in your treatment. 
                            Advisory: Should be done at least 24-48 hours before your appointment.
                        </p>

                        <div className="my-4">
                            <AppButton 
                                btnText={"Book now"}
                                fill={"fill"}
                                bgColor={"primary"}
                                width={"max"}
                                onClick={() => console.log('clicked')}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        <Image 
                            src={"/images/elderly-woman.png"}
                            alt="serive image"
                            fill
                            objectFit="cover"
                            objectPosition="center right"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeService;