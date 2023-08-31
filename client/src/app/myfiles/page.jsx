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
      <h1 className="text-2xl font-bold mb-4">Files</h1>
      {loadMessage && (
        <button
          type="button"
          class="bg-indigo-500 flex items-center mx-auto justify-center w-[300px] px-3 py-1"
          disabled
        >
          <span className="animate-spin text-white"></span>
          Processing...
        </button>
      )}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">File Links</th>
          </tr>
        </thead>

        <tbody>
          {files.length !== 0 &&
            files.map((file, index) => (
              <tr key={index} className="border">
                <td className="px-4 py-2">
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
