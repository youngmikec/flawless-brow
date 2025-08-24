"use client";
import Image from "next/image";
import { FC } from "react";
import { useRouter } from "next/navigation";
import AppButton from "../../app/AppButton";
import { IService } from "../../../../interfaces";

type Props = {
    service: IService | null;
}

const FreeService: FC<Props> = ({ service }) => {
    const router = useRouter();

    const goToBookNow = () => {
        router.push(`/booking/${service?._id}`);
    }

    return (
        <div 
            className="w-full h-[500px] bg-[#c5a56d82] relative"
            style={{
                backgroundImage: `url('/images/yellow-eye-brow.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'color'
            }}
        >
            <div className="mx-auto w-11/12 md:w-9/12 z-20 -mb-28 absolute -bottom-5 left-0 right-0">
                <div className="w-full rounded-3xl min-h-[350px] bg-[#E2E8F0] grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Image 
                            src={service?.serviceImage || '/images/yellow-eye-brow.jpg'}
                            alt="service image"
                            fill
                            objectFit="cover"
                            objectPosition="center right"
                            className="rounded-l-3xl"
                        />
                    </div>
                    <div className="px-6 py-12">
                        <p className="text-2xl font-montserrat text-black mb-4 font-bold">Free Service</p>
                        <p className="text-4xl sm:text-5xl text-[#8D7B68] mb-4 font-style-script">
                            {service?.title || '--'}
                        </p>
                        <p className="text-black text-sm font-[600] font-inter mb-4">
                            Duration: {service?.duration || '--'}
                        </p>

                        <p className="text-xs text-[#52525B] mb-8">
                            Service: {service?.description || '--'}
                        </p>

                        <div className="my-4">
                            <AppButton 
                                btnText={"Book now"}
                                fill={"fill"}
                                bgColor={"primary"}
                                width={"max"}
                                onClick={goToBookNow}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FreeService;