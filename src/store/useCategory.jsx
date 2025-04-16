import { useEffect, useState } from "react";
import api from "../service/apiService";

const useCategory = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});

  const obtenerCategorias = async () => {
    try {
      const data = await api.fetch("categorias");
      // console.log(data.data)
      setCategorias(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categoria) => categoria.id === id)[0];
    setCategoriaActual(categoria);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);
  return { categorias, categoriaActual, handleClickCategoria, setCategoriaActual };
};

export default useCategory;
