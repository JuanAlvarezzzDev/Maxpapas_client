import React from "react";
import { TbLayoutBottombarExpandFilled } from "react-icons/tb";


const ButtonExpand = ({ onClick, rotation }) => {
  return (
    <TbLayoutBottombarExpandFilled
      className={`cursor-pointer bg-primary text-4xl p-2 text-white rounded-md font-bold uppercase shadow-md text-center transform ${rotation ? ' rotate-180' : 'rotate-0'}`}
      onClick={onClick}
    />
  );
};

export default ButtonExpand;