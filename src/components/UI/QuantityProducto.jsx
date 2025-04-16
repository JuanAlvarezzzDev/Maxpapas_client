import React from "react";
import { BiSolidDish } from "react-icons/bi";

export const QuantityProducto = ({ Quantity, onClick }) => {
  return (
    <div onClick={onClick} className="flex cursor-pointer gap text-sm xl:text-lg justify-center text-center gap-1 items-center bg-black  text-white  p-0.5 xl:p-1 shadow rounded-md">
      <p>{Quantity}</p>
      <BiSolidDish className="text-xl"/>
    </div>
  );
};
