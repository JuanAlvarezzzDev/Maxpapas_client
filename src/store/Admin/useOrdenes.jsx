import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../../service/apiService";
import { Efectivo, Transferencia } from "../../utils/global";

const useOrdenes = () => {
  const [orden, setOrden] = useState({});
  const [pay, setPay] = useState(0)

  const handleSetOrden = (pedido) => {
    setOrden(pedido);
  };

  const handleSetPay = (pay)=>{
    setPay(pay)
  }
 

  const handleChangePay = async (id, metodo_pago) => {
    try {
      const data = await api.put(`pedidos/update-pay/${id}`, {
        metodo_pago
      });
      toast.success(data.message);
      // Aquí puedes realizar cualquier acción adicional después de completar con éxito la solicitud
    } catch (error) {
      console.log(error);
      // Aquí puedes manejar cualquier error que ocurra durante la solicitud PUT
    }
  };
  
  const payOrder = () => {
    const { id } = orden;
    if (pay == 0) {
      handleChangePay(id, Efectivo);
    } else {
      handleChangePay(id, Transferencia);
    }
  };
  

  return {
    orden,
    handleSetOrden,
    handleSetPay,
    handleChangePay,
    setPay,
    pay,
    payOrder
  };
};

export default useOrdenes;
