import { useEffect, useState } from "react";
import api from "../service/apiService";

const useProduct = () => {
  const [producto, setProducto] = useState({});
  const [listProductos, setListProductos] = useState([]);
  const obtenerProductos = async () => {
    try {
      const data = await api.fetch("productos");
      // console.log(data.data)
      setListProductos(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const obtenerProductoId = async (id)=>{
    try{
      const data = await api.fetch(`productos/${id}`);
      // console.log(data)
      return data
      
    } catch (error){
      //  console.log(error)
    }
  }

  const handleClickProductoAgotado = async (id) => {
    try {
      await api.put("productos", id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };
  useEffect(() => {
    obtenerProductos();
  }, []);

  return {producto, listProductos, setProducto, handleClickProductoAgotado, handleSetProducto, obtenerProductoId};
};

export default useProduct;


