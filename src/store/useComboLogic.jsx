import { useEffect } from "react";
import { filterCategory, ReduceCantidad, ReduceTotal } from "../helpers";
import {
  BoomGrangero,
  categoriaAdiciones,
  categoriaAlas,
  categoriaBebidas,
  categoriaPapas,
  categoriaSalsas,
} from "../utils/global";

const useComboLogic = (comboState) => {
  const {
    previewCombo,
    combo,
    setCombo,
    totalCombo,
    setTotalCombo,
    salsas,
    setSalsas,
    totalSalsa,
    setTotalSalsa,
    setCantidadSalsa,
    bebidas,
    setBebidas,
    totalBebidas,
    setTotalBebidas,
    papas,
    setPapas,
    totalAdicion,
    setTotalAdicion,
    setAdiciones,
    setTotalPreview,
    totalEnvio,
    setSalsasAlas,
  } = comboState;

  const handleCombo = () => {
    // Lógica para manejar el combo
    const combo = previewCombo.filter((item) => item.comboPrincipal === true);
    setCombo(combo);
    const comboTotal = combo[0]?.precio ?? 0;
    setTotalCombo(comboTotal);
  };

  const handleSalsa = () => {
    // Lógica para manejar las salsas
    const salsas = filterCategory(categoriaSalsas, previewCombo);
    const sumaCantidadSalsas = ReduceCantidad(salsas);
    setCantidadSalsa(sumaCantidadSalsas);
    let totalSalsa = 0;
    const maxSalsas = combo[0]?.cantidad_salsas

    if (sumaCantidadSalsas > maxSalsas) {
      const salsaExtra = sumaCantidadSalsas - maxSalsas;
      const precioSalsa = salsas[0].precio;
      totalSalsa = precioSalsa * salsaExtra;
    }

    setSalsas(salsas);
    setTotalSalsa(totalSalsa);
  };

  const handleAdiciones = () => {
    // Lógica para manejar las adiciones
    const adiciones = filterCategory(categoriaAdiciones, previewCombo);
    const adicionTotal = ReduceTotal(adiciones);
    setAdiciones(adiciones);
    setTotalAdicion(adicionTotal);
  };

  const handleBebidas = () => {
    // Lógica para manejar las bebidas
    const bebidas = filterCategory(categoriaBebidas, previewCombo);
    const bebidaTotal = ReduceTotal(bebidas);
    setTotalBebidas(bebidaTotal);
    setBebidas(bebidas);
  };

  const handlePapas = () => {
    // Lógica para manejar las papas
    const papas = filterCategory(categoriaPapas, previewCombo);
    setPapas(papas);
  };

  const handleAlas = () => {
    const alas = filterCategory(categoriaAlas, previewCombo);
    setSalsasAlas(alas); // Actualizamos el estado con el array modificado
  }
  

  useEffect(() => {
    handleCombo();
    handleSalsa();
    handleAdiciones();
    handleBebidas();
    handlePapas();
    handleAlas();
  }, [previewCombo]);

  useEffect(() => {
    let cantidadCombo = combo[0]?.cantidad ?? 0;
    const totalGeneral =
      (totalSalsa + totalAdicion + totalBebidas + totalCombo + totalEnvio) *
      cantidadCombo;
    setTotalPreview(totalGeneral);
  }, [combo, papas, salsas, bebidas, totalEnvio]);
};

export default useComboLogic;
