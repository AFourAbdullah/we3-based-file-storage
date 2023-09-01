"use client";

import { useEffect, useState } from "react";
import { ethers } from "ethers";
import Header from "@/components/Header";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import FileUpload from "@/components/FileUpload";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const [contract, setContract] = useState();
  useEffect(() => {
    if (!window.ethereum) {
      alert("please install metamask");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractFile = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setContract(contractFile);
    // const ipfsJsn =
    //   "https://gateway.pinata.cloud/ipfs/QmVX16BsVvwaqKvfzEjEF2FKXpi8FKpPKotg38Sp4M3Nxb";
    // console.log(ipfsJsn.name);
  }, []);
  return (
    <main className="flex   items-center justify-around ">
      <FileUpload contract={contract} />
    </main>
  );
}
