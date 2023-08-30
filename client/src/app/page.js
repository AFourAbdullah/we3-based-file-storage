"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "@/components/Header";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import FileUpload from "@/components/FileUpload";

export default function Home() {
  const loadProvider = async () => {};
  useEffect(() => {
    if (!window.ethereum) {
      return alert("Please install metamask");
    }
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Header />
      <FileUpload loadProvider={loadProvider} />
    </main>
  );
}
