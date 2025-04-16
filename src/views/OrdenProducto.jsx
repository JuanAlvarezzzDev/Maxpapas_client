import React from 'react'
import useQuisco from "../hooks/useQuiosco";
import ModalProducto from "../components/ModalProducto";

const OrdenProducto =() => {
    const {producto} = useQuisco();
  return (
    <>
      <ModalProducto producto={producto}/>
    </>

  )
}





export default OrdenProducto