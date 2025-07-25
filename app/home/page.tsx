"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiInfo, FiZap } from "react-icons/fi";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { toast } from "react-toastify";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useContract } from "@/hooks/useContract";
import { useEthersProvider } from "@/hooks/useEthersProvider";
import Button from "@/components/ui/Button";

const Home: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("home");
  const { stakingContract } = useContract();
  const provider = useEthersProvider();
  const [amount, setAmount] = useState("");
  const { data: walletClient } = useWalletClient();
  const { address, isConnected } = useAccount();
  const [balance, setBalance] = useState("0.0");
  const [stakedAmount, setStakedAmount] = useState("");
  const [loading, setLoading] = useState(false);
  // 获取余额
  const getBalance = async () => {
    if (!address || !walletClient?.transport) return "0.0";
    if (!provider) return "0.0";
    const balance = await provider.getBalance(address);
    setBalance(parseFloat(ethers.formatEther(balance)).toFixed(4));
    return ethers.formatEther(balance);
  };
  // 获取质押金额
  const getStakeAmount = async () => {
    if (!walletClient) return;
    if (!address || !walletClient?.transport) return "0.0";
    const res = await stakingContract.stakingBalance(0, address);
    const stakedAmount = ethers.formatEther(res);
    setStakedAmount(stakedAmount);
  };
  // 写入合约
  const handleStake = async () => {
    if (!isConnected) {
      return;
    }
    if (!walletClient) {
      toast.error("Please connect your wallet");
      return;
    }
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (Number(amount) > parseFloat(balance)) {
      toast.error("Insufficient balance");
      return;
    }

    try {
      setLoading(true);
      const amountToStake = ethers.parseEther(amount);
      const tx = await stakingContract.depositETH({ value: amountToStake });
      const res = await tx.wait();
      if (res.status === 1) {
        setAmount("");
        toast.success("Staking successful!");
        setLoading(false);
        getStakeAmount(); // Refresh balance after staking
      }
      console.log("res===========等待:", res);
    } catch (error) {
      console.error("Error staking:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      getStakeAmount();
      getBalance();
    }
  }, [isConnected, address, walletClient]);
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
            <div className="text-3xl font-bold text-blue-400">
              {stakedAmount} ETH
            </div>
          </div>

          <div className="mb-6 text-left">
            <label className="block text-sm text-gray-400 mb-1">
              Amount to Stake
            </label>
            <div className="relative">
              <input
                type="number"
                placeholder="0.0"
                value={amount}
                className="w-full bg-[#0d121e] border border-gray-700 rounded-xl py-3 px-4 text-white placeholder-gray-500"
                onChange={(e) => setAmount(e.target.value)}
              />
              <span className="absolute right-4 top-3.5 text-gray-400">
                ETH
              </span>
            </div>
          </div>
          <div>
            {isConnected ? (
              <Button
                handleClick={handleStake}
                disabled={loading || !amount}
                loading={loading}
              >
                Stake ETH
              </Button>
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
