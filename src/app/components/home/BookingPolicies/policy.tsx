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
      <div
        className="bg-black/20 backdrop-blur-sm rounded-lg p-4 text-sm text-white shadow-md transition hover:shadow-lg"
      >
        <div className="absolute -left-2 -top-4">
          <Image
            src="/images/leave.png"
            alt="Policy Icon"
            width={25}
            height={25}
          />
        </div>
        <div className="mb-8 flex justify-between items-center">
          <h3 className="font-bold text-base">{policy.title}</h3>
          <Image
            src={policy.icon || "/svgs/dart.svg"}
            alt="Policy Icon"
            width={25}
            height={25}
          />
        </div>
        <p className="text-sm text-gray-100 mb-4">{policy.description}</p>
        <button className="text-sm font-semibold text-white">Learn more</button>
      </div>
    </>
  )
}

export default Policy;