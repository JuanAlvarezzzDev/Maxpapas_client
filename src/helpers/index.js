export const formatearDinero = (cantidad) => {
  if (cantidad == 0 || cantidad== NaN) {
    return "$ 0.000";
  }
  const cantidadAbsolute = Math.abs(cantidad);
  return cantidadAbsolute.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const formatter = new Intl.ListFormat("es", {
  style: "long",
  type: "conjunction",
});


export const ReduceCantidad = (producto) => {
  return producto.reduce(
    (total, producto) => total + producto.cantidad,
    0
  );
};

export const ReduceTotal = (producto) => {
  return producto.reduce(
    (total, producto) =>
      total + producto.cantidad * producto.precio,
    0
  );
};
export const filterCategory = (id, productos) => {

  if(id!== 9){
    return productos.filter((producto) => producto.categoria_id === id);
  }

  return productos.filter((producto) =>producto.categoria_id === id && !producto.comboPrincipal);
  
};
