import Image from "next/image";


const Gallery = () => {
  return (
    <>
      <div className="w-11/12 md:w-10/12 mx-auto py-12 bg-white">
        <div className="flex justify-end">
          <h4 className="text-xl font-bold text-[#525252] uppercase tracking-wide mb-4">My Portfolio</h4>
        </div>
        <div className="flex justify-end">
          <h2 className="text-4xl sm:text-5xl font-extrabold mt-2 leading-tight text-[#a58e75] font-[cursive]">Gallery</h2>
        </div>
        <div className="flex justify-end">
          <p className="mt-6 text-[#52525B] leading-relaxed w-full md:w-7/12">
            At B-Brows, we specialize in enhancing your natural beauty with expertly crafted brow treatments, 
            precision permanent makeup, and luxurious lash services. Each session is tailored to you, ensuring flawless, long-lasting results in a calm, welcoming space.
          </p>
        </div>

        <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
          <div className="relative min-h-[300px]">
            {/* Background Image */}
            <Image
              src="/images/Column.png" // update to your actual image path
              alt="Wax Background"
              fill
              objectFit="cover"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8">
            <div className="relative min-h-[300px]">
              {/* Background Image */}
              <Image
                src="/images/eye-brow-carve.png" // update to your actual image path
                alt="Wax Background"
                fill
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[300px]">
              {/* Background Image */}
              <Image
                src="/images/eye-brow-carve.png" // update to your actual image path
                alt="Wax Background"
                fill
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[300px]">
              {/* Background Image */}
              <Image
                src="/images/eye-brow.png" // update to your actual image path
                alt="Wax Background"
                fill
                objectFit="cover"
                className="object-cover"
              />
            </div>
            <div className="relative min-h-[300px]">
              {/* Background Image */}
              <Image
                src="/images/Hand-in-jaw.png" // update to your actual image path
                alt="Wax Background"
                fill
                objectFit="cover"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Gallery;