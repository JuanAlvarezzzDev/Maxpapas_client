import { createContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  useSearch,
  useCategory,
  usePedido,
  useProduct,
  useCombo,
} from "../store";
import { useModal } from "../hooks/useModal";


const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const { handleChangeBusqueda, busqueda } = useSearch();


  const { categorias, categoriaActual, handleClickCategoria, setCategoriaActual } =
    useCategory();


  /*----------Modales---------------------*/
  const [editModal, editToggleModal] = useModal();
  const [ComboModal, comboToggleModal] = useModal();
  const [quickModal, quickToggleModal] = useModal();

  /*----------Context Producto -----------------*/

  const {
    producto,
    listProductos,
    handleClickProductoAgotado,
    handleSetProducto,
    obtenerProductoId,
  } = useProduct();

  /*------------Context Combo---------------*/

const {
  comentario, 
  setComentario,    
  handleSetpreview,
  previewCombo,
  salsas,
  bebidas,
  adiciones,
  papas,
  combo,
  totalSalsa,
  setTotalEnvio,
  totalEnvio,
  totalBebidas,
  totalAdicion,
  cantidadSalsa,
  totalPreview,
  handleSetEnvio,
  salsasAlas,
  totalCombo,
  handleEliminarProducto,
  handleEliminarSection,
  setStateEnvio,
  setIdCombo,
  setDuplicateCombo,
  formatJson,
  setPreviewCombo,
  formatProductPreview,
  handleDuplicate,
  duplicateCombo,
  handleEliminarCombo,
  handleEditCombo,
  checkProductInPreview,
  checkQuantityInProducto,
  stateEnvio } = useCombo();

  /*--------contexto Pedido-------------*/

  const {
    pedido,
    pedidoFinal,
    setPedido,
    setNameCliente,
    nameCliente,
    total,
    handleSubmitNuevaOrden,
    pedidoEdit,
    handleSetProductoEdit,
    ClearProductoEdit,

  } = usePedido();

  const cleanCombo = ()=>{
    setPreviewCombo([]);
    setDuplicateCombo([]);
    setComentario('')
    setStateEnvio(false);
    setTotalEnvio(0);
    setIdCombo('')
  }
  

  const agregarCombo = () => {
    let newPedido = [];
    if (duplicateCombo.length === 0) {
      newPedido = [formatJson()];
    } else {
      newPedido = duplicateCombo;
    }
    setPedido(pedido.concat(newPedido));
    cleanCombo();
  };

 const addOrder = (producto, cantidad) => {
   let newPedido = [];

   if (Object.keys(producto).length !== 0) {
     newPedido = [
       {
         uuid: uuidv4(),
         total: (producto?.precio * cantidad),
         stateEnvio: false,
         totalEnvio: 0,
         combo: [{...producto, cantidad}],
         comentario: "",
         detalles: {
          salsas: [],
          salsasAlas: [],
          papas: [],
          adiciones: [],
          bebidas: []
         }
       },
     ];
   }
   setPedido(pedido.concat(newPedido));
 };

  const handleEliminarPedido = (uuid) => {
    const productosfiltrados = pedido.filter(
      (combo) => combo.uuid !== uuid
    );
    setPedido(productosfiltrados);
  };
  const passDataPreview = (producto) => {
    setPreviewCombo(formatProductPreview(producto));
    setStateEnvio(producto.stateEnvio);
    setIdCombo(producto.uuid)
    setTotalEnvio(producto.totalEnvio);
    setComentario(producto.comentario)
  };
  

  return (
    <QuioscoContext.Provider
      value={{
        addOrder,
        agregarCombo,
        setPreviewCombo,
        handleDuplicate,
        duplicateCombo,
        setStateEnvio,
        cleanCombo,
        checkProductInPreview,
        checkQuantityInProducto,
        handleEliminarSection,
        handleEliminarProducto,
        handleEliminarCombo,
        handleEditCombo,
        handleSetpreview,
        passDataPreview,
        comentario, 
        setComentario,
        previewCombo,
        salsas,
        bebidas,
        adiciones,
        papas,
        combo,
        totalSalsa,
        setTotalEnvio,
        totalEnvio,
        totalBebidas,
        totalAdicion,
        cantidadSalsa,
        totalCombo,
        salsasAlas,
        totalPreview,
        handleSetEnvio,
        stateEnvio,
        categorias,
        categoriaActual,
        handleClickCategoria,
        setCategoriaActual,
        editModal, 
        editToggleModal,
        ComboModal,
        comboToggleModal,
        quickModal, 
        quickToggleModal,
        producto,
        listProductos,
        obtenerProductoId,
        handleSetProducto,
        pedido,
        pedidoFinal,
        pedidoEdit,
        ClearProductoEdit,
        handleSetProductoEdit,
        setNameCliente,
        nameCliente,
        handleEliminarPedido,
        total,
        handleSubmitNuevaOrden,
        handleClickProductoAgotado,
        handleChangeBusqueda,
        busqueda
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };
export default QuioscoContext;
