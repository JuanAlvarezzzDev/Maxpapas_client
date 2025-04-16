import React,{ useState } from "react";

export const useCantidad = () =>{
    const [cantidad, setCantidad] = useState(1);
  
    const handleIncrement = () => {
      if (cantidad >= 5) return;
      setCantidad(cantidad + 1);
    };
  
    const handleDecrement = () => {
      if (cantidad <= 1) return;
      setCantidad(cantidad - 1);
    };
  
    return [cantidad, handleIncrement, handleDecrement];
  }
