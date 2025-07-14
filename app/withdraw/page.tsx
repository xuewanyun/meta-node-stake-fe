"use client";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useAccount, useWalletClient } from "wagmi";
import { formatEther } from "ethers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "react-toastify";
import classNames from "classnames";
import { parseEther } from "ethers";
import { useContract } from "@/hooks/useContract";

type UserData = Record<string, string>;
const WithDraw: React.FC = () => {
  const { data: walletClient } = useWalletClient();
  const { stakingContract } = useContract();
  const { address, isConnected } = useAccount();
  const [userData, setUserData] = useState<UserData>({
    stakedAmount: "0",
    availableAmount: "0",
    pendingAmount: "0",
  });

  const [unstackAmount, setUnstackAmount] = useState("");
  // 获取用户数据
  const getUserData = async () => {
    if (!isConnected) return;
    if (!walletClient) return;
    // 质押的金额

    const stakedAmount = await stakingContract.stakingBalance(0, address);

    const [requestAmount, pendingWithdrawAmount] =
      await stakingContract.withdrawAmount(0, address);

    const available = Number(formatEther(pendingWithdrawAmount)); // 可用的金额

    const total = Number(formatEther(requestAmount)); // 总请求的金额
    const pending = formatEther(stakedAmount); // 待处理的金额
    setUserData({
      stakedAmount: pending,
      availableAmount: available.toFixed(4),
      pendingAmount: (total - available).toFixed(4),
    });
  };
  // 提现
  const handleWithdraw = async () => {
    if (!isConnected) return;
    if (!walletClient) return;
    const tx = await stakingContract.withdraw(0);
    const res = await tx.wait();
    if (res.status === 1) {
      toast.success("Withdraw successful!");
      getUserData();
    }
    console.info("handleWithdraw=======:", res); //withdraw
  };
  // 解质押
  const handleUnstack = async () => {
    if (!isConnected) return;
    if (!walletClient) return;
    if (!unstackAmount) {
      toast.error("Please enter the amount to unstack!");
      return;
    }
    if (Number(unstackAmount) > Number(userData.stakedAmount)) {
      toast.error("Unstack amount is greater than staked amount!");
      return;
    }

    const tx = await stakingContract.unstake(0, parseEther(unstackAmount));
    const res = await tx.wait();
    if (res.status === 1) {
      toast.success("Unstack successful!");
      getUserData();
      setUnstackAmount("");
    }
    console.info("handleUnstack=======:", res);
  };
  useEffect(() => {
    if (isConnected && walletClient) {
      getUserData();
    }
  }, [isConnected, walletClient]);
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
          {["stakedAmount", "availableAmount", "pendingAmount"].map((title) => (
            <motion.div
              key={title}
              className="bg-[#2a2e38] rounded-xl p-4 text-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-xs text-gray-400">{title}</div>
              <div className="text-blue-300 font-mono text-lg">
                {userData[title]}ETH
              </div>
            </motion.div>
          ))}
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
              value={unstackAmount}
              disabled={!Number(userData.stakedAmount)}
              onChange={(e) => setUnstackAmount(e.target.value)}
            />
            <span className="absolute right-4 top-3 text-gray-400">ETH</span>
          </div>
        </div>

        {/* Connect Wallet */}
        {isConnected ? (
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={classNames(
              "bg-blue-500 hover:bg-blue-600 transition-all w-full py-3 rounded-xl text-white font-semibold",
              {
                "cursor-not-allowed": !Number(userData.stakedAmount),
              }
            )}
            onClick={handleUnstack}
            disabled={!Number(userData.stakedAmount)}
          >
            unStack ETH
          </motion.button>
        ) : (
          <div className="mt-4">
            <ConnectButton></ConnectButton>
          </div>
        )}

        {/* Withdraw Section */}
        <div className="bg-[#2a2e38] p-4 rounded-xl">
          <div className="flex justify-between text-sm text-gray-400 mb-1">
            <span>Ready to Withdraw</span>
            <span>⏱️ 20 min cooldown</span>
          </div>
          <div className="text-blue-300 font-mono text-lg">
            {userData?.availableAmount} ETH
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2 text-center">
          ⓘ After unstaking, you need to wait 20 minutes to withdraw.
        </p>

        {/* Withdraw ETH Button */}
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
          disabled={!Number(userData.availableAmount)}
          onClick={handleWithdraw}
          className={classNames(
            "bg-blue-600 hover:bg-blue-700 transition-all w-full py-3 rounded-xl text-white font-bold",
            {
              "cursor-not-allowed": !Number(userData.availableAmount),
            }
          )}
        >
          ↑ Withdraw ETH
        </motion.button>
      </motion.div>
    </div>
  );
};

export default WithDraw;
