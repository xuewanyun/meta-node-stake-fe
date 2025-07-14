import React from "react";
import { Contract } from "ethers";
import { useEthersSigner } from "./useEthersSigner";
import { useEthersProvider } from "./useEthersProvider";
import { stakeAbi } from "@/app/lib/abi/stake";
export const useContract = () => {
  const signer = useEthersSigner();
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Contract address is not defined in environment variables");
  }
  const stakingContract = new Contract(contractAddress, stakeAbi, signer);
  return {
    stakingContract,
  };
};
