import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Update the metadata for your project
export const metadata: Metadata = {
  title: "Booklt - Experiences & Slots",
  description: "Book unique travel experiences and find available slots.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
       <Suspense>
          <Header />
        </Suspense>
        
    
        {children}
      </body>
    </html>
  );
}