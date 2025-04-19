import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import TanstackProvider from "@/provider/tanstack-provider";
import { HeaderProvider } from "@/hooks/use-header";
import Header from "@/components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discover Your Perfect Bouquet",
  description:
    "Explore our curated collection and share the bouquets that speak to your heart.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeaderProvider>
          <TanstackProvider>
            <Header />
            {children}
          </TanstackProvider>
        </HeaderProvider>
        <Toaster />
      </body>
    </html>
  );
}
