"use client";
import React from "react";
import { WagmiProvider } from "wagmi";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { sepolia } from "wagmi/chains";
const queryClient = new QueryClient();
const wagmiConfig = getDefaultConfig({
  appName: "MetaNode Stake",
  projectId: "452751325a80c08701a32243d5c6dbe8",
  chains: [sepolia],
});
const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastClassName="custom-toast"
            progressClassName="custom-toast-progress"
          />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export default Provider;
