import React from "react";
import { RiHomeHeartFill } from "react-icons/ri";

const ButtonStore = () => {
  const enterStore = (e) => {
    e.preventDefault();
    window.open("/", "_blank");
  };
  return (
    <div className="relative group w-full text-center flex justify-center items-center mt-3">
      <div onClick={enterStore} className="flex justify-center items-center">
        <RiHomeHeartFill className="cursor-pointer bg-primary text-5xl p-2 text-white rounded-md font-bold uppercase shadow-md transform transition-transform group-hover:scale-110" />
      </div>
      <div
        className={`
          absolute left-full rounded-md px-4 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          font-bold
          invisible opacity-0 transform -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
      >
        Tienda Principal
      </div>
    </div>
  );
};

export default ButtonStore;
