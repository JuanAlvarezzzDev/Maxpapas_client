import React from "react";
import { MdMenuOpen } from "react-icons/md";

const ButtonMenu = ({ onClick}) => {
  return (
    <MdMenuOpen
      size={40}
      onClick={onClick}
      className="cursor-pointer bg-primary  text-4xl p-2 text-white rounded-md font-bold uppercase shadow-md text-center transform "
    />
  );
};

export default ButtonMenu;
