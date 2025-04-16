import { IoFileTrayFull } from "react-icons/io5";
import { IoFastFoodSharp } from "react-icons/io5";
import { FaDumpsterFire } from "react-icons/fa";
import { MdStickyNote2 } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";

const SideItem = [
  {
    icon: <IoFileTrayFull size={25} />,
    text: "Recibidos",
    enlace: "/admin",
  },
  {
    icon: <MdStickyNote2 size={25} />,
    text: "Pedidos",
    enlace: "/admin/pedidos",
  },
  {
    icon: <IoFastFoodSharp size={25} />,
    text: "Productos",
    enlace: "/admin/productos",
  },
  {
    icon: <AiFillDashboard size={25} />,
    text: "Dashboard",
    enlace: "/admin/dashboard",
  },
];

export default SideItem