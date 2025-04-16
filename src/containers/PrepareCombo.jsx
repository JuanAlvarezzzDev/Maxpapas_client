import React, { useEffect, useState } from "react";
import { useCantidad } from "../hooks/useCantidad";
import { MdOutlineAddToPhotos } from "react-icons/md";
import { ButtonPlus, ButtonRest, Switch } from "../components/UI";
import useQuisco from "../hooks/useQuiosco";
import { BiSolidCommentEdit } from "react-icons/bi";
import { formatearDinero } from "../helpers";
import SelectionCombo from "../components/SelectionCombo";
import DetailCombo from "../components/DetailCombo";
import CustomModal from "../components/UI/CustomModal";
import { useModal } from "../hooks/useModal";


const PrepareCombo = ({ dataCombo }) => {
  const {
    setTotalEnvio,
    handleSetpreview,
    handleSetEnvio,
    stateEnvio,
    comentario,
    setComentario,
    ComboModal,
    comboToggleModal,
    passDataPreview,
    pedidoEdit
  } = useQuisco();
  const [showComentario, setShowComentario] = useState(false)
  const [option, setOption] = useState([]);
  const [opcionActual, setOpcionActual] = useState({});
  const [cantidad, handleIncrement, handleDecrement] = useCantidad();

  function closeModal() {
    setShowComentario(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const handleClickoption = (id) => {
    const option = dataCombo.options.filter((option) => option.id === id)[0];
    setOpcionActual(option);
    setOption(option.productos);
  };

  const { producto, Empaque, options } = dataCombo || {};

  useEffect(() => {
    const pedidoProduct = pedidoEdit;
    const option = dataCombo.options[0];
    setOpcionActual(option);
    setOption(option.productos);
    if (Object.keys(pedidoProduct).length === 0) {
      handleSetpreview(producto, 1, true, false);
    } else {
      passDataPreview(pedidoProduct);
    }
  }, []);
  return (
    <>
      <header className="h-[10%] bg-primary flex items-center justify-between w-full px-3">
        <div className="w-1/3 md:w-1/2 md:text-left text-center">
          <h3 className="text-white font-black text-xl">{producto.nombre}</h3>
        </div>

        <div className=" w-2/3 md:w-1/2 flex items-center justify-center gap-4">
          <Switch
            checked={stateEnvio}
            onChange={(e) => handleSetEnvio(e.target.checked)}
            onClick={() => {
              const nuevoTotalEnvio = stateEnvio ? 0 : Empaque;
              setTotalEnvio(nuevoTotalEnvio);
            }}
            label={"Para Llevar"}
            viewPrice={Empaque}
          />

          <MdOutlineAddToPhotos
            onClick={() => {
              comboToggleModal();
            }}
            className={`text-4xl font-black cursor-pointer  ${
              ComboModal ? "text-orange-200" : "text-white"
            }`}
          />
          <BiSolidCommentEdit
            onClick={() => {
              setShowComentario(true);
            }}
            className="text-4xl text-white font-black cursor-pointer"
          />
        </div>
      </header>

      <section className="overflow-scroll h-[75%] scrollbar p-1">
        <div className="p-5 overflow-y-scroll scrollbar grid gap-4 grid-cols-2 md:grid-cols-3 auto-rows-max">
          {option.map((producto) => (
            <DetailCombo key={producto.imagen} producto={producto} />
          ))}
        </div>
      </section>

      <footer className="h-[15%] border-t-2 border-gray-900/5 flex items-center justify-center p-1 absolute bottom-0 left-0 right-0 overflow-hidden">
      <div className={`grid gap-2 justify-center ${options.length === 3 ? 'grid-cols-3' : options.length === 4 ? 'grid-cols-4' : 'grid-cols-5'}`}>
          {options.map((option, index) => (
            <SelectionCombo
              opcionActual={opcionActual}
              key={index}
              option={option}
              onClick={() => handleClickoption(option.id)}
            />
          ))}
        </div>
      </footer>

      <CustomModal isOpen={showComentario} onRequestClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="text-black flex w-full flex-col gap-5 items-center"
        >
          <label htmlFor="setComentario">Deja un Comentario...</label>
          <textarea
            id="setComentario"
            name="setComentario"
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            required
            className="block w-full px-2 py-2 mt-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
          />

          <button
            className="bg-black px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            type="submit"
          >
            Guardar Comentario
          </button>
        </form>
      </CustomModal>

      <CustomModal isOpen={ComboModal} onRequestClose={comboToggleModal}>
        <div className="bg-white p-1 w-full flex flex-col items-center justify-center gap-5">
        <h2 className="text-xl font-bold">
           {producto.nombre}
          </h2>

          <div className="flex gap-4 text-3xl">
            <ButtonRest onClick={handleDecrement} />
            <p className="text-black">{cantidad}</p>
            <ButtonPlus onClick={handleIncrement} />
          </div>
          <div
            className=" bg-[#F9AA00] text-white w-full p-3 uppercase font-bold text-center rounded-md cursor-pointer"
            onClick={() => {
              handleSetpreview(producto, cantidad, true, true);
              comboToggleModal();
            }}
          >
            Agregar Combo
          </div>
        </div>
      </CustomModal>
    </>
  );
};

export default PrepareCombo;
