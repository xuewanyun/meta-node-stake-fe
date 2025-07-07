// components/layout/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ConnectButton } from "@rainbow-me/rainbowkit";
export const YourApp = () => {
  return <ConnectButton />;
};

const tabs = [
  { name: "Stake", path: "/home" },
  { name: "Withdrawal", path: "/withdraw" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <div className="bg-[#0b0f19] text-white border-b border-gray-700 px-6 py-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-8">
          <h1 className="text-xl font-bold text-blue-400 flex items-center space-x-2">
            <span>⚡</span>
            <span>MetaNode Stake</span>
          </h1>
          <nav className="flex space-x-6">
            {tabs.map((tab) => {
              const isActive = pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  href={tab.path}
                  className="relative text-lg font-medium pb-1"
                >
                  <span
                    className={isActive ? "text-blue-400" : "text-gray-400"}
                  >
                    {tab.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-400 rounded"
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
        {/* <ConnectButton />; */}
        {/* <button className="bg-primary hover:bg-blue-600 transition px-4 py-2 rounded-full text-sm font-medium shadow">
          Connect Wallet
        </button> */}
      </div>
    </div>
  );
}
