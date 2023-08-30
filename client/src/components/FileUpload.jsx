"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { ethers } from "ethers";
import React, { useState } from "react";

const FileUpload = ({ loadProvider }) => {
  const [account, setAcccount] = useState();
  const [Contract, setcontract] = useState();
  const [provider, setProvider] = useState(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setcontract(contract);
    setAcccount(signer.getAddress());
  };
  return (
    <div className="bg-black text-white h-5">
      <button onClick={handleSubmit}>hello</button>
      <h3>{account && account}</h3>
    </div>
  );
};

export default FileUpload;
