'use client'
import { FC } from "react";
import { HeroBackgroundImages } from "@/app/constants";

import { useEffect, useState } from 'react'
import AppButton from "../../app/AppButton";




const Hero: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroBackgroundImages.length)
          }, 6000) // 6 seconds
      
          return () => clearInterval(interval)
    });

    return (
        <div
            className="h-[65vh] w-full bg-center bg-cover transition-all ease-linear duration-3000 font-montserrat"
            style={{ 
                backgroundImage: `url(${HeroBackgroundImages[currentIndex]})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center relative">
                <div className="w-full md:w-4/12 h-max absolute bottom-[5rem] md:bottom-[7rem] lg:bottom-[10rem] left-10">
                    <p className="text-2xl md:text-4xl text-black font-extrabold font-source-sans">
                        Fearfully <span className="font-style-script font-normal">made,</span>
                    </p>
                    <p className="text-2xl md:text-4xl text-black font-extrabold font-source-sans mb-4">
                        Beautifully <span className="font-style-script font-normal">browed.</span>
                    </p>
                    <p className="text-sm sm:text-lg text-[#52525B] font-inter mb-8 w-11/12">
                        One line clarifying the service or promise. Example: 
                        “Specializing in precision microblading & 
                        permanent makeup that enhances your natural beauty.”
                    </p>
                    
                    

                    <AppButton
                        btnText={'Book Now'}
                        fill={'fill'}
                        bgColor={'primary'}
                        width={"max"}
                    />
                </div>
            </div>
        </div>
    );

}

export default Hero;