// "use client";
import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Provider from "./provider";
export const metadata: Metadata = {
  title: "MetaNode Stake",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="bg-[#0b0f19] text-white">
        <Provider>
          <Header />
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
}
