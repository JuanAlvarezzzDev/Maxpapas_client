import React, { forwardRef } from "react";
import { FaCheck } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
import { formatearDinero } from "../../helpers";
import { LuPackagePlus } from "react-icons/lu";
import useQuisco from "../../hooks/useQuiosco";

const Switch = forwardRef(
  ({ label, viewPrice, onClick, ...restProps }, forwardedRef) => {
    // Extraer propiedades válidas para el input
    const { ...inputProps } = restProps;

    const { stateEnvio } = useQuisco();
    return (
      <label
        className="cursor-pointer flex items-center gap-5 "
        onClick={onClick}
      >
        <div className="flex gap-4 items-center">
          {/* Pasar solo las props válidas al input */}
          <input
            type="checkbox"
            className="hidden"
            ref={forwardedRef}
            {...inputProps}
          />
          <div
            className={`w-14 p-1 rounded-full ${
              stateEnvio ? "bg-orange-200" : "bg-gray-200"
            }`}
          >
            <div
              className={`w-fit p-0.5 shadow-sm rounded-full transition-all duration-300 text-white ${
                stateEnvio
                  ? "bg-orange-500 translate-x-6 rotate-0"
                  : "bg-gray-400 -rotate-180"
              }`}
            >
              {stateEnvio ? (
                <FaCheck size={20} />
              ) : (
                <IoCloseOutline size={20} />
              )}
            </div>
          </div>
          <span
            className={`text-lg font-bold hidden md:block ${
              stateEnvio ? "text-orange-200" : "text-white"
            }`}
          >
            {label}
          </span>

          <LuPackagePlus
            className={`text-4xl font-black  block xl:hidden ${
              stateEnvio ? "text-orange-200" : "text-white"
            }`}
          />
        </div>
        <p
          className={`font-black hidden  text-orange-200 text-xl ${
            stateEnvio ? "xl:block xl:visible" : "xl:block xl:invisible"
          }`}
        >
          {formatearDinero(viewPrice)}
        </p>
      </label>
    );
  }
);

export default Switch;
