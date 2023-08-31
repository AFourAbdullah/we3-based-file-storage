"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const page = () => {
  const [files, setFiles] = useState();

  const address = useAddress();

  const GetFiles = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    try {
      let filesArray = await contract.display(address);

      console.log(filesArray);
      setFiles(files);
      alert("transaction successffull");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(address);
    GetFiles();
    console.log(files);
  }, [address]);
  return <div>page</div>;
};

export default page;
