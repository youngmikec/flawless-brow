// components/MyServicesSection.tsx
import ServiceCard from "./ServiceCard";

const services = [
  {
    title: "Henna Brows",
    price: "£35",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/eye-brow-carve.png",
  },
  {
    title: "Wax, brow lamination and tint",
    price: "£45",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/eye-brow.png",
  },
  {
    title: "Wax and brow lamination",
    price: "£40",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
  {
    title: "Wax",
    price: "£12",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Hand-in-jaw.png",
  },
  {
    title: "Wax and tint",
    price: "£25",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
  {
    title: "Wax",
    price: "£12",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Hand-in-jaw.png",
  },
  {
    title: "Wax and tint",
    price: "£25",
    description: "Write an amazing description in this dedicated card section. Each word counts.",
    imageUrl: "/images/Column.png",
  },
];

const MyServicesComp = () => {
  return (
    <section className="w-full px-4 py-12 text-center bg-white">
      <div className="w-full mx-auto md:w-10/12">
        <p className="text-2xl sm:text-3xl font-bold mb-2 text-black text-center">My services</p>
        <p className="text-3xl sm:text-4xl font-[cursive] text-gray-700 mb-4">
          Luxury beauty services crafted just for you.
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          At B-Brows, we specialize in enhancing your natural beauty with expertly crafted brow treatments, precision permanent makeup, and luxurious lash services. Each session is tailored to you, ensuring flawless, long-lasting results in a calm, welcoming space.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 flex-nowrap overflow-x-auto gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} title={service.title} price={service.price} description={service.description} imageUrl={service.imageUrl} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MyServicesComp;