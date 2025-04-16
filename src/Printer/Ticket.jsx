
import { formatearDinero } from "../helpers";
import CreatePdf from "./CreatePdf";
import formatProductos from "./formatProductos";

const Ticket = async (pedido, output = "print") => {
  let productos = formatProductos(pedido.productos);
  const productoColum = productos.map((producto) => {
    const elements = [
      { text: `${producto.combo}`, bold: true, style: "combo", margin: [5, 2] },
    ];
    if (producto.envio) {
      elements.push({
        text: [
          {
            text: `${producto.envio}`,
            style: "envio",
          },
        ],
      });
    }

    const ulItems = [];

    if (producto.salsas) {
      ulItems.push({ text: `Salsas: ${producto.salsas}`, margin: 3 });
    }

    if (producto.bebidas) {
      ulItems.push({ text: `Bebidas: ${producto.bebidas}`, margin: 3 });
    }

    if(producto.alas) {
      ulItems.push({ text: `Alas: ${producto.alas}`, margin: 3 });
    }

    if (producto.adiciones) {
      ulItems.push({ text: `Adiciones: ${producto.adiciones}`, margin: 3 });
    }

    // Construir el elemento ul solo si hay contenido para mostrar
    if (ulItems.length > 0) {
      elements.push({
        ul: ulItems,
      });
    }
    if (producto.comentario) {
      elements.push({ text: `Comentario: ${producto.comentario}`, style: "comentario"});
    }

    elements.push({
      canvas: [{ type: "line", x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 0.5 }],
    });

    return { stack: elements };
  });

  const content = [
    {
      margin: [0, 0, 0, 6],
      table: {
        widths: ["20%", "80%"],
        headerRows: 2,
        body: [
          [
            { text: "Fecha:", style: "tHeaderLabel", alignment: "left", colSpan: 1 },
            {
              text: new Date().toLocaleString(),
              style: "tHeaderValue",
              colSpan: 1,
              alignment: "left",
            },
          ],
          [
            { text: "Usuario", style: "tHeaderLabel", alignment: "left", colSpan: 1 },
            {
              text: pedido.user.name,
              style: "tHeaderValue",
              colSpan: 1,
              alignment: "left",
            },

          ],
          [
            { text: "Cliente", style: "tHeaderLabel", alignment: "left", colSpan: 1, },
            {
              text: pedido.cliente,
              style: "tHeaderValue",
              colSpan: 1,
              alignment: "left",
            },
          ],
        ],
      },
      layout: "noBorders",
    },
    {
      canvas: [{ type: "line", x1: 0, y1: 5, x2: 520, y2: 5, lineWidth: 0.5 }],
    },
    ...productoColum,
    {text: `Total: ${formatearDinero(pedido.total)}`, style: "totalPedido" , margin: [2, 3]}
  ];

  const response = await CreatePdf({ content }, output);
  return response;
};

export default Ticket;
