"use client";

import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ServiceCard from "./ServiceCard";
import { useProductService } from "../../../hooks";
import { IService } from "../../../../interfaces";

const services = [
  {
    title: "Henna Brows",
    price: "£35",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/eye-brow-carve.png",
  },
  {
    title: "Wax, brow lamination and tint",
    price: "£45",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/eye-brow.png",
  },
  {
    title: "Wax and brow lamination",
    price: "£40",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
  {
    title: "Wax",
    price: "£12",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Hand-in-jaw.png",
  },
  {
    title: "Wax and tint",
    price: "£25",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
  {
    title: "Wax",
    price: "£12",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Hand-in-jaw.png",
  },
  {
    title: "Wax and tint",
    price: "£25",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
];

const MyServicesComp = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [productServices, setProductServices] = useState<IService[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);


  useEffect(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data } = useProductService('', true);


  useEffect(() => {
      setProductServices(data || []);
  }, [data]);

  return (
    <section id="services" className="w-full px-4 py-12 text-center bg-white">
      <div className="w-full mx-auto md:w-11/12">
        <p className="text-lg sm:text-xl font-bold mb-2 text-black text-center font-montserrat">My services</p>
        <p className="text-4xl sm:text-5xl text-[#8D7B68] mb-4 font-style-script">
          Luxury beauty services crafted just for you.
        </p>
        <p className="text-[#52525B] max-w-3xl mx-auto mb-10 font-inter">
          At B-Brows, we specialize in enhancing your natural beauty with expertly crafted brow treatments, precision permanent makeup, and luxurious lash services. Each session is tailored to you, ensuring flawless, long-lasting results in a calm, welcoming space.
        </p>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-nowrap overflow-x-auto gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} price={service.price} description={service.description} imageUrl={service.imageUrl} />
          ))}
        </div> */}

        <div className="mt-10">
          {
            productServices.length > 0 && (
              <Swiper
                // modules={[Pagination, Navigation]}
                modules={[Pagination]}
                spaceBetween={30}
                slidesPerView={ windowWidth > 1024 ? 3 : windowWidth < 768 ? 1 : 2.3}
                centeredSlides
                loop={true}
                pagination={{ clickable: true }}
                className="mt-10"
                // breakpoints={{
                //   768: {
                //     slidesPerView: 2.3,
                //   },
                //   1024: {
                //     slidesPerView: 3,
                //   },
                // }}
                onSlideChange={(slide) => setActiveIndex(slide.realIndex)}
              >
                {productServices.map((service: IService, index: number) => (
                  <SwiperSlide key={index}>
                    <ServiceCard 
                      key={index} 
                      service={service}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )
          }
        
      </div>
      </div>
    </section>
  );
}

export default MyServicesComp;

// components/ServiceSlider.tsx
// "use client";

// import { useRef } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// const services = [
//   {
//     title: "Henna Brows",
//     price: "£35",
//     description:
//       "Henna Brows are a longer-lasting alternative to regular tinting. The henna stains the skin for up to 2 weeks and tints the brow hairs...",
//     image: "/images/eye-brow-carve.png",
//   },
//   {
//     title: "Brow lamination, wax and tint",
//     price: "£45",
//     duration: "1 hour",
//     description:
//       "This is a two-step brow perming treatment that helps correct and enhance your natural brow shape. Brow hairs are lifted and set into position, followed by...",
//     image: "/images/eye-brow.png",
//   },
//   {
//     title: "Wax and brow lamination",
//     price: "£40",
//     description:
//       "This is a two-step brow perming treatment followed with a wax. Perfect for a neat lifted brow look without tint...",
//     image: "/images/Column.png",
//   },
//   {
//     title: "Wax",
//     price: "£12",
//     description:
//       "Simple and effective brow shaping using wax to clean up stray hairs and define your natural arch...",
//     image: "/images/Hand-in-jaw.png",
//   },
//   {
//     title: "Wax and tint",
//     price: "£25",
//     description:
//       "Combine precision wax shaping with custom brow tint to add definition to your natural...",
//     image: "/images/eye-brow.png",
//   },
// ];

// export default function MyServicesComp() {
//   const containerRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: "left" | "right") => {
//     if (!containerRef.current) return;
//     const { scrollLeft, clientWidth } = containerRef.current;
//     const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
//     containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
//   };

//   return (
//     <section className="px-4 md:px-12 py-16 text-center">
//       <h2 className="text-2xl font-semibold mb-2 font-montserrat">My services</h2>
//       <h3 className="text-4xl md:text-5xl font-cursive text-primary mb-4 font-style-script">
//         Luxury beauty services crafted just for you.
//       </h3>
//       <p className="max-w-3xl mx-auto text-gray-600 font-inter">
//         At B-Brows, we specialize in enhancing your natural beauty with expertly crafted brow treatments, precision permanent makeup, and luxurious lash services. Each session is tailored to you, ensuring flawless, long-lasting results in a calm, welcoming space.
//       </p>

//       <div className="relative mt-10">
//         <button
//           onClick={() => scroll("left")}
//           className="absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
//         >
//           <ChevronLeft />
//         </button>

//         <div
//           ref={containerRef}
//           className="overflow-x-auto scroll-smooth flex gap-6 py-4 px-2 scrollbar-hide"
//         >
//           {services.map((service, idx) => (
//             <div
//               key={idx}
//               className="min-w-[250px] max-w-xs bg-white border rounded-lg shadow-sm flex-shrink-0"
//             >
//               <img
//                 src={service.image}
//                 alt={service.title}
//                 className="w-full h-40 object-cover rounded-t-lg"
//               />
//               <div className="p-4 text-left">
//                 <h4 className="font-semibold text-sm">{service.title}</h4>
//                 <p className="text-sm text-gray-500">{service.price}{service.duration && `\nDuration: ${service.duration}`}</p>
//                 <p className="text-xs mt-2">
//                   <span className="font-semibold">Service:</span> {service.description}
//                 </p>
//                 <button className="mt-4 bg-gold text-white px-4 py-2 text-sm rounded">See more</button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <button
//           onClick={() => scroll("right")}
//           className="absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full"
//         >
//           <ChevronRight />
//         </button>

//         <div className="flex justify-center mt-6 gap-2">
//           <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
//           <span className="w-2 h-2 bg-gray-200 rounded-full"></span>
//         </div>
//       </div>
//     </section>
//   );
// }
