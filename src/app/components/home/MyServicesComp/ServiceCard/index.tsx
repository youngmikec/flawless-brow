"use client";

// components/ServiceCard.tsx
import { FC } from "react";
import Image from "next/image";
import AppButton from "../../../app/AppButton";
import { IService } from "../../../../../interfaces";
import { useRouter } from "next/navigation";
import { textLimit } from "@/utils";

interface ServiceCardProps {
  service: IService
}

const ServiceCard: FC<ServiceCardProps> =({service}) => {
  const router = useRouter();
  const defaultImg: string = '/images/eye-brow.png';

  
  return (
    <div className="bg-white rounded-xl shadow-sm border flex flex-col min-h-[500px] max-h-[500px]">
      <div className="rounded-xl overflow-hidden min-h-52 max-h-52 w-full relative">
        <Image
          src={service.serviceImage || defaultImg}
          alt={service.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="mt-4 flex-1 flex flex-col p-4">
        <p className="text-lg text-black text-left font-bold">{ service.title }</p>
        <p className="text-sm text-black text-left font-bold mb-4">{ `£${service.price}` }</p>
        <p 
          className="text-sm text-black text-left"
          title={service.description}
        >
          { textLimit(service.description, 220) }
        </p>

        <div className="mt-4">
          <AppButton 
            btnText={'Book Now'}
            fill={'fill'}
            bgColor={'primary'}
            width={"max"}
            onClick={() => router.push(`/booking/${service._id}`)}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;