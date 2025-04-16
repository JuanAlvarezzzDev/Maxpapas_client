import { useState } from "react";
import {
  categoriaAlas,
  categoriaPapas,
  categoriaSalsas,
} from "../utils/global";
import { filterCategory } from "../helpers";
import { toast } from "react-toastify";

/**
 * Custom hook que gestiona el estado del combo.
 * Incluye los estados para los productos del combo, el total, las salsas, bebidas, etc.
 * También proporciona una función para controlar la vista previa del combo.
 * @returns {Object} Objeto con los estados y la función para controlar la vista previa del combo.
 */

const useComboState = () => {
  const [previewCombo, setPreviewCombo] = useState([]);
  /*------Productos de armado del combo final-----*/
  const [combo, setCombo] = useState([]);
  const [totalCombo, setTotalCombo] = useState(0);

  const [salsas, setSalsas] = useState([]);
  const [totalSalsa, setTotalSalsa] = useState(0);
  const [cantidadSalsa, setCantidadSalsa] = useState(0);

  const [bebidas, setBebidas] = useState([]);
  const [totalBebidas, setTotalBebidas] = useState(0);

  const [papas, setPapas] = useState([]);
  const [salsasAlas, setSalsasAlas] = useState([]);
  const [totalAdicion, setTotalAdicion] = useState(0);
  const [adiciones, setAdiciones] = useState([]);

  const [totalPreview, setTotalPreview] = useState(0);

  /* State envio */
  const [totalEnvio, setTotalEnvio] = useState(0);
  const [stateEnvio, setStateEnvio] = useState(false);

  /* Comentario State */
  const [comentario, setComentario] = useState("");

  /* Combo Duplicate seccion */
  const [duplicateCombo, setDuplicateCombo] = useState([]);

  /* uuid Combo */
  const [IdCombo, setIdCombo] = useState("");

  /**
   * Función para controlar la vista previa del combo.
   * @param {Object} producto - Producto a agregar o editar en la vista previa del combo.
   * @param {number} cantidad - Cantidad del producto a agregar o editar.
   * @param {boolean} comboPrincipal - Indica si el producto es el combo principal.
   * @param {boolean} edit - Indica si se está editando un producto existente en la vista previa.
   */

  const handleUpdateAlas = (producto, cantidad, comboPrincipal) => {
    const Alas = filterCategory(categoriaAlas, previewCombo);
    const maxAlas = Alas ? Alas.length : 0;
    const maxSalsas = combo[0].cantidad_alas === 4 ? 1 : 2;

    if (maxAlas < maxSalsas) {
      handleUpdateUniqueCombo(producto, cantidad, comboPrincipal);
    } else {
      const message = `¡Solo ${maxSalsas} salsa para tus alas!😬`;

      toast.warning(message);
    }
  };

  // Función para manejar la edición de un producto en el combo

  const handleEditProducto = (producto, cantidad, comboPrincipal) => {
    const updatedCombo = previewCombo.map((item) =>
      item.id === producto.id ? { ...producto, cantidad, comboPrincipal } : item
    );
    setPreviewCombo(updatedCombo);
  };

  // Función para agregar un producto al combo

  const handleAddJustCombo = (
    producto,
    cantidad,
    comboPrincipal,
    categoria
  ) => {
    const filterCombo = previewCombo.filter(
      (item) => item.categoria_id !== categoria
    );
    setPreviewCombo([
      ...filterCombo,
      { ...producto, cantidad, comboPrincipal },
    ]);
  };

  // Función para actualizar el combo

  const handleUpdatePreviewCombo = (producto, cantidad, comboPrincipal) => {
    if (previewCombo.some((option) => option.id === producto.id)) {
      const combosActualizados = previewCombo.map((option) =>
        option.id === producto.id
          ? { ...option, cantidad: option.cantidad + cantidad, comboPrincipal }
          : option
      );
      setPreviewCombo(combosActualizados);
    } else {
      setPreviewCombo([
        ...previewCombo,
        { ...producto, cantidad, comboPrincipal },
      ]);
    }
  };

  // Funcion para actualizar un combo Unico
  const handleUpdateUniqueCombo = (producto, cantidad, comboPrincipal) => {
    const existingProductIndex = previewCombo.findIndex(
      (option) => option.id === producto.id
    );

    if (existingProductIndex !== -1) {
      const updatedCombos = [...previewCombo];
      updatedCombos[existingProductIndex] = {
        ...producto,
        cantidad,
        comboPrincipal,
      };
      setPreviewCombo(updatedCombos);
    } else {
      setPreviewCombo([
        ...previewCombo,
        { ...producto, cantidad, comboPrincipal },
      ]);
    }
  };

  // Función principal para manejar la vista previa del combo */

  const handleSetpreview = (producto, cantidad, comboPrincipal, edit) => {
    if (edit) {
      handleEditProducto(producto, cantidad, comboPrincipal);
    } else {
      if (producto.categoria_id === categoriaPapas) {
        handleAddJustCombo(producto, cantidad, comboPrincipal, categoriaPapas);
      } else if (producto.categoria_id === categoriaAlas) {
        handleUpdateAlas(producto, cantidad, comboPrincipal);
      } else if (producto.categoria_id === categoriaSalsas) {
        handleUpdateUniqueCombo(producto, cantidad, comboPrincipal);
      } else {
        handleUpdatePreviewCombo(producto, cantidad, comboPrincipal);
      }
    }
  };

  return {
    previewCombo,
    setPreviewCombo,
    combo,
    setCombo,
    totalCombo,
    setTotalCombo,
    salsas,
    setSalsas,
    totalSalsa,
    setTotalSalsa,
    cantidadSalsa,
    setCantidadSalsa,
    bebidas,
    setBebidas,
    totalBebidas,
    setTotalBebidas,
    salsasAlas,
    setSalsasAlas,
    papas,
    setPapas,
    totalAdicion,
    setTotalAdicion,
    adiciones,
    setAdiciones,
    totalPreview,
    setTotalPreview,
    totalEnvio,
    setTotalEnvio,
    stateEnvio,
    setStateEnvio,
    comentario,
    setComentario,
    duplicateCombo,
    setDuplicateCombo,
    IdCombo,
    setIdCombo,
    handleSetpreview,
  };
};

export default useComboState;
