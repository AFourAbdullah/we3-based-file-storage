"use client";
import React, { useEffect, useState } from "react";
import { uploadFileToIPFS, uploadMetadata } from "../utils/UploadtoIpfs";
import axios from "axios";
import { toast } from "react-toastify";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { ethers } from "ethers";
import { useAddress } from "@thirdweb-dev/react";
const FileUpload = ({ uploadModal, modal }) => {
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

        let transaction = await contract.addFiles(fileUri);
        await transaction.wait();
        toast.success("transaction successffull");
        setfileName("");
        setuploadMessage(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setuploadMessage(false);
    }
  };

  return (
    <>
      {modal && (
        <div className="rounded-xl absolute top-0 h-[300px] mt-[200px] z-30 bg-white ml-[500px]  w-[30%] flex justify-center items-center shadow-2xl drop-shadow-2xl  ">
          {uploadMessage ? (
            <div className="animate-spin h-20 w-20 rounded-full mx-auto border-r-2 border-l-2 border-slate-900"></div>
          ) : (
            <form
              className="w-[100%] h-full flex flex-col justify-center gap-6  p-6  rounded "
              onSubmit={handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="image"
                  className="block font-bold text-2xl bg-clip-text  text-center  mb-6 text-transparent bg-gradient-to-r from-pink-800 to-violet-800 text-clip"
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
                  <h3 className="text-lg font-bold text-black">
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
          )}
        </div>
      )}
    </>
  );
};

export default FileUpload;
