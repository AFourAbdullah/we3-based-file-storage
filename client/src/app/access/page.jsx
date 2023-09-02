"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [accessList, setAccessList] = useState([]);
  const [address, setAddress] = useState("");
  const [loadMessage, setloadMessage] = useState(false);

  const addressConnectedToDapp = useAddress();

  const allowAccess = async (e) => {
    e.preventDefault;
    if (!address) {
      return toast.error("Enter an address to allow access");
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setloadMessage(true);
    try {
      let transaction = await contract.allow(address);
      await transaction.wait();
      toast.success("Access Granted");
      setAddress("");
      getAccessList();

      console.log(accessList);

      setloadMessage(false);
    } catch (error) {
      setloadMessage(false);
    }
  };
  const modifyAccess = async (add, acc) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setloadMessage(true);

    try {
      let transaction;
      acc
        ? (transaction = await contract.disAllow(add))
        : (transaction = await contract.allow(add));
      await transaction.wait();
      toast.success("Access Modfied");

      getAccessList();

      console.log(accessList);

      setloadMessage(false);
    } catch (error) {
      setloadMessage(false);
    }
  };
  const getAccessList = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    setloadMessage(true);
    try {
      let accessData = await contract.shareAccess();
      setAccessList(accessData);
      console.log(accessList);

      setloadMessage(false);
    } catch (error) {
      setloadMessage(false);
    }
  };
  useEffect(() => {
    getAccessList();
    console.log(accessList);
  }, [addressConnectedToDapp]);

  return (
    <div className="container mt-[100px] mx-auto p-4">
      <h1 className="text-3xl w-[300px] mx-auto px-2 py-3 font-bold mb-8 text-center  bg-slate-900 text-white">
        Access Control
      </h1>
      <h3 className="text-xl font-bold mb-8 text-center underline">
        Control who can view your files
      </h3>

      <div className="mb-4  flex items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Enter Address"
          className=" shadow-lg border-2 placeholder-gray-700 border-black rounded p-2 mr-2 w-[450px] "
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded"
          onClick={allowAccess}
        >
          Allow Access
        </button>
      </div>
      <h3 className="text-center my-5 font-semibold text-xl">My Access List</h3>

      {loadMessage ? (
        <div className="animate-spin h-20 w-20 rounded-full mx-auto border-r-2 border-l-2 border-slate-900"></div>
      ) : accessList.length !== 0 ? (
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2 border-2 border-black">Address</th>
              <th className="px-4 py-2 border-2 border-black">Access</th>
              <th className="px-4 py-2 border-2 border-black">Action</th>
            </tr>
          </thead>
          <tbody>
            {accessList.length !== 0 &&
              accessList.map((item, index) => (
                <tr key={index}>
                  <td className=" px-1 py-2 border-2 border-slate-600">
                    {item.user}
                  </td>
                  <td className=" px-4 py-2 border-2 border-slate-600">
                    {item.access ? "Allowed" : "Denied"}
                  </td>
                  <td className=" px-4  w-[200px] py-2 border-2 border-slate-600">
                    {item.access ? (
                      <button
                        className="bg-red-800 ml-5 text-white px-2 hover:bg-red-600 py-1 rounded"
                        onClick={() => modifyAccess(item.user, item.access)}
                      >
                        {" "}
                        Deny Access
                      </button>
                    ) : (
                      <button
                        className="bg-green-800 ml-5 text-white px-2 hover:bg-green-600 py-1 rounded"
                        onClick={() => modifyAccess(item.user, item.access)}
                      >
                        Allow Access
                      </button>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <h2 className="text-xl font-bold mb-8 text-center ">No List Found</h2>
      )}
    </div>
  );
};

export default page;
