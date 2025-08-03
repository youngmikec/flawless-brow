"use client";

// components/ServiceCard.tsx
import { FC } from "react";
import Image from "next/image";
import AppButton from "../../../app/AppButton";

interface ServiceCardProps {
  title: string;
  price: string;
  description: string;
  imageUrl: string;
}

const ServiceCard: FC<ServiceCardProps> =({
  title,
  price,
  description,
  imageUrl,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border flex flex-col h-full">
      <div className="rounded-xl overflow-hidden h-52 w-full relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 300px"
        />
      </div>
      <div className="mt-4 flex-1 flex flex-col p-4">
        <p className="text-lg text-black text-left font-bold">{title}</p>
        <p className="text-sm text-black text-left font-bold">{price}</p>
        <p className="text-sm text-black text-left">{description}</p>

        <div className="mt-4">
          <AppButton 
            btnText={'See more'}
            fill={'fill'}
            bgColor={'primary'}
            width={"max"}
            onClick={() => {}}
            loading={false}
          />
        </div>
      </div>
    </div>
  );
}

export default ServiceCard;