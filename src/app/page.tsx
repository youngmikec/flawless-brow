import HomeLayout from './components/layouts/home-layout'
import Hero from './components/home/Hero'
import MyServicesComp from './components/home/MyServicesComp'
import MeetBrowTech from './components/home/MeetBrowTech'

export default function Home() {
  return (
    <HomeLayout>
      <Hero />
      <MeetBrowTech />
      <MyServicesComp />
    </HomeLayout>
  )
}
