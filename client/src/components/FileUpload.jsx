"use client";
import React, { useEffect, useState } from "react";
import { uploadFileToIPFS, uploadMetadata } from "../utils/UploadtoIpfs";
import axios from "axios";
import { toast } from "react-toastify";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
const FileUpload = () => {
  const [recipient, setRecipient] = useState("");
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");

  const [ImageUri, setImageUri] = useState("");
  const [file, setfile] = useState(null);
  const [fileName, setfileName] = useState(null);
  const [uploadMessage, setuploadMessage] = useState(false);
  const address = useAddress();

  const JWT = `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`;
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
      alert("transaction successffull");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setfile(selectedFile);
    setfileName(selectedFile.name);
    setname(selectedFile.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    setuploadMessage(true);

    try {
      // Upload the image to IPFS
      const FileResponse = await uploadFileToIPFS(file, name);
      if (FileResponse.data && FileResponse.data.IpfsHash) {
        const fileUri = FileResponse.data.IpfsHash;
        console.log("hhhhh", fileUri);

        setuploadMessage(false);
        let transaction = await contract.addFiles(fileUri);
        await transaction.wait();
        alert("transaction successffull");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setuploadMessage(false);
    }
  };

  return (
    <>
      {uploadMessage && (
        <h4 className=" top-0 left-0 text-violet-950 text-lg text-center mb-0">
          Uploading to ipfs please wait
        </h4>
      )}
      <div className="md:w-[60%]  w-[90%] flex justify-center items-center shadow-2xl drop-shadow-2xl bg-slate-800 mt-[100px]">
        <form
          className="w-full  p-6  rounded shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-100 font-medium mb-2"
            >
              File Upload
            </label>

            <input
              type="file"
              id="image"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image"
              className="w-full px-4 py-2  rounded-lg cursor-pointer bg-blue-500 text-white hover:bg-blue-600 flex items-center justify-center"
            >
              Upload File
            </label>
          </div>
          {file && (
            <div className="mb-1 flex items-center justify-center">
              <h3 className="text-lg font-bold text-white">
                File is:{fileName}
              </h3>
            </div>
          )}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FileUpload;
