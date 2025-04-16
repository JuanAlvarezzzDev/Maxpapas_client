import { useEffect, useState } from "react";
import api from "../service/apiService";
import { toast } from "react-toastify";

const usePedido = () => {
  const [pedido, setPedido] = useState([]);
  const [pedidoFinal, setPedidoFinal] = useState([]);
  const [pedidoEdit, setPedidoEdit] = useState({});
  const [total, setTotal] = useState(0);
  const [nameCliente, setNameCliente] = useState("Cliente");

  const handleSetProductoEdit = (producto) => {
    setPedidoEdit(producto);
  };
  const ClearProductoEdit = () => {
    setPedidoEdit({});
  };

  const handleSubmitNuevaOrden = async () => {
    const body = {
      total,
      cliente: nameCliente,
      productos: pedidoFinal.map((producto) => {
        return {
          idCombo: producto.combo[0].id,
          totalCombo: producto.total,
          cantidad: producto.combo[0].cantidad,
          envio: producto.stateEnvio,
          comentario: producto.comentario,
          detalle: producto.detalles,
        };
      }),
    };
    try {
      const data = await api.post("pedidos", body);
      toast.success(data.message);
      setTimeout(() => {
        setPedido([]);
        setNameCliente("Cliente");
      }, 300);
    } catch (error) {
      console.log(error);
    }
  };


  const handleEliminarProductoPedido = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Eliminado del Pedido");
  };

  useEffect(() => {
    // Filtrar el pedido y actualizar el estado pedidoFinal
    const filteredPedido = pedido.reduce((acc, producto) => {
      const existingProduct = acc.find((p) => p.uuid === producto.uuid);
      if (!existingProduct) {
        return [...acc, producto];
      } else {
        return acc.map((p) => (p.uuid === producto.uuid ? producto : p));
      }
    }, []);
    
    setPedidoFinal(filteredPedido);
  }, [pedido]);

  useEffect(() => {
    // Calcular el nuevo total basado en pedidoFinal
    const nuevoTotal = pedidoFinal.reduce(
      (total, producto) => producto.total + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedidoFinal]);

  return {
    pedidoFinal,
    pedido,
    setPedido,
    handleSubmitNuevaOrden,
    total,
    handleEliminarProductoPedido,
    setNameCliente,
    pedidoEdit,
    handleSetProductoEdit,
    ClearProductoEdit,
    nameCliente,
  };
};

export default usePedido;
