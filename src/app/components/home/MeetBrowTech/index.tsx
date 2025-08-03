import Image from "next/image";



const MeetBrowTech = () => {
  return (
    <>
      <div className="w-full bg-[#fff9ef] py-20">
        <div className="w-full mx-auto md:w-10/12">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div>
              <Image
                src="/images/female-hair-stylist.png"
                alt="meet-browtech"
                width={500}
                height={500}
              />
            </div>
            <div>
              <p className="text-lg sm:text-xl font-bold mb-4 text-black font-montserrat">Meet your brow tech</p>
              <p className="text-3xl sm:text-5xl md:text-6xl font-inter text-[#8D7B68] mb-1">
                <span className="font-style-script mr-4">Hi!</span>
                <span className="font-bold font-source-sans">I’m Benita</span>
              </p>
              <p className="mb-12 text-[#52525B]">A qualified and insured brow technician.</p>
              <p className="text-[#52525B] max-w-2xl mt-8 mb-10">
                B-Browstudio specialises in luxury brow services, with a brand rooted in confidence, precision,
                and care. We pride ourselves on enhancing your natural beauty, ensuring every client leaves feeling empowered and beautifully browed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MeetBrowTech;