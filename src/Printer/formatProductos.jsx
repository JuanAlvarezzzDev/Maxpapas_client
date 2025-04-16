import { formatter } from "../helpers";


const formatProductos = (productos) =>
  productos.map((producto) => {
    const { pivot, nombre_corto } = producto;
    const { envio, comentario, totalCombo, detalle, cantidad } = pivot;
    const { adiciones, salsas, bebidas, papas, salsasAlas } = JSON.parse(detalle);

    const adicionesStr = formatter.format(
      adiciones.map((item) => `${item.cantidad} ${item.nombre}`)
    );
    const salsasStr = formatter.format(
      salsas.map((item) =>
        item.cantidad > 1 ? `${item.cantidad} ${item.nombre}` : item.nombre
      )
    );
    const bebidasStr = formatter.format(
      bebidas.map((item) =>
        item.cantidad > 1 ? `${item.cantidad} ${item.nombre}` : item.nombre
      )
    );
    const comboStr = `${cantidad === 1 ? "" : cantidad} ${nombre_corto} ${
       papas.length>0 ? 'con ' + papas[0].nombre_corto : ''
    }`;

    const AlasStr = formatter.format(
      salsasAlas.map((item) =>
        item.nombre
      )
    );

    

    return {
      envio: envio ? "PARA LLEVAR" : "",
      combo: String(comboStr),
      adiciones: String(adicionesStr),
      salsas: String(salsasStr),
      alas: String(AlasStr),
      bebidas: String(bebidasStr),
      comentario: comentario !== null ? String(comentario) : "",
      totalCombo: String(totalCombo),
    };
  });
export default formatProductos;

