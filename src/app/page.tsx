import HomeLayout from './components/layouts/home-layout';
import Hero from './components/home/Hero';
import MyServicesComp from './components/home/MyServicesComp';
import MeetBrowTech from './components/home/MeetBrowTech';
import Faq from './components/home/faq';
import BookingPolicies from './components/home/BookingPolicies';
import Gallery from './components/home/Gallery';
import TestimonialSlider from './components/home/TestimonialSlider';

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <MeetBrowTech />
      <MyServicesComp />
      <BookingPolicies />
      <Gallery />
      <TestimonialSlider />
      <Faq />
    </HomeLayout>
  )
}
