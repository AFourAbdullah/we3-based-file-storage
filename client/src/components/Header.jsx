"use client";
import React, { useState } from "react";

import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
// import { GiHamburgerMenu } from "react/icons/gi";
import { AiFillCloseCircle, AiOutlineMenu } from "react-icons/ai";

import Link from "next/link";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const address = useAddress();
  return (
    <header className="w-screen fixed top-0  left-0 z-50  bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-between px-5">
      <Link href="/">
        <img src="/logo.png" alt="" className="w-20 h-20 py-3 object-cover" />
      </Link>

      {address && (
        <div
          className={`md:flex md:relative absolute  text-white text-lg  top-0 left-0 md:w-[30%] w-screen md:mt-0 mt-20 bg-blue-900  md:flex-row items-center gap-20 flex justify-center md:gap-0  md:py-0 border-2 border-white py-1 md:justify-between`}
        >
          <Link
            href="/myfiles"
            className="mr-5 hover:text-gray-400 hover:underline"
          >
            Files
          </Link>
          <Link href="/access" className="hover:text-gray-400 hover:underline">
            Access
          </Link>
        </div>
      )}
      <ConnectWallet theme="dark" className="connectBtn " />
    </header>
  );
};

export default Header;
