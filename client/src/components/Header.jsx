"use client";
import React from "react";
import logo from "../assets/logo.png";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import Link from "next/link";
const Header = () => {
  const address = useAddress();
  return (
    <header className="w-screen  bg-orange-700 flex items-center justify-between px-5">
      <img src={logo} alt="" className="w-20 h-20" />
      {address && (
        <div className="flex text-white text-lg w-[300px] justify-between">
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
