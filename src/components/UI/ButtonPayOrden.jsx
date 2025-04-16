import React from "react";
import { FaCalculator } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ButtonPayOrden = ({ onClick }) => {
  return (
    <Link to={'/admin/calculadora-billetes'} onClick={onClick}>
    <div
      className=" bg-sky-700  hover:bg-sky-900  px-5 py-2 rounded uppercase font-bold text-white text-center  cursor-pointer"
      
    > Pagar Pedido</div>
    </Link>
    
  );
};

export default ButtonPayOrden;
