import * as pdfFonts from "./vfs_fontes"; 
import pdfMake from "pdfmake/build/pdfmake";
import printjs from "print-js";

pdfMake.fonts = pdfFonts.default;

const CreatePdf = async (props, output) => {
  return new Promise((resolve, reject) => {
    try {
      const {
        pageSize = {
          width: 226.77, // Medida por Puntos
          height: 880.88,
        },
        pageMargins = [5.66, 5.66, 5.66, 5.66],
        info = {
          title: "Pedido_MaxPapas",
          author: "Max Papas Siderense",
          subject: "ticket",
          keywords: "tck, sale",
        },
        styles = {
          combo: {
            fontSize: 13,
            bold: true,
            alignment: "center",
          },
          envio: {
            fontSize: 11,
            bold: true,
            alignment: "center",
            decoration: "underline",
          },

          comentario: {
            fontSize: 12,
            bold: true,
            alignment: "center",
            decoration: "underline",
          },

          totalPedido:{
            fontSize: 13,
            bold: true,
          },
          tHeaderLabel: {
            fontSize: 11,
          },
          tHeaderValue: {
            fontSize: 12,
            bold: true,
          },
        },
        content,
      } = props;

      const docDefinition = {
        pageSize, //TAMAÑO HOJA
        pageMargins, //MARGENES HOJA
        info, //METADATA PDF
        content, // CONTENIDO PDF
        styles, //ESTILOS PDF
      };

      if (output === "b64") {
        //SI INDICAMOS QUE LA SALIDA SERA [b64] Base64
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition);
        pdfMakeCreatePdf.getBase64((data) => {
          resolve({
            success: true,
            content: data,
            message: "Archivo generado correctamente.",
          });
        });
        return;
      }

      //ENVIAR A IMPRESIÓN DIRECTA
      if (output === "print") {
        const pdfMakeCreatePdf = pdfMake.createPdf(docDefinition).open();
        pdfMakeCreatePdf.getBase64((data) => {
          printjs({
            printable: data,
            type: "pdf",
            base64: true,
          });
          resolve({
            success: true,
            content: null,
            message: "Documento enviado a impresión.",
          });
        });
        return;
      }

      reject({
        success: false,
        content: null,
        message: "Debes enviar tipo salida.",
      });
    } catch (error) {
      reject({
        success: false,
        content: null,
        message: error?.message ?? "No se pudo generar proceso.",
      });
    }
  });
};

export default CreatePdf;
