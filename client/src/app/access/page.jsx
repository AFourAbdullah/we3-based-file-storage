"use client";
import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

const page = () => {
  const [accessList, setAccessList] = useState([]);
  const [address, setAddress] = useState("");
  const [loadMessage, setloadMessage] = useState(false);

  const addressConnectedToDapp = useAddress();

  const allowAccess = () => {};
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
      let accessData = await contract.shareAccess;
      setAccessList(accessData);
      console.log(accessList);

      setloadMessage(false);
    } catch (error) {
      setloadMessage(false);
    }
  };
  useEffect(() => {
    getAccessList();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8 text-center underline">
        Access Control
      </h1>
      <h3 className="text-3xl font-bold mb-8 text-center underline">
        Control who can view your files
      </h3>

      <div className="mb-4  flex items-center justify-center gap-4">
        <input
          type="text"
          placeholder="Enter Address"
          className=" shadow-lg rounded p-2 mr-2 w-[450px] border-[1px]"
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

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">Address</th>
            <th className="px-4 py-2">Access</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default page;

// {
//   accessList.map((item, index) => (
//     <tr key={index}>
//       <td className="border px-4 py-2">{item.address}</td>
//       <td className="border px-4 py-2">{item.access ? "Allowed" : "Denied"}</td>
//       <td className="border px-4 py-2">
//         {/* You can add action buttons here */}
//         {/* Example: */}
//         {/* <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button> */}
//       </td>
//     </tr>
//   ));
// }
