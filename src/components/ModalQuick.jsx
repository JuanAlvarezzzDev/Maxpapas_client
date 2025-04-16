/*Este modal es solo para vista rapida de productos que no 
necesitan un panel de combo como las bebidas que solo se necesitan cantidad */
import React from "react";
import useQuisco from "../hooks/useQuiosco";
import { ButtonPlus, ButtonRest } from "./UI";
import { useCantidad } from "../hooks/useCantidad";

const ModalQuick = () => {
  const { producto, quickToggleModal, addOrder } = useQuisco();
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();
  return (
    <>
      <div className="bg-white mt-4 p-1 w-full flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl font-bold">{producto.nombre}</h2>

        <div className="flex gap-4 text-3xl">
          <ButtonRest onClick={handleDecrement} />
          <p className="text-black">{cantidad}</p>
          <ButtonPlus onClick={handleIncrement} />
        </div>
        <div
          className=" bg-[#F9AA00] text-white w-full p-3 uppercase font-bold text-center rounded-md cursor-pointer"
          onClick={() => {
            addOrder(producto, cantidad)
            quickToggleModal();
          }}
        >
          Agregar Combo
        </div>
      </div>
    </>
  );
};

export default ModalQuick;
