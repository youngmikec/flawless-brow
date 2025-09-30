import type { Metadata } from 'next';
import Head from 'next/head';
import { ToastContainer } from "react-toastify";
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'b.browstudio',
  description: 'Specialized in precision micro-blading & permanent makeup that enhances your natural beauty.',
  keywords: ['Microblading', 'Permanent Makeup', 'Brow Enhancement', 'Natural Beauty', 'Ombre Brows', 'Lip Blushing', 'Eyeliner Tattoo', 'Precision Brows', 'Beauty Redefined'],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
    openGraph: {
    title: "B.Browstudio - World's Leading Eye brows tech, Micro blading, Precision and Permanent Makeup Studio",
    description:
      "Specialized in precision micro-blading & permanent makeup that enhances your natural beauty.",
    url: "https://b.browstudio.com",
    siteName: "B.Browstudio",
    images: [
      {
        url: "https://res.cloudinary.com/dixjxrdrg/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1759049511/logo_sin1k1.png",
        width: 1200,
        height: 630,
        alt: "B.Browstudio Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "B.Browstudio - World's Leading Eye brows tech, Micro blading, Precision and Permanent Makeup Studio",
    description:
      "Empowering African cooperatives and members with digital savings, automation, and credit access.",
    images: ["https://res.cloudinary.com/dixjxrdrg/image/upload/w_1000,c_fill,ar_1:1,g_auto,r_max,bo_5px_solid_red,b_rgb:262c35/v1759049511/logo_sin1k1.png"],
  },
  alternates: {
    canonical: "https://b.browstudio.com",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="../../public/logo.png" type="image/png" />
      </Head>
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  )
}
