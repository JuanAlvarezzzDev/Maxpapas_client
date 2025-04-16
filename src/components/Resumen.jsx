import { useEffect } from "react";
import useQuisco from "../hooks/useQuiosco";
import ResumenPedido from "./ResumenPedido";

export default function Resumen() {
  const {
    pedidoFinal,
    handleSetProductoEdit,
    handleEliminarPedido,
  } = useQuisco();
  return (
    <>
      {pedidoFinal.map((producto, key) => (
        <ResumenPedido
          key={key}
          producto={producto}
          Editar={handleSetProductoEdit}
          Eliminar={handleEliminarPedido}
        />
      ))}
    </>
  );
}
