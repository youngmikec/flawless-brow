import React from "react";
import Policy from "./policy";
import { Policies } from "@/app/constants";


const BookingPolicies = () => {
  return (
    <section id="booking-policies" className="relative w-full bg-[#eaeaea]">

      {/* Background Image
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/jelly-img.jpg" // update to your actual image path
          alt="Wax Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div> */}

      <div className="w-11/12 md:w-10/12 mx-auto py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Text */}
        <div>
          <h2 className="text-xl font-bold text-[#525252] mb-2 font-montserrat">Booking Policies</h2>
          <h3 className="text-4xl sm:text-5xl font-style-script text-[#a58e75] leading-tight mb-6 w-full md:w-10/12">
            A Few Things to Know
          </h3>
          <p className="text-gray-700 leading-relaxed w-full md:w-7/12 mb-4">
            A quick guide to help you understand how we work while you relax and be served
          </p>
        </div>

        {/* Right: Cards */}
        <div className="space-y-4">
          {Policies.map((policy, i) => (
            <Policy key={i} policy={policy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookingPolicies;
