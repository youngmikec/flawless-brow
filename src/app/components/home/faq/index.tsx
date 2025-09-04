import { FC } from "react";


const Faq: FC = () => {
  return (
    <>
      <section id="faq" className="bg-[#fffcfa] py-24 ">
        <div className="w-11/12 md:w-10/12 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* <!-- Left Section: Title and Description --> */}
          <div>
            <h2 className="text-xl font-bold text-[#525252] mb-2 font-montserrat">Frequently Asked Questions</h2>
            <h3 className="text-4xl sm:text-5xl font-style-script text-[#a58e75] leading-tight mb-6 w-full md:w-10/12">
              Everything You Need to Know
            </h3>
            <p className="text-gray-700 leading-relaxed w-full md:w-7/12 mb-4">
              Here are answers to the questions we get asked the most.
            </p>
          </div>

          {/* <!-- Right Section: FAQ Cards --> */}
          <div className="space-y-4">
            <div className="bg-[#f9f1e7] rounded-lg p-4 text-sm">
              <p className="font-semibold text-[#525252] mb-8 font-inter">Is brow lamination safe for everyone?</p>
              <p className="text-[#525252] font-inter">
                Most people are good candidates, but lamination isn’t recommended if you have very sensitive skin, eczema, or broken skin in the brow area. Always send a photo beforehand so we can assess suitability.
              </p>
            </div>

            <div className="bg-[#f9f1e7] rounded-lg p-4 text-sm">
              <p className="font-semibold text-[#525252] mb-8 font-inter">Can I get my brows wet after my appointment?</p>
              <p className="text-[#525252] font-inter">
                Avoid getting your brows wet for at least 24 hours after treatments like brow lamination, tinting, or henna. This helps the product set properly and ensures longer lasting results.
              </p>
            </div>

            <div className="bg-[#f9f1e7] rounded-lg p-4 text-sm">
              <p className="font-semibold text-[#525252] mb-8 font-inter">What’s the difference between henna and regular brow tint?</p>
              <p className="text-[#525252] font-inter">
                Henna stains both the skin and the hair creating a more defined and longer-lasting look. Traditional tint only colours the brow hairs and fades more quickly from the skin.
              </p>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}

export default Faq;