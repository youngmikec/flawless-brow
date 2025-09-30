"use client";
import { useEffect, useState } from "react";

import { useProductService } from "./hooks";
import HomeLayout from './components/layouts/home-layout';
import Hero from './components/home/Hero';
import MyServicesComp from './components/home/MyServicesComp';
import MeetBrowTech from './components/home/MeetBrowTech';
import Faq from './components/home/faq';
import BookingPolicies from './components/home/BookingPolicies';
import Gallery from './components/home/Gallery';
import TestimonialSlider from './components/home/TestimonialSlider';
import FreeService from './components/home/FreeService';
import { IService } from "../interfaces";

export default function Home() {
    const { data } = useProductService('', true);
    const [productServices, setProductServices] = useState<IService[]>([]);
    const [freeService, setFreeService] = useState<IService | null>(null);

  useEffect(() => {
      setProductServices(data || []);
      const freeService = data?.find((service: IService) => service.isFree);
      if(freeService) {
        setFreeService(freeService);
      }
  }, [data]);

  return (
    <HomeLayout>
      <Hero />
      <MeetBrowTech />
      <MyServicesComp 
        productServices={productServices}
      />
      <BookingPolicies />
      {/* <Gallery /> */}
      <TestimonialSlider />
      <Faq />
    </HomeLayout>
  )
}
