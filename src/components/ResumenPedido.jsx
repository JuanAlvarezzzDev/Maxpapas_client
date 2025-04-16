import { Link } from "react-router-dom";
import { formatearDinero, formatter } from "../helpers";
import { ButtonDelete, ButtonEdit } from "./UI";
import { categoriaBebidas } from "../utils/global";

export default function ResumenPedido({ producto, Eliminar, Editar }) {
  const { stateEnvio, combo, detalles, total, uuid, comentario } = producto;

  return (
    <div className="flex w-full bg-neutral-100 mb-5 p-2 text-sm relative">
      <div className="w-[85%]">
        <h1
          className={`w-fit rounded-sm bg-red-700 text-white text-basic p-0.5 ${
            stateEnvio ? "block" : "hidden"
          }`}
        >
          Para llevar
        </h1>
        {combo.length > 0 && (
          <section className="flex w-full">
            <h2 className="mx-1 font-bold">Combo:</h2>
            <p>
              {formatter.format(
                combo.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad} ${item.nombre}`
                )
              )}
              {detalles.papas.length > 0 && (
                <span className="mx-1">
                  {detalles.papas[0].nombre === "Papa Francesa"
                    ? "Francesa"
                    : detalles.papas[0].nombre === "Papa Mixta"
                    ? "Mixta"
                    : "Criolla"}
                </span>
              )}
              {detalles.salsas.length > 0 && (
                <>
                  <span className="mx-1">con</span>
                  <span>
                    {formatter.format(
                      detalles.salsas.map((item) =>
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
        )}
        {detalles.salsasAlas.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Alas:</h2>
            <p>
            {formatter.format(
                detalles.salsasAlas.map(
                  (item) =>
                   item.nombre
                )
              )}
            </p>
          </section>
        )}
        {detalles.bebidas.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Bebida:</h2>
            <p>
              {formatter.format(
                detalles.bebidas.map(
                  (item) =>
                    `${item.cantidad == 1 ? "" : item.cantidad} ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {detalles.adiciones.length > 0 && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Adiciones:</h2>
            <p>
              {formatter.format(
                detalles.adiciones.map(
                  (item) => `${item.cantidad} ${item.nombre}`
                )
              )}
            </p>
          </section>
        )}
        {comentario !== "" && (
          <section className="w-full flex">
            <h2 className="mx-1 font-bold">Comentario:</h2>
            <p>{comentario}</p>
          </section>
        )}
      </div>
      <div className="w-[15%] flex flex-col items-center justify-center text-center ">
      <div className="h-full flex flex-col gap-4 justify-center">
        <div className="flex gap-2 justify-end">
        <Link
            className={`${
              combo[0].modal_rapido ? "invisible" : "visible"
            }`}
            to={`/orden/${combo[0].id}`}
          >
            <ButtonEdit
              onClick={() => {
                Editar(producto);
              }}
            />
          </Link>
          <ButtonDelete
            onClick={() => {
              Eliminar(uuid);
            }}
          />
        </div>
        <h2 className="text-xs font-bold">{formatearDinero(total)}</h2>
        </div>
      </div>
    </div>
  );
}
