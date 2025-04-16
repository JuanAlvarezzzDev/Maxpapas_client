import React from "react";
import { IoIosPrint } from "react-icons/io";


const ButtonPrinter = ({ onClick}) => {
  return (
    <IoIosPrint
      className="cursor-pointer bg-red-700  text-4xl p-2 text-white rounded-md font-bold uppercase shadow-md text-center transform "
      onClick={onClick}
    />
  );
};

export default ButtonPrinter;