import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EmplOIS Next",
  description: "Improved EmplOIS created using NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black z-0 relative"}>          
        <div className="h-lvh w-lvw absolute z-0 bg-grad-1"></div>
        <div className="h-lvh w-lvw absolute z-10 bg-grad-2"></div>
        <div className="h-lvh w-lvw absolute z-20 bg-grad-3"></div>
        <div className="h-lvh w-lvw absolute z-30">
          {children}
        </div>
      </body>
    </html>
  );
}
