"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "@/components/Header";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import FileUpload from "@/components/FileUpload";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const [currentUser, setCurrentUser] = useState("");

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (accounts.length) {
        setCurrentUser(accounts[0]);
      } else {
        setCurrentUser("");
      }
    } catch (error) {
      return "NOT CONNECTED TO METAMASK";
    }
  };

  // making wallet  connected onclick
  const ConnectWallet = async () => {
    try {
      if (!window.ethereum) return "Please install metamask";
      const accounts = await window.ethereum.request({
        //method is different bcoz we will connect on clicking
        method: "eth_requestAccounts",
      });

      setCurrentUser(accounts[0]);
    } catch (error) {
      return "something izzz wrong";
    }
  };
  useEffect(() => {
    checkWalletConnection();
  }, []);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <Header ConnectWallet={ConnectWallet} currentUser={currentUser} />
      <FileUpload />
    </main>
  );
}
