import useQuisco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import AsidePedido from "../containers/AsidePedido";
import ProductList from "../containers/ProductList";
import CustomModal from "../components/UI/CustomModal";
import ModalQuick from "../components/ModalQuick";

export default function Inicio() {
  useAuth({ middleware: "auth" });
  const {
    categoriaActual,
    busqueda,
    handleClickCategoria,
    quickModal,
    quickToggleModal,
    listProductos,
  } = useQuisco();
  const [filterProduct, setFilterProduct] = useState([]);
  
  const applyFilters = () => {
    let productos = listProductos;
    if (categoriaActual.id > 0) {
      productos = listProductos.filter(
        (producto) => producto.categoria_id === categoriaActual.id
      );
    }
    if (busqueda) {
      productos = listProductos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    setFilterProduct(productos);
  };

  useEffect(() => {
    applyFilters();
  }, [categoriaActual, busqueda, handleClickCategoria]);


  return (
    <div className="flex overflow-x-auto  h-screen snap-mandatory snap-x ">
      <div className="w-screen h-full flex-shrink-0 lg:w-3/5  xl:w-2/3 relative snap-center">
        <ProductList products={filterProduct} />
      </div>
      <div className="w-screen h-full flex-shrink-0 relative snap-center  lg:w-2/5 xl:w-1/3">
        <AsidePedido />
      </div>
      <CustomModal isOpen={quickModal} onRequestClose={quickToggleModal}>
        <ModalQuick />
      </CustomModal>
    </div>
  );
}
