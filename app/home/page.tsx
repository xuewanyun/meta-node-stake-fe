"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiInfo, FiZap } from "react-icons/fi";
import { BrowserProvider, Contract, ethers } from "ethers";
import { useAccount, useConnect, useDisconnect, useWalletClient } from "wagmi";
import useWallet from "@/hooks/useWallet";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { stakeAbi } from "../lib/abi/stake";
const tabs = ["stake", "withdraw"];

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("stake");
  // const { account, isConnected } = useWallet();
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();

  console.info("account---------:", address, isConnected);

  const handleStake = async () => {
    if (!isConnected) {
      return;
    }
    try {
      const provider = new BrowserProvider(walletClient?.transport);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = (await provider.getNetwork()).name;
      console.info("获取signer相关信息", address, network);
      // Replace with your staking contract address and ABI
      const contractAddress = "0x264e0349deEeb6e8000D40213Daf18f8b3dF02c3";

      const stakingContract = new Contract(contractAddress, stakeAbi, signer);

      // Replace with the actual amount to stake
      const amountToStake = ethers.parseEther("0.001");
      const tx = await stakingContract.depositETH({ value: amountToStake });
      const res = await tx.wait();
      console.log("res===========等待:", res);
    } catch (error) {
      console.error("Error staking:", error);
    }
  };
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-6"
      >
        <div className="flex justify-center pt-[20px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-2 border-primary-500/20 flex items-center justify-center shadow-xl"
            style={{ boxShadow: "0 0 60px 0 rgba(14,165,233,0.15)" }}
          >
            <FiZap className="w-12 h-12 text-primary-500" />
          </motion.div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text  mb-2">
          MetaNode Stake
        </h1>
        <p className="text-gray-400 text-xl">Stake ETH to earn tokens</p>
      </motion.div>
      <motion.section
        key={selectedTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center pb-[20px]"
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
          <div>
            {isConnected ? (
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 transition py-3 rounded-xl font-semibold"
                onClick={handleStake}
              >
                Stake ETH
              </button>
            ) : (
              <ConnectButton></ConnectButton>
            )}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
