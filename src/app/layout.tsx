import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://deven-golf.vercel.app"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  title: {
    default: "DEVEN | Premium Golf Apparel — Elevate Your Style",
    template: "%s | DEVEN Golf",
  },
  description:
    "DEVEN is a premium golf apparel brand featuring the signature Rottweiler logo. Shop modern polos, hoodies, and the Madison Collection — designed for style and comfort on and off the course.",
  keywords: [
    "golf apparel",
    "premium golf clothing",
    "golf polos",
    "golf hoodies",
    "Deven golf",
    "Rottweiler logo golf",
    "Madison Collection golf",
    "modern golf fashion",
    "golf wear",
    "luxury golf brand",
  ],
  authors: [{ name: "DEVEN" }],
  creator: "DEVEN",
  openGraph: {
    title: "DEVEN | Premium Golf Apparel — Elevate Your Style",
    description:
      "Modern golf apparel with the signature Rottweiler logo. Shop the Spring 2026 collection and the upcoming Madison Collection.",
    url: "https://deveneapen.com",
    siteName: "DEVEN",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "DEVEN Golf Apparel — Rottweiler Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVEN | Premium Golf Apparel",
    description:
      "Elevate your style with sleek golf polos, hoodies, and the Madison Collection. Signature Rottweiler logo.",
    images: ["/images/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${cormorant.variable} antialiased`}
    >
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
