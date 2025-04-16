import React from "react";
import { PiCaretCircleDoubleDownFill } from "react-icons/pi";

const ButtonDouble = ({onClick}) => {
  return (
    <div  onClick={onClick} className=" cursor-pointer bg-blue-700 text-sm p-2 text-white rounded-md font-bold uppercase shadow-md text-center">
     <PiCaretCircleDoubleDownFill />
    </div>
    
  );
};

export default ButtonDouble;
