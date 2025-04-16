import React, { useEffect, useState } from "react";
import useAdmin from "../hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { formatearDinero } from "../helpers";
import BillsItem from "../components/Admin/BillsItem";
import { ButtonTransfer } from "../components/UI";
import useOrderDifference from "../hooks/useOrderDifference";
import { Transferencia } from "../utils/global";

export const CalculadoraBilletes = () => {
  const { bills, orden, coinsTotal, stateInitialCalculator, payOrder, pay} = useAdmin();
  const { id, total } = orden;
  const { diferencia, textoEstado, colorEstado } = useOrderDifference(
    total,
    coinsTotal
  );

  const totalPedido = total ?? 0;

  const navigate = useNavigate();
  useEffect(() => {
    // Redirigir a /admin/ si el total del pedido es cero
    if (totalPedido === 0) {
      navigate("/admin/");
    }
  }, [total]);

  /* -------Clean setCoins------ */
  useEffect(() => {
    stateInitialCalculator();
  }, []);

  const comprobarPedido = () => {
    const isPayTransfer = pay == Transferencia
    return coinsTotal >= total || isPayTransfer
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    payOrder();
    navigate("/admin/");
  };

  return (
    <div className="max-w-5xl	 h-full  flex flex-col mx-auto">
      <header className="w-full  grid gap-3 grid-cols-3 h-[10%] mb-6">
        <div className=" flex h-full flex-col col-span-1 gap-3">
          <ButtonTransfer pedidoId={id} />
        </div>

        <div className=" h-full flex flex-col col-span-1 justify-center items-center shadow rounded-md">
          <h2 className="text-3xl font-bold">{formatearDinero(totalPedido)}</h2>

          <pre>Total Pedido</pre>
        </div>
        <div className="flex flex-col gap-3   col-span-1 shadow rounded-md px-2">
          <div className="flex w-full h-1/2 justify-center items-center">
            <div className="w-2/5 text-left text-xl font-bold">Recibe</div>
            <div
              className={`w-3/5 text-right text-2xl font-bold ${colorEstado}`}
            >
              {formatearDinero(coinsTotal)}
            </div>
          </div>

          <div className={`flex w-full h-1/2 justify-center items-center`}>
            <div className="w-2/5 text-left text-xl font-bold">
              {textoEstado}
            </div>
            <div
              className={`w-3/5  text-right  text-2xl font-bold text-blue-500 `}
            >
              {formatearDinero(diferencia)}
            </div>
          </div>
        </div>
      </header>
      <main className="h-[80%] overflow-scroll  lg:overflow-hidden flex w-full justify-center mt-5 relative">
        <div className="flex flex-row md:flex-col flex-wrap gap-4">
          {bills.map((bill) => (
            <BillsItem key={bill.id} bill={bill} />
          ))}
        </div>
      </main>

      <footer className="w-full h-[10%] justify-center item-center">
        <form onSubmit={handleSubmit}>
          <div>
          <input
              type="submit"
              className={`${
                comprobarPedido() ? "bg-black" : "bg-stone-400"
              } px-5 py-4 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
              value={comprobarPedido() ? "Pagar Pedido" : "Sin Canje"}
              disabled={!comprobarPedido()}
            />
          </div>
        </form>
      </footer>
    </div>
  );
};
