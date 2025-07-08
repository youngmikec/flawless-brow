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