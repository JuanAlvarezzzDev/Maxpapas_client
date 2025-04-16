import React from "react";
import useCantidadBill from "../../hooks/useCantidadBill";
import { ButtonPlus, ButtonRest } from "../UI";

const BillsItem = ({ bill }) => {
    const { imagen} = bill;
  const [cantidad, handleIncrement, handleDecrement] = useCantidadBill(bill);
  return (
    <div className="relative sm:h-[40px] md:h-[120px]  xl:h-[140px] ">
      <img
        src={`/bills/${imagen}.webp`}
        alt=""
        className="w-full h-full object-fill"
      />
      <div className="absolute top-0 left-0 w-full p-3 h-full bg-white/80 opacity-0 hover:opacity-100 flex items-center justify-center transition duration-300">
        <div className="flex w-full flex-col justify-center items-center gap-2">
          <div className="flex gap-3 text-3xl">
            <ButtonRest  onClick={handleDecrement} />
            <p className="text-black">{cantidad}</p>
            <ButtonPlus onClick={handleIncrement} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillsItem;
