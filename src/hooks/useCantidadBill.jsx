import React, { useState } from "react";
import useAdmin from "./useAdmin";

const useCantidadBill = (bill) => {
  const {handleCoins} = useAdmin();
  const [cantidad, setCantidad] = useState(0);

  const handleIncrement = () => {
    if (cantidad >= 5) return;
    const newCantidad = cantidad + 1;
    setCantidad(newCantidad);
    handleCoins(bill, newCantidad);
  };

  const handleDecrement = () => {
    if (cantidad <= 0) return;
    const newCantidad = cantidad - 1;
    setCantidad(newCantidad);
    handleCoins(bill, newCantidad);
  };

  return [cantidad, handleIncrement, handleDecrement];
};

export default useCantidadBill;
