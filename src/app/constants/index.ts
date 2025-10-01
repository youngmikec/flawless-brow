

export const HeroBackgroundImages: string[] = [
    '/images/hero-1.png',
    '/images/Column.png',
    '/images/eye-brow.png',
    '/images/Hand-in-jaw.png',
];

export const CompanyLogos: string[] = [
    '/images/company-logos/HH-Logo.png',
    '/images/company-logos/lutron.svg',
    '/images/company-logos/mar-and-mor.png',
    '/images/company-logos/Microsoft-Logo.png',
    '/images/company-logos/mtn-logo.svg',
    '/images/company-logos/Petralon-New-Logo.png',
    '/images/company-logos/Yinka-Folawiyo-Group-Logo-q.png',
];

export interface AppLink {
    path: string;
    title: string;
}

export const FooterLinks: {
    services: AppLink[],
    menu: AppLink[],
    socials: AppLink[],
} = {
    services: [
        { path: "/residential", title: "Residential" },
        { path: "/commercial", title: "Commercial" },
        { path: "/industrial", title: "Industrial" },
    ],
    menu: [
        { path: "/about-us", title: "About Us" },
        { path: "/estimator", title: "Estimator" },
        { path: "/portfolio", title: "Our Portfolio" },
        { path: "/contact-us", title: "Contact Us" },
    ],
    socials: [
        { path: "/instagram", title: "Instagram" },
        { path: "/facebook", title: "Facebook" },
        { path: "/x", title: "X" },
        { path: "/linkedin", title: "Linkedin" },
    ]
}

export const Testimonials = [
    {
        name: "KYLE MERWIN",
        role: "Co-owner",
        image: "/images/male.png",
        message: "I absolutely love my lashes! They look so natural yet glamorous. Everyone keeps asking where I got them done.",
    },
    {
        name: "LENA WILSON",
        role: "Client",
        image: "/images/female.png",
        message: "⁠Professional, friendly, and talented team. My brows have never looked this perfect before. Highly recommend."
    },
    {
        name: "TOMMY SANDERS",
        role: "Client",
        image: "/images/male.png",
        message: "They really know how to bring out your natural beauty. My friends couldn’t stop complimenting me after my appointment."
    },
    {
        name: "LENA WILSON",
        role: "Client",
        image: "/images/female.png",
        message: "⁠Professional, friendly, and talented team. My brows have never looked this perfect before. Highly recommend."
    },
    {
        name: "KYLE MERWIN",
        role: "Co-owner",
        image: "/images/male.png",
        message: "I absolutely love my lashes! They look so natural yet glamorous. Everyone keeps asking where I got them done.",
    },
    {
        name: "LENA WILSON",
        role: "Client",
        image: "/images/female.png",
        message: "⁠Professional, friendly, and talented team. My brows have never looked this perfect before. Highly recommend."
    },
    {
        name: "TOMMY SANDERS",
        role: "Client",
        image: "/images/male.png",
        message: "⁠Professional, friendly, and talented team. My brows have never looked this perfect before. Highly recommend."
    },
    {
        name: "LENA WILSON",
        role: "Client",
        image: "/images/female.png",
        message: "They really know how to bring out your natural beauty. My friends couldn’t stop complimenting me after my appointment."
    },
    
];

export interface IPolicy {
    title: string;
    description: string;
    icon: string;
}

export const Policies: IPolicy[] = [
  {
    title: "Appointment",
    description: "Appointments are released on the 1st and 15th of every month",
    icon: '/svgs/dart.svg',
  },
  {
    title: "Late arrival",
    description:
    "Please allow enough time for your journey. A 10-minute grace period is allowed. After that, a £10 late fee will apply. If you are more than 20 minutes late, your appointment will be cancelled.",
    icon: '/svgs/scroll-paper.svg',
  },
  {
    title: "Deposit",
    description:
    "All services require a £10 non-refundable deposit. The remaining balance must be paid in cash at your appointment.",
    icon: '/svgs/dart.svg',
  },
  {
    title: "Cancellation",
    description:
    "Please note that a minimum of 48 hours’ notice is required to reschedule an appointment. Deposits are non-refundable in the event of cancellation. Your understanding and cooperation are greatly appreciated.",
    icon: '/svgs/star.svg',
  },
];

export const services = [
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