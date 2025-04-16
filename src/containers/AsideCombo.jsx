import React, { useState } from "react";
import useQuisco from "../hooks/useQuiosco";
import { Link } from "react-router-dom";
import PreviewCombo from "../components/PreviewCombo";
import ResumenCombos from "../components/ResumenCombos";
import ButtonExpand from "../components/UI/ButtonExpand";

const AsideCombo = () => {
  const {
    agregarCombo,
    duplicateCombo,
    handleEliminarCombo,
    handleEditCombo,
    cleanCombo,
    papas,
    pedidoEdit,
    combo,
    totalPreview,
  } = useQuisco();
  const [resumenExpanded, setResumenExpanded] = useState(false);

  const handleExpandResumen = () => {
    setResumenExpanded(!resumenExpanded);
  };

  const isComboValid =
    (combo[0]?.necesita_papas == false && totalPreview > 0) || papas.length > 0;

  return (
    <>
      <section
        className={`overflow-scroll scrollbar ${
          duplicateCombo.length === 0 ? "h-[90%]" : "md:h-[65%] h-[50%]"
        } ${resumenExpanded ? "hidden" : "block"}`}
      >
        <PreviewCombo />
      </section>

      <section
        className={`${
          duplicateCombo.length === 0 ? "hidden" : "block"
        }  relative ${
          resumenExpanded ? "h-[90%] pt-10" : "md:h-[25%] h-[40%]"
        }`}
      >
        <div
          className={`absolute ${
            resumenExpanded ? "top-2" : "top-[-20px]"
          } bg-white border-t-2 border-gray-100  z-1 left-0 w-full flex justify-center items-center`}
        >
          <ButtonExpand
            onClick={() => {
              handleExpandResumen();
            }}
            rotation={resumenExpanded}
          />
        </div>

        <div className="overflow-scroll scrollbar  p-3 h-full pt-5">
          {duplicateCombo.map((producto, key) => (
            <ResumenCombos
              key={key}
              producto={producto}
              Editar={handleEditCombo}
              Eliminar={handleEliminarCombo}
            />
          ))}
        </div>
      </section>

      <footer
        className={` h-[10%] flex items-center justify-around pb-3 px-2 overflow-hidden`}
      >
        {isComboValid && (
          <Link
            to={"/"}
            className="mt-3 bg-black px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            onClick={() => {
              agregarCombo();
              cleanCombo();
            }}
          >
            {duplicateCombo.length === 0
              ? Object.keys(pedidoEdit).length === 0
                ? "Agregar Combo"
                : "Editar Combo"
              : "Agregar Combos"}
          </Link>
        )}
      </footer>
    </>
  );
};

export default AsideCombo;
