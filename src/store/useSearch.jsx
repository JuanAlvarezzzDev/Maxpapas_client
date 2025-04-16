import { useState } from "react";

const useSearch = () => {
  const [busqueda, setBusqueda] = useState("");
  const handleChangeBusqueda = (e) => setBusqueda(e.target.value);
  return { busqueda, handleChangeBusqueda };
};

export default useSearch;