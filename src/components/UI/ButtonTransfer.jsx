import React from "react";
import useAdmin from "../../hooks/useAdmin";
import { Transferencia } from "../../utils/global";

const ButtonTransfer = ({pedidoId}) => {
  const { pay, handleSetPay} = useAdmin();

  const isPayTransfer = pay == Transferencia
  return (
    <div
    onClick={() => {
      handleSetPay(isPayTransfer ? null : Transferencia);
    }}
      className={`h-full w-full ${
        isPayTransfer   ? "bg-primary" : "bg-white"
      } flex gap-5 items-center justify-center overflow-hidden shadow rounded-md cursor-pointer group transition duration-700`}
    >
      <img
        decoding="async"
        alt={`imagen Bancolombia`}
        className="w-[50px] max-h-full object-cover"
        src={`/img/logo_bancolombia.webp`}
      />
      <p className="text-lg font-bold">Transferencia</p>
    </div>
  );
};

export default ButtonTransfer;
