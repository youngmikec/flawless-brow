// components/TestimonialSlider.tsx
"use client";

import { useState, useEffect } from "react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { useSwiper } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Testimonials } from "../../../constants";


const TestimonialSlider = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const swiper = useSwiper();


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


  return (
    <section className="bg-[#5A4B3D] text-white py-16 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold">What Our Client Says</h2>
        <p className="mt-2 text-sm text-[#9CA3AF] text-center w-full md:w-6/12 mx-auto">
          Cras tincidunt, sapien eget scelerisque tincidunt, est urna aliquet ex, a pretium elit nulla a lacus. 
        </p>
      </div>

      <div className="mt-10 relative">
        {/* <div className="absolute text-[#F48804] font-bold -bottom-3 left-80 transform -translate-y-1/2 cursor-pointer" onClick={() => swiper.slidePrev()}>{'<'}</div>
        <div className="absolute text-[#F48804] font-bold -bottom-3 right-28 transform -translate-y-1/2 cursor-pointer" onClick={() => swiper.slideNext()}>{'>'}</div> */}

        <Swiper
          modules={[Pagination, Navigation]}
          navigation
          slideNextClass="text-[#F48804]"
          slidePrevClass="text-[#F48804]"
          spaceBetween={30}
          slidesPerView={ windowWidth > 1024 ? 3 : windowWidth < 768 ? 1 : 2.3}
          centeredSlides
          loop={true}
          pagination={{ clickable: true }}
          className="mt-10"
          breakpoints={{
            768: {
              slidesPerView: 2.3,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          onSlideChange={(slide) => setActiveIndex(slide.realIndex)}
        >
          {Testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className={`bg-white text-gray-800 rounded-lg p-4 sm:p-6 ${activeIndex === index ? "swiper-slide-active" : "opacity-60" } h-full scale-95 transition-all duration-300 swiper-slide-shadow`}>
                <div className="grid grid-cols-2 items-center mb-3">
                  <div className="relative w-10/12 h-full">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      objectFit="cover"
                      className="w-16 h-16 rounded-md object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex justify-end">
                      <Image
                        src={"/svgs/quotes.svg"}
                        alt="Quotes"
                        width={32}
                        height={32}
                      />
                    </div>
                    <p className="text-[13px]  relative mb-6">
                      {item.message}
                    </p>

                    <div className="mb-16">
                      <h4 className="text-base font-semibold">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

    </section>
  );
}

export default TestimonialSlider;
