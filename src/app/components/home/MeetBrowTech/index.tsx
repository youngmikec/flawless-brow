import Image from "next/image"



const MeetBrowTech = () => {
  return (
    <>
      <div className="w-full bg-[#fdf6ea] py-20">
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
              <p className="text-2xl sm:text-3xl font-bold mb-2 text-black">Meet your brow tech</p>
              <p className="text-3xl sm:text-4xl font-[cursive] text-gray-700 mb-4">
                <span>Hi</span>
                <span>I’m Benita</span>
              </p>
              <p className="mb-12 text-black">A qualified and insured brow technician.</p>
              <p className="text-gray max-w-2xl mt-8 mb-10">
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