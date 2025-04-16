import React from "react";
import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";

export const ClickCardProducto = ({ producto }) => {
  const { id , nombre, precio, imagen } = producto;
  const { handleSetpreview, checkProductInPreview , handleEliminarProducto } = useQuisco();
  const isProductInCart = checkProductInPreview(producto);
  const formattedPrice = formatearDinero(precio);
  return (
    <div
      onClick={() => {
        isProductInCart ?
        handleEliminarProducto(id) :
        handleSetpreview(producto, 1, false, false);
      }}

      className={`${isProductInCart ? "bg-primary/60" : "bg-white"} cursor-pointer aspect-square col-span-1 shadow rounded-md text-center relative overflow-hidden group transition duration-700 hover:border border-primary/35`}
    >
      <div className="w-full h-2/5 lg:h-3/5">
        <img
          decoding="async"
          width="100%"
          height="auto"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className="h-3/5 lg:h-2/5 font-bold text-basic md:text-xl flex items-center flex-col justify-center text-center ">
        <div className="h-full flex flex-col justify-center items-center text-xl">
          <p>{nombre}</p>
          <p>{formattedPrice === "$ 0.000" ? null : formattedPrice}</p>
        </div>
      </div>
    </div>
  );
};
