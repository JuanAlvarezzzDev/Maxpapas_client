import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";

export function SidebarItem({ icon, text, enlace }) {
  const { expanded, active, handleClickSideItem } = useAdmin();

  return (
    <Link
      to={enlace}
      onClick={() => {
        handleClickSideItem(text);
      }}
      className={`
          relative flex items-center py-2 px-3 my-4
          font-medium  rounded-md cursor-pointer
          transition-colors group
          ${
            active === text
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
      `}
    >
      {icon}

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            z-[10000]
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
        `}
        >
          {text}
        </div>
      )}
    </Link>
  );
}
