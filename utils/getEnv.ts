// utils/getEnv.ts
export const getEnv = () => ({
  STAKING_CONTRACT_ADDRESS: process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
});
