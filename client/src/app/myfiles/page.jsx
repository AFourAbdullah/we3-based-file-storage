"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { BiLinkExternal } from "react-icons/bi";

const page = () => {
  const [files, setFiles] = useState([]);
  const [loadMessage, setloadMessage] = useState(false);

  const address = useAddress();

  const GetFiles = async () => {
    setloadMessage(true);
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
      setFiles(filesArray);
      setloadMessage(false);
    } catch (error) {
      console.log(error);
      setloadMessage(false);
    }
  };
  useEffect(() => {
    console.log(address);
    GetFiles();
    console.log(files);
  }, [address]);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-7 text-center">My Files</h1>
      {loadMessage && (
        <div className="animate-spin h-20 w-20 rounded-full mx-auto border-r-2 border-l-2 border-slate-900"></div>
      )}
      <table className="w-[80%] mx-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">My Files</th>
          </tr>
        </thead>

        <tbody>
          {files.length !== 0 &&
            files.map((file, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2 text-center">
                  <a
                    href={`https://gateway.pinata.cloud/ipfs/${file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline flex gap-3 items-center"
                  >
                    {file}
                    <BiLinkExternal />
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
