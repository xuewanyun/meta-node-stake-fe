"uee client";
import React from "react";

export default function useWallet() {
  const [account, setAccount] = React.useState<string | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);
  const checkConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setIsConnected(true);
          console.log("Connected account:", accounts[0]);
        } else {
          setAccount(null);
          setIsConnected(false);
          console.log("No connected accounts found.");
        }
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  };

  const handleAccountsChanged = (accounts: string[]) => {
    console.info("Accounts changed:", accounts);
    if (accounts.length > 0) {
      setAccount(accounts[0]);
    } else {
      setAccount(null);
    }
  };
  React.useEffect(() => {
    checkConnection();
    window.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener(
          "accountsChanged",
          handleAccountsChanged
        );
      }
    };
  }, []);
  return { account, isConnected };
}
