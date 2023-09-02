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
          className={`md:flex ${
            isOpen ? "absolute" : "hidden"
          } a text-white text-lg md:w-[300px] w-screen bg-blue-900 flex-col md:flex-row items-center justify-between`}
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
      <div className="md:hidden flex items-center justify-center w-[30px] text-white text-lg">
        {isOpen ? (
          <AiFillCloseCircle onClick={() => toggleMenu()} />
        ) : (
          <AiOutlineMenu onClick={() => toggleMenu()} />
        )}
      </div>
    </header>
  );
};

export default Header;
