"use client";
import React from "react";
import logo from "../assets/logo.png";

const Header = ({ currentUser, ConnectWallet }) => {
  return (
    <header className="w-screen  bg-slate-900 flex items-center justify-around">
      <img src={logo} alt="" className="w-20 h-20" />
      <div className=" items-center justify-end md:flex md:space-y-0 space-y-6 mt-6 md:mt-0">
        {currentUser ? (
          <p className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex">
            {currentUser.slice(0, 25)}...
          </p>
        ) : (
          <button
            className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            onClick={ConnectWallet}
          >
            Connect Wallet
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
