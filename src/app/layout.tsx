import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import Providers from "./providers";
import { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Play Next.js - SaaS Starter Kit and Boilerplate",
    template: "%s | Play Next.js",
  },
  description:
    "This SaaS Boilerplate and Starter Kit for Next.js is designed specifically for SaaS startups. It's a free resource complete with all the necessary integrations, pages, and components you require to build and launch a comprehensive SaaS website with robust features.",
  icons: {
    icon: "/images/favicon.ico",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`!scroll-smooth ${inter.variable}`}
      lang="en"
    >
      <body>
        <Providers>
          <div className="isolate">
            <Header />

            {children}

            <Footer />
            <ScrollToTop />
          </div>
        </Providers>
      </body>
    </html>
  );
}
