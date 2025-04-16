import React from "react";
import { useAuth } from "../../hooks/useAuth";
import { IoLogOut } from "react-icons/io5";

const ButtonLogout = () => {
  const { logout } = useAuth({ middleware: "auth" });
  return (
    <div className="relative group w-full text-center flex justify-center items-center mt-3">
      <IoLogOut
        size={40}
        className="text-primary cursor-pointer transition-transform group-hover:scale-110"
        onClick={logout}
      />
      <div
        className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 font-bold text-indigo-800 text-sm
          invisible opacity-0 transform -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
      >
        Cerrar Sesión
      </div>
    </div>
  );
};

export default ButtonLogout;
