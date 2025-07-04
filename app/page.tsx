"use client";
import { ethers, BrowserProvider } from "ethers";
import { useEffect, useState } from "react";

export default function Home() {
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

  return (
    <main className="flex gap-[32px]">
      <div>1</div>
      <div>2</div>
    </main>
  );
}
