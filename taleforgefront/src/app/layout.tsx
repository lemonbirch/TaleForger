import type { Metadata } from "next";
import { Inter, Schoolbell } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import BottomNavbar from "./components/Navbar/BottomNavbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TaleForge",
  description: "Generated by create next app",
};


const schoolbell = Schoolbell({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dracula">
      <body className={`${inter.className} ${schoolbell}`}>
        <Navbar />
        <BottomNavbar />
        {children}
      </body>
    </html>
  );
}
