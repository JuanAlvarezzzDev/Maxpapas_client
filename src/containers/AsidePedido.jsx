import React, { useState } from "react";
import Resumen from "../components/Resumen";
import { useAuth } from "../hooks/useAuth";
import useQuisco from "../hooks/useQuiosco";
import { formatearDinero } from "../helpers";

const AsidePedido = () => {
  const { pedido, handleSubmitNuevaOrden, total } = useQuisco();
  const [pedidoEnviado, setPedidoEnviado] = useState(false);

  const comprobarPedido = () => pedido.length === 0;

  const handleSubmit = (e) => {
    if (!pedidoEnviado) {
      e.preventDefault();
      setPedidoEnviado(true);
      handleSubmitNuevaOrden();
    }
  };
  if (comprobarPedido() && pedidoEnviado) {
    setPedidoEnviado(false);
  }

  return (
    <>
      <section className="overflow-scroll h-[90%] scrollbar p-1">
        <h1 className="text-xl font-black mb-1 text-center">Pedido Final</h1>
        {pedido.length === 0 ? (
          <p className=" text-lg text-center">
            Tu pedido se encuentra vacio...
          </p>
        ) : (
          <Resumen />
        )}
      </section>

      <footer className="h-[10%] w-full flex items-center justify-around pb-3 overflow-hidden">
        <div>
          <p className="text-basic">
            Total:
            {formatearDinero(total)}
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="submit"
              className={`${
                comprobarPedido() || pedidoEnviado ? "bg-stone-400" : "bg-black"
              } 
                            px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer`}
              value={pedidoEnviado ? "Pedido Enviado" : "Confirmar Pedido"}
              disabled={comprobarPedido() || pedidoEnviado}
            />
          </div>
        </form>
      </footer>
    </>
  );
};

export default AsidePedido;
