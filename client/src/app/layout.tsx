import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400","500","600","700","800","900"]
});

export const metadata: Metadata = {
  title: "ProcrastiMate",
  description: "Because procrastinating needs planning too.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased min-h-[100dvh]`}
      >
        {children}
      </body>
    </html>
  );
}
