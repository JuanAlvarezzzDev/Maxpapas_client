import React from "react";
import { formatearDinero, formatter } from "../helpers";

export const ProductoOrden = ({ producto }) => {
  const { nombre, pivot } = producto;
  const detalle =
    typeof pivot.detalle === "string"
      ? JSON.parse(pivot.detalle)
      : pivot.detalle;

  const papa =
    detalle && detalle.papas && detalle.papas.length > 0
      ? detalle.papas[0].nombre_corto
      : "";
  const comentario = pivot.comentario;
  return (
    <div className="w-full flex bg-neutral-100 mt-3 p-2 text-sm relative">
      <div className="w-4/5">
        <h1
          className={`w-fit rounded-sm bg-red-700 text-white text-basic p-0.5 ${
            pivot.envio ? "block" : "hidden"
          }`}
        >
          Para llevar
        </h1>
        <section className="flex w-full">
          <h2 className="mx-1 font-bold">Combo:</h2>
          <p>
            {pivot.cantidad == 1 ? '': pivot.cantidad} <span>{nombre}</span>
            <span className="mx-1">{papa}</span>
            {detalle.salsas.length > 0 && (
              <>
                <span className="mx-1">con</span>
                <span>
                  {formatter.format(
                    detalle.salsas.map((item) =>
                      item.cantidad > 1
                        ? `${item.cantidad} ${item.nombre}`
                        : item.nombre
                    )
                  )}
                </span>
              </>
            )}
          </p>
        </section>
        {detalle.salsasAlas.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Alas:</h2>
            <p>
              {formatter.format(detalle.salsasAlas.map((item) => item.nombre))}
            </p>
          </section>
        )}
        {detalle.bebidas.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Bebida:</h2>
            <p>
              {formatter.format(
                detalle.bebidas.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad}  ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {detalle.adiciones.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Adiciones:</h2>
            <p>
              {formatter.format(
                detalle.adiciones.map(
                  (item) => `${item.cantidad} ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {comentario !== null && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Comentario:</h2>
            <p>{comentario}</p>
          </section>
        )}
      </div>

      <div className="w-1/ font-bold flex justify-center items-center">{formatearDinero(pivot.totalCombo)}</div>
    </div>
  );
};
