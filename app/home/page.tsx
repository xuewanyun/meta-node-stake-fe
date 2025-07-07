"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

const tabs = ["stake", "withdraw"];

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("stake");
  const router = useRouter();

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    router.push(`/${tab.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans px-4">
      <motion.section
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mt-10"
      >
        <div className="w-full max-w-md bg-[#101827] rounded-2xl shadow-xl p-6 text-center border border-gray-700">
          <div className="mb-6">
            <div className="text-gray-400 text-sm">Staked Amount</div>
            <div className="text-3xl font-bold text-blue-400">0.0000 ETH</div>
          </div>

          <div className="mb-6 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Amount to Stake
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                className="w-full bg-[#0d121e] border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500"
              />
              <span className="absolute right-4 top-3.5 text-gray-400">
                ETH
              </span>
            </div>
          </div>

          <button className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold">
            Connect Wallet
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
