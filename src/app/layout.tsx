import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
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
  title: "DEVEN | Premium Golf Apparel",
  description:
    "Modern golf apparel blending style and comfort. Elevate your game with sleek designs and the signature Rottweiler logo.",
  openGraph: {
    title: "DEVEN | Premium Golf Apparel",
    description: "Elevate Your Style",
    url: "https://deveneapen.com",
    siteName: "DEVEN",
    images: [{ url: "/images/logo.png", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DEVEN | Premium Golf Apparel",
    description: "Elevate Your Style",
    images: ["/images/logo.png"],
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
      <body>{children}</body>
    </html>
  );
}
