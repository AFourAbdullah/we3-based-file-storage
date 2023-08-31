"use client";
import React from "react";
import logo from "../assets/logo.png";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
const Header = () => {
  const address = useAddress();
  return (
    <header className="w-screen  bg-slate-900 flex items-center justify-between px-5">
      <img src={logo} alt="" className="w-20 h-20" />
      {address && (
        <div className="flex text-white text-lg justify-between">
          <Link href="/myfiles" className="mr-5">
            My Files
          </Link>
          <Link href="/myfiles">Allow Access</Link>
        </div>
      )}
      <ConnectWallet theme="dark" className="connectBtn " />
    </header>
  );
};

export default Header;
