import useQuisco from "../hooks/useQuiosco";

export default function Categoria({ categoria }) {
  const { handleClickCategoria, categoriaActual, setCategoriaActual  } = useQuisco();
  const {id, nombre } = categoria;

  const categoryActual = categoriaActual.id === id

  return (
    <div
      className={`${
        categoryActual ? "bg-[#ffcc5e9b]" : "bg-transparent"
      } flex items-center gap-3  w-full px-3 py-2 hover:bg-[#ffcc5e32] cursor-pointer `}
      onClick={() =>categoryActual ? setCategoriaActual({}): handleClickCategoria(id)}
    >
      <div className="text-basic capitalize text-pretty tracking-wider cursor-pointer truncate" type="button">
        {nombre}
      </div>
    </div>
  );
}
