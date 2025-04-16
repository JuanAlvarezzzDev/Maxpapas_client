import React from "react";
import { MdOutlineEmojiPeople } from "react-icons/md";

export const QuantityPeople = ({People}) => {
  return (
    <div className="flex cursor-pointer gap text-sm xl:text-lg justify-center text-center  items-center bg-orange-500 text-white ml-1 mt-1 p-0.5 xl:p-1 shadow rounded-md">
      <p>{People}</p>
      <MdOutlineEmojiPeople />
    </div>
  );
};
