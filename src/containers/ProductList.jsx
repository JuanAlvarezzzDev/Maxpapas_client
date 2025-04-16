import React, { useEffect, useState } from "react";
import useQuisco from "../hooks/useQuiosco";
import { useAuth } from "../hooks/useAuth";
import { LuMenuSquare } from "react-icons/lu";
import { MenuProducto } from "../components/MenuProducto";
import { ImUserPlus } from "react-icons/im";
import Producto from "../components/Producto";
import SearchBar from "../components/SearchBar";
import { FaSearch } from "react-icons/fa";
import CustomModal from "../components/UI/CustomModal";
import ButtonAdminPanel from "../components/UI/ButtonAdminPanel";

const ProductList = ({ products }) => {
  const {
    busqueda,
    handleChangeBusqueda,
    nameCliente,
    setNameCliente,
    cleanCombo,
  } = useQuisco();
  const [searchView, setSearchView] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showClient, setShowClient] = useState(false);
  const { user } = useAuth({ middleware: "auth" });

  function closeModal() {
    setShowClient(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };
  useEffect(() => {
    return () => {
      cleanCombo();
    };
  }, []);

  return (
    <>
      <header className="h-[10%] bg-primary flex items-center justify-between w-full px-3">
        <div className=" hidden md:block md:w-1/2 text-start">
          {user?.admin ? (
            <ButtonAdminPanel />
          ) : (
            <h3 className="text-white font-black text-xl">
              ¡Max {user?.name}!
            </h3>
          )}
        </div>
        <div className="md:w-1/2 w-full flex items-center justify-end gap-4 text-white cursor-pointer">
          <div
            className="flex text-center items-center gap-4"
            onClick={() => {
              setShowClient(true);
            }}
          >
            <span className="text-2xl">{nameCliente}</span>
            <ImUserPlus className="text-4xl font-black " />
          </div>

          <FaSearch
            onClick={() => {
              setSearchView(!searchView);
            }}
            className={`text-4xl font-black cursor-pointer  ${
              searchView ? "text-orange-200" : "text-white"
            }`}
          />
          <LuMenuSquare
            onClick={() => setShowSidebar(!showSidebar)}
            className={`text-4xl font-black cursor-pointer  ${
              showSidebar ? "text-orange-200" : "text-white"
            }`}
          />
        </div>
        <div
          className={`absolute top-0 right-0 h-full w-full z-50 bg-zinc-700/60 ${
            showSidebar ? "block" : "hidden"
          }`}
        >
          <div className="bg-white z-[100] p-3 absolute top-20 md:top-12 right-2 aspect-square w-48 rounded-lg shadow-lg  flex flex-col items-center justify-center gap-5">
            <MenuProducto />
          </div>
          <div
            className=" w-full h-full"
            onClick={() => {
              setShowSidebar(false);
            }}
          ></div>
        </div>
      </header>
      <div
        className={`w-full bg-white z-40 absolute ${
          searchView ? "block" : "hidden"
        }`}
      >
        <SearchBar value={busqueda} changeInput={handleChangeBusqueda} />
      </div>

      <section className="overflow-scroll h-[90%] scrollbar p-1">
        <div className="p-5 overflow-y-scroll scrollbar grid gap-4 grid-cols-2 md:grid-cols-3 auto-rows-max">
          {products.map((producto) => (
            <Producto key={producto.imagen} producto={producto} />
          ))}
        </div>
      </section>
      <CustomModal isOpen={showClient} onRequestClose={closeModal}>
        <form
          onSubmit={handleSubmit}
          className="text-black flex w-full flex-col gap-5 items-center"
        >
          <label htmlFor="setNameCliente">Cambia el nombre del cliente</label>
          <input
            type="text"
            id="setNameCliente"
            name="setNameCliente"
            value={nameCliente}
            onChange={(e) => setNameCliente(e.target.value)}
            required
            className="block w-full px-2 py-2 mt-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 focus:ring focus:ring-orange-200"
            maxLength={15}
          />

          <button
            className=" bg-black px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            type="submit"
          >
            Guardar Nombre
          </button>
        </form>
      </CustomModal>
    </>
  );
};

export default ProductList;
