import React from "react";
import { formatearDinero } from "../helpers";
import { ButtonPrinter } from "./UI";
import Ticket from "../Printer/Ticket";
import { v4 as uuidv4 } from "uuid";
import useAdmin from "../hooks/useAdmin";
import { ProductoOrden } from "./ProductoOrden";
import ButtonPayOrden from "./UI/ButtonPayOrden";

const ItemOrden = ({ pedido }) => {
  const {handleSetOrden} = useAdmin();
  const { cliente, id, total, productos, metodo_pago } = pedido;
  return (
    <details className="w-full  mb-2">
      <summary className="flex w-full justify-between bg-slate-200 p-5">
        <div className="gap-4 flex justify-center items-center">
        <div>
            <ButtonPrinter
              onClick={() => {
                Ticket(pedido);
              }}
            />
          </div>
          <p className="font-black text-xl capitalize">{cliente}</p>
        </div>
        <div className="flex justify-center items-center gap-6">
          <p className="text-xl font-black">{formatearDinero(total)}</p>
          <ButtonPayOrden onClick={()=>{handleSetOrden(pedido)}}/>
        </div>
      </summary>

      {productos.map((producto) => (
        <ProductoOrden key={uuidv4()} producto={producto} />
      ))}
    </details>
  );
};

export default ItemOrden;
