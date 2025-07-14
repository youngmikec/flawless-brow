// components/BookingPolicies.tsx
import React from "react";
import Image from "next/image";
import Policy from "./policy";

const policies = [
  {
    title: "Appointment",
    description: "Appointments are released on the 1st and 15th of every month",
    icon: '/svgs/dart.svg',
  },
  {
    title: "Late arrival",
    description:
    "Please allow enough time for your journey. A 10-minute grace period is allowed. After that, a £10 late fee will apply. If you are more than 20 minutes late, your appointment will be cancelled.",
    icon: '/svgs/scroll-paper.svg',
  },
  {
    title: "Deposit",
    description:
    "All services require a £10 non-refundable deposit. The remaining balance must be paid in cash at your appointment.",
    icon: '/svgs/dart.svg',
  },
  {
    title: "Cancellation",
    description:
    "Please note that a minimum of 48 hours’ notice is required to reschedule an appointment. Deposits are non-refundable in the event of cancellation. Your understanding and cooperation are greatly appreciated.",
    icon: '/svgs/star.svg',
  },
];

const BookingPolicies = () => {
  return (
    <section className="relative w-full text-white">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/jelly-img.jpg" // update to your actual image path
          alt="Wax Background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="w-11/12 md:w-10/12 mx-auto py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Text */}
        <div className="text-white max-w-lg">
          <h4 className="text-sm font-semibold uppercase tracking-wide">Booking Policies</h4>
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-2 leading-tight">A Few Things to Know</h2>
          <p className="mt-6 text-gray-200 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur. Urna convallis malesuada et. Semper eget sed amet malesuada.
            Massa nunc leo tincidunt curabitur.
          </p>
        </div>

        {/* Right: Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-12">
          {policies.map((policy, i) => (
            <Policy key={i} policy={policy} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default BookingPolicies;
