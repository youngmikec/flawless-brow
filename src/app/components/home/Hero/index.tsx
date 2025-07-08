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
            className="h-[60vh] w-full bg-center bg-cover transition-all ease-linear duration-3000 font-montserrat"
            style={{ backgroundImage: `url(${HeroBackgroundImages[currentIndex]})` }}
        >
            <div className="bg-black bg-opacity-50 h-full flex items-center justify-center relative">
                <div className="w-full md:w-4/12 h-max absolute bottom-[5rem] md:bottom-[7rem] lg:bottom-[10rem] left-10">
                    {
                        currentIndex === 0 ? 
                        <p className="text-white text-2xl md:text-2xl lg:text-4xl font-montserrat mb-4">
                            Feel the Power <br /> of Stories at <span className="border-b-[2px] border-primary">Home</span>
                        </p> :
                        currentIndex === 1 ?
                        <p className="text-white text-2xl md:text-2xl lg:text-4xl font-montserrat mb-4">
                            Meeting and <br /> Collaboration <span className="border-b-[2px] border-primary">Space</span>
                        </p> :
                        <p className="text-white text-2xl md:text-2xl lg:text-4xl font-montserrat mb-4">
                            Elevate Your <span className="border-b-[2px] border-primary">Home</span><br /> with The Best 
                        </p>
                    }
                    
                    

                    <AppButton
                        btnText={'Get a Quote'}
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