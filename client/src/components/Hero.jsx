import React from "react";

const Hero = ({ setuploadModal, modal }) => {
  return (
    <div className=" h-screen  flex justify-between mt-0 border-2 border-black bg-slate-900">
      <div className="w-[50%]  flex flex-col items-center justify-center ">
        <h1 className="text-5xl font-bold bg-clip-text text-left mb-7 py-2 text-transparent bg-gradient-to-r from-pink-800 to-violet-800">
          Decentralized File Storage
        </h1>
        <p className=" mb-8 text-xl font-bold bg-clip-text text-transparent py-2 bg-gradient-to-r from-pink-500 to-violet-500">
          Store your files securely and privately on the decentralized network.
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setuploadModal(!modal)}
        >
          Upload Files
        </button>
      </div>
      <div className="w-[50%] h-full">
        <img src="/bgg.jpeg" alt="" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Hero;
