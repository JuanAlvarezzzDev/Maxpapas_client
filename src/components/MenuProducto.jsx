import useQuisco from "../hooks/useQuiosco";
import Categoria from "./Categoria";
import { useAuth } from "../hooks/useAuth";

export const MenuProducto = () => {
  const {categorias} = useQuisco();
  const { logout } = useAuth({ middleware: "auth" });

  return (
    <div>
      <div className=" w-full mb-2">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="w-full">
        <button
          type="button"
          className=" bg-black text-white w-full p-3 uppercase font-bold text-center rounded-md "
          onClick={logout}
        >
          Cerrar Sesion
        </button>
      </div>
    </div>
  );
};
