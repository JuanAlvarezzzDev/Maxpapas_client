import { v4 as uuidv4 } from "uuid";
const useComboActions = (comboState) => {
  const {
    previewCombo,
    setPreviewCombo,
    combo,
    salsas,
    salsasAlas,
    bebidas,
    papas,
    adiciones,
    totalPreview,
    totalEnvio,
    setTotalEnvio,
    stateEnvio,
    setStateEnvio,
    comentario,
    setComentario,
    duplicateCombo,
    setDuplicateCombo,
    IdCombo,
  } = comboState;

  const formatJson = () => {
    // Lógica para formatear el JSON
    return {
      uuid: IdCombo || uuidv4(),
      total: totalPreview,
      stateEnvio,
      totalEnvio,
      combo,
      comentario,
      detalles: {
        salsas,
        salsasAlas,
        papas,
        adiciones,
        bebidas,
      },
    };
  };

  const formatProductPreview = (formatJson) => {
    // Lógica para formatear la vista previa del producto
    return Object.values(formatJson.detalles)
      .flat()
      .concat(Object.values(formatJson.combo));
  };

  const handleDuplicate = () => {
    // Lógica para manejar duplicados
    let duplicate = formatJson();
    setDuplicateCombo([...duplicateCombo, duplicate]);
  };

  const handleSetEnvio = (state) => {
    setStateEnvio(state);
  };

  const handleEliminarProducto = (id) => {
    const productosFiltrados = previewCombo.filter((item) => item.id !== id);
    setPreviewCombo(productosFiltrados);
  };

  const handleEliminarSection = (categoria_id) => {
    const productosFiltrados = previewCombo.filter(
      (item) => item.categoria_id !== categoria_id
    );
    setPreviewCombo(productosFiltrados);
  };

  const handleEliminarCombo = (uuid) => {
    const productosfiltrados = duplicateCombo.filter(
      (combo) => combo.uuid !== uuid
    );
    setDuplicateCombo(productosfiltrados);
  };
  const handleEditCombo = (producto) => {
    handleEliminarCombo(producto.uuid);
    setPreviewCombo(formatProductPreview(producto));
    setStateEnvio(producto.stateEnvio);
    setTotalEnvio(producto.totalEnvio);
    setComentario(producto.comentario);
  };

  const checkProductInPreview = (producto) => {
    return previewCombo.some((item) => item.id === producto.id);
  };

  const checkQuantityInProducto = (producto) => {
    const combo = previewCombo.filter((item) => item.id === producto.id);
    const cantidad = combo[0]?.cantidad ?? null;
    return cantidad;
  };

  return {
    formatJson,
    formatProductPreview,
    handleDuplicate,
    handleSetEnvio,
    handleEliminarProducto,
    handleEliminarSection,
    handleEliminarCombo,
    handleEditCombo,
    checkProductInPreview,
    checkQuantityInProducto
  };
};

export default useComboActions;
