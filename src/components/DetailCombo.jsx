import React from "react";
import { cantidadCard} from "../utils/global";
import { ClickCardProducto } from "./ClickCardProducto";
import { CantidadCardProducto } from "./CantidadCardProducto";

const DetailCombo = ({ producto }) => {
  const { card_id } = producto;
  return (
    <>
      {card_id === cantidadCard ? (
        <CantidadCardProducto producto={producto} />
      ) : (
        <ClickCardProducto producto={producto} />
      )}
    </>
  );
};

export default DetailCombo;
