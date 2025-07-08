"use client";
import { motion } from "framer-motion";
import React, { use } from "react";

const WithDraw: React.FC = () => {
  const [walletConnected, setWalletConnected] = React.useState(false);
  return (
    <div className="min-h-screen bg-[#0e1117] flex items-center justify-center px-4">
      <motion.div
        className="bg-[#1c1f26] p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl font-semibold text-center text-blue-400">
          Withdraw
        </h1>
        <p className="text-center text-sm text-gray-400">
          Unstake and withdraw your ETH
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4">
          {["Staked Amount", "Available to Withdraw", "Pending Withdraw"].map(
            (title) => (
              <motion.div
                key={title}
                className="bg-[#2a2e38] rounded-xl p-4 text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <div className="text-xs text-gray-400">{title}</div>
                <div className="text-blue-300 font-mono text-lg">
                  0.0000 ETH
                </div>
              </motion.div>
            )
          )}
        </div>

        {/* Unstake Section */}
        <div>
          <label className="text-gray-400 text-sm mb-2 block">
            Amount to Unstake
          </label>
          <div className="relative">
            <input
              type="number"
              className="w-full bg-[#2a2e38] rounded-xl px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="0.0"
              disabled
            />
            <span className="absolute right-4 top-3 text-gray-400">ETH</span>
          </div>
        </div>

        {/* Connect Wallet */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="bg-blue-500 hover:bg-blue-600 transition-all w-full py-3 rounded-xl text-white font-semibold"
          onClick={() => setWalletConnected(true)}
        >
          Connect Wallet
        </motion.button>

        {/* Withdraw Section */}
        <div className="bg-[#2a2e38] p-4 rounded-xl">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Ready to Withdraw</span>
            <span>⏱️ 20 min cooldown</span>
          </div>
          <div className="text-blue-300 font-mono text-lg">0.0000 ETH</div>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          ⓘ After unstaking, you need to wait 20 minutes to withdraw.
        </p>

        {/* Withdraw ETH Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          className="bg-blue-600 hover:bg-blue-700 transition-all w-full py-3 rounded-xl text-white font-bold"
        >
          ↑ Withdraw ETH
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WithDraw;
