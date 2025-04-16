import { Link } from "react-router-dom";
import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";
import { QuantityPeople } from "./UI/QuantityPeople";
import QuantityWings from "./UI/QuantityWings";

export default function Producto({ producto }) {
  const { ClearProductoEdit, quickToggleModal, handleSetProducto } =
    useQuisco();
  const {
    id,
    nombre,
    imagen,
    precio,
    cantidad_personas,
    cantidad_alas,
    modal_rapido,
  } = producto;
  const formattedPrice = formatearDinero(precio);

  return (
    <div className="aspect-square col-span-1 shadow rounded-md relative overflow-hidden">
      <div className="w-full h-2/5 xl:h-3/5 relative">
        <div className="absolute top-0 left-0 flex">
          {cantidad_personas === 1 ? null : (
            <QuantityPeople People={cantidad_personas} />
          )}
          {cantidad_alas > 1 && <QuantityWings Wings={cantidad_alas} />}
        </div>

        <img
          decoding="async"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain"
          width="100%"
          height="auto"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className=" h-3/5 xl:h-2/5 font-bold text-basic sm:text-xs lg:text-lg xl:text-xl flex items-center flex-col justify-center text-center">
        <div className="h-3/5 lg:h-1/2">
          <p>{nombre}</p>
          <p>{formattedPrice === "$ 0.000" ? null : formattedPrice}</p>
        </div>
        {modal_rapido ? (
          <div
            className={`cursor-pointer h-2/5 lg:h-1/2 bg-[#F9AA00] flex justify-center items-center text-white w-full p-2 uppercase font-bold `}
            onClick={() => {
              handleSetProducto(producto);
              quickToggleModal();
            }}
          >
            Agregar
          </div>
        ) : (
          <Link
            className={`h-2/5 lg:h-1/2 bg-[#F9AA00] flex justify-center items-center text-white w-full p-2 uppercase font-bold `}
            to={`/orden/${id}`}
            onClick={() => {
              ClearProductoEdit();
            }}
          >
            Agregar
          </Link>
        )}
      </div>
    </div>
  );
}
