import React from "react";
import useQuisco from "../hooks/useQuiosco";
import { formatter, formatearDinero } from "../helpers";
import ButtonDelete from "../components/UI/ButtonDelete";
import { ButtonDouble, ButtonEdit } from "./UI";

const PreviewCombo = () => {
  const {
    totalBebidas,
    handleEliminarSection,
    bebidas,
    totalAdicion,
    adiciones,
    papas,
    salsas,
    totalPreview,
    cantidadSalsa,
    comentario,
    setComentario,
    comboToggleModal,
    handleDuplicate,
    setTotalEnvio,
    pedidoEdit,
    salsasAlas,
    combo,
    previewCombo,
    stateEnvio,
    setStateEnvio,
  } = useQuisco();

  const isComboValid =
    (combo[0]?.necesita_papas == false && totalPreview > 0) || papas.length > 0;

  const isEditing = Object.keys(pedidoEdit).length === 0;

  return (
    <>
      <div className="p-1">
        <h1 className="text-xl font-black mb-1 text-center">Detalles Combo</h1>
        {previewCombo.length === 0 ? (
          <p className=" text-lg text-center">No hay Detalles del Combo</p>
        ) : (
          <div className="p-2 w-full shadow rounded-sm ">
            <div className="flex gap-2 justify-end mb-2 items-center">
              <div>
                <p className="text-lg font-black">
                  {formatearDinero(totalPreview)}
                </p>
              </div>
              {isComboValid && (
                <>
                  {isEditing && (
                    <ButtonDouble
                      onClick={() => {
                        handleDuplicate();
                      }}
                    />
                  )}
                </>
              )}
            </div>
            <div className="grid grid-cols-4 gap-2 ">
              {stateEnvio && (
                <p
                  onClick={() => {
                    setStateEnvio(false);
                    setTotalEnvio(0);
                  }}
                  className=" cursor-pointer w-full bg-red-700 text-white text-center text-basic col-span-5"
                >
                  Para Llevar
                </p>
              )}

              {/*---- Section Combos---- */}
              {combo && (
                <section className="relative shadow p-2 col-span-2">
                  <div className="flex w-full justify-between items-center mb-2 p-1 py-2 border-b border-gray-300 ">
                    <h2 className="text-lg font-black">Combo:</h2>
                    <div className="">
                      <ButtonEdit
                        onClick={() => {
                          comboToggleModal();
                        }}
                      />
                    </div>
                  </div>
                  <p>
                    {combo.map((item, index) => (
                      <span key={index}>
                        <span>{item.cantidad == 1 ? "" : item.cantidad} </span>
                        <span> {item.nombre} </span>
                      </span>
                    ))}
                    {papas.length > 0 && (
                      <span className=" ">
                        {formatter.format(
                          papas.map((item) => item.nombre_corto)
                        )}
                      </span>
                    )}
                  </p>
                </section>
              )}

              {/*---- Section Salsas---- */}

              {cantidadSalsa > 0 && (
                <section className="col-span-2 shadow p-2">
                  <div className="flex w-full justify-between mb-2 items-center p-1 py-2 border-b border-gray-300 ">
                    <h2 className="text-lg font-black">Salsas:</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = salsas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  <p>
                    {formatter.format(
                      salsas.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                  </p>
                </section>
              )}
              {/*---- Section Salsas Alas---- */}

              {salsasAlas.length > 0 && (
                <section className="col-span-2 shadow p-2">
                  <div className="flex w-full justify-between mb-2 items-center p-1 py-2 border-b border-gray-300 ">
                    <h2 className="text-lg font-black">Salsas Alas:</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = salsasAlas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  <p>
                    {formatter.format(salsasAlas.map((item) => item.nombre))}
                  </p>
                </section>
              )}

               {/*---- Section Bebidas---- */}
               {totalBebidas > 0 && (
                <section className="shadow  p-2 bg-white relative col-span-2">
                  <div className="flex w-full justify-between items-center mb-2 p-1 py-2 border-b border-gray-300 ">
                    <h2 className="text-lg font-black">Bebida:</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = bebidas[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  {formatter.format(
                      bebidas.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                </section>
              )}

              {/*---- Section Adiciones---- */}
              {totalAdicion > 0 && (
                <section className="shadow p-2 bg-white relative col-span-2">
                  <div className="flex w-full justify-between items-center mb-2 p-1 py-2 border-b border-gray-300 ">
                    <h2 className="text-lg font-black">Adiciones:</h2>
                    <div className="">
                      <ButtonDelete
                        onClick={() => {
                          let categoria_id = adiciones[0].categoria_id;
                          handleEliminarSection(categoria_id);
                        }}
                      />
                    </div>
                  </div>
                  {formatter.format(
                      adiciones.map((item) =>
                        item.cantidad > 1
                          ? `${item.cantidad} ${item.nombre}`
                          : item.nombre
                      )
                    )}
                </section>
              )}


              {/*---- Section Comentario---- */}

              {comentario !== "" && (
                <section className={`shadow ${salsasAlas.length > 0 ? "col-span-2" : "col-span-4"}  p-2 bg-white relative`}>
                  <h2 className="text-sm font-black mb-1">Comentario:</h2>
                  <div className="absolute top-0 right-0 m-2">
                    <ButtonDelete
                      onClick={() => {
                        setComentario("");
                      }}
                    />
                  </div>
                  {comentario}
                </section>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PreviewCombo;
