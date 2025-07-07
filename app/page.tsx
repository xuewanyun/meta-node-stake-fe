"use client";
import { ethers, BrowserProvider } from "ethers";
import { useEffect, useState } from "react";
import Home from "./home/page";
export default function Index() {
  const [address, setAddress] = useState("");
  // 断言 window.ethereum 存在，避免类型错误
  const provider = new BrowserProvider((window as any).ethereum);

  useEffect(() => {
    // 不能直接用 async 的 useEffect 回调，需在内部定义异步函数
    const fetchBlockNumber = async () => {
      console.info("provider-----", provider, await provider.getBlockNumber());
    };
    fetchBlockNumber();
  }, [provider]);

  return <Home></Home>;
}
