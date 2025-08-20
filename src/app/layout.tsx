import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Srivaths Ravva Portfolio",
  description: "Software Engineer Protfolio",
};


export default function RootLayout({children} : {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}