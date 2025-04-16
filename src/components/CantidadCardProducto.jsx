import { formatearDinero } from "../helpers";
import useQuisco from "../hooks/useQuiosco";
import { useCantidad } from "../hooks/useCantidad";
import { ButtonDelete, ButtonPlus, ButtonRest } from "./UI";
import { QuantityProducto } from "./UI/QuantityProducto";

export const CantidadCardProducto = ({ producto }) => {
  const { handleSetpreview, checkProductInPreview, handleSetProducto, editToggleModal, checkQuantityInProducto, handleEliminarProducto } = useQuisco();
  const { id, nombre, precio, imagen} = producto;
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();
  

  const isProductInCart = checkProductInPreview(producto);
  const quantityProduct = checkQuantityInProducto(producto)
  return (
    <div
      className={`aspect-square ${
        isProductInCart ? "bg-primary/60" : "bg-white"
      } col-span-1 shadow rounded-md text-center relative overflow-hidden group transition duration-700 hover:border border-primary/35`}
    >
      <div
        className={`absolute top-0 m-1 xl:m-3 left-0 ${
          isProductInCart ? "block transition duration-700" : "hidden"
        } `}
      >
        <ButtonDelete onClick={()=>{
          handleEliminarProducto(id)
        }} />
      </div>
      <div
        className={`absolute top-0 m-1 xl:m-3 right-0 ${
          isProductInCart ? "block transition duration-700" : "hidden"
        } `}
      >
        <QuantityProducto
          onClick={() => {
            handleSetProducto(producto);
            editToggleModal();
          }}
          Quantity={quantityProduct}
        />
      </div>
      <div className="w-full h-2/5 lg:h-3/5">
        <img
          decoding="async"
          width="100%"
          height="auto"
          alt={`imagen ${nombre}`}
          className="w-full h-full object-contain"
          src={`/img/${imagen}.webp`}
        />
      </div>

      <div className="h-3/5 lg:h-2/5 font-bold text-basic md:text-xl flex items-center flex-col justify-center text-center group-hover:hidden transition duration-700">
        <div className="h-full flex flex-col justify-center items-center text-xl">
          <p>{nombre}</p>
          <p>{formatearDinero(precio)}</p>
        </div>
      </div>

      <div className="h-3/5 lg:h-2/5  flex justify-center items-center w-full uppercase font-bold group-hover:block transition duration-700">
        <div className="flex gap-4 w-full justify-center  text-2xl h-1/2 items-center">
          <ButtonRest onClick={handleDecrement} />
          <p className="text-black">{cantidad}</p>
          <ButtonPlus onClick={handleIncrement} />
        </div>
        <div
          className={`h-1/2 bg-[#F9AA00] flex justify-center cursor-pointer items-center text-white w-full p-2 uppercase font-bold border-sm text-xl`}
          onClick={() => {
            handleSetpreview(producto, cantidad, false, false);
          }}
        >
          Agregar
        </div>
      </div>
    </div>
  );
};
