import React from "react";

const Hero = () => {
  return (
    <div className=" max-h-screen w-screen flex justify-between mt-0 border-2 border-black">
      <div className="w-[50%]  flex flex-col items-center justify-center">
        <h1 className="text-4xl font-semibold mb-4">
          Decentralized File Storage
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Store your files securely and privately on the decentralized network.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
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
