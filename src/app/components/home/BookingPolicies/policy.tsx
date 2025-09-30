import Image from "next/image";
import { FC } from "react";

interface Props {
  policy: {
    title: string;
    description: string;
    icon?: string;
  };
}

const Policy: FC<Props> = ({ policy }) => {
  return (
    <>
      <div className="bg-[#f9f1e7] rounded-lg p-4 text-sm">
        <p className="font-semibold text-[#525252] mb-8 font-inter">{policy?.title}</p>
        <p className="text-[#525252] font-inter">{policy?.description}</p>
      </div>
    </>
  )
}

export default Policy;