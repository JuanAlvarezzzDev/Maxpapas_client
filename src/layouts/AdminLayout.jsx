import { Link, Outlet } from "react-router-dom";
import { AdminSidebar } from "../components/Admin/AdminSidebar";

export default function AdminLayout() {
  return (
    <>
      <div className=" hidden md:flex">
        <AdminSidebar />
        <main className="flex-1 h-screen overflow-y-scroll bg-white p-3">
          <Outlet />
        </main>
      </div>
      <div className="md:hidden w-full h-screen grid place-content-center bg-gray-100 p-6">
        <div className="text-center">
          <h1 className="font-bold text-5xl mb-7">¡Atención!</h1>
          <p className="mb-10 text-xl text-gray-700 w-full text-pretty ">
            ¡Ups! Parece que estás intentando acceder al panel de administración
            desde un dispositivo móvil. Por el momento, esta funcionalidad no
            está disponible en versiones móviles.
          </p>
          <Link
            to="/"
            className="w-full text-2xl cursor-pointer font-bold uppercase bg-primary text-white py-5 px-10  rounded hover:bg-orange-500 transition duration-300"
          >
            Ir a la tienda
          </Link>
        </div>
      </div>
    </>
  );
}
