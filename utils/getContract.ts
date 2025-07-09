import { stakeAbi } from "@/app/lib/abi/stake";
import { BrowserProvider, Contract } from "ethers";
import type { WalletClient } from "viem";
export const getStakingContract = async (walletClient: WalletClient) => {
  if (!walletClient?.transport) {
    throw new Error("Wallet client is not available");
  }
  const provider = new BrowserProvider(walletClient.transport as any);
  const signer = await provider.getSigner();

  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
  if (!contractAddress) {
    throw new Error("Contract address is not defined in environment variables");
  }
  const stakingContract = new Contract(contractAddress, stakeAbi, signer);
  return stakingContract;
};
