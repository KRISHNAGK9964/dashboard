import React from "react";

interface loaderProps {}

const Loader: React.FC<loaderProps> = ({}) => {
  return (
    <div className="bg-[#F5F5F5] min-h-screen min-w-max flex p-6">
      <div className="animate-pulse bg-gray-300 border-white w-[220px] border rounded-3xl"></div>
      <div className="flex-1 p-10 space-y-10">
        <div className="flex space-x-10 justify-between">
          <div className=" animate-pulse w-[240px] h-[150px] rounded-2xl bg-gray-300 border border-white"></div>
          <div className=" animate-pulse w-[240px] h-[150px] rounded-2xl bg-gray-300 border border-white"></div>
          <div className=" animate-pulse w-[240px] h-[150px] rounded-2xl bg-gray-300 border border-white"></div>
          <div className=" animate-pulse w-[240px] h-[150px] rounded-2xl bg-gray-300 border border-white"></div>
        </div>

        <div className="flex h-[300px] bg-gray-300 rounded-2xl animate-pulse"></div>
      </div>
    </div>
  );
};

export default Loader;
