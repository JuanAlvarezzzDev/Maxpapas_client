import React from "react";
import { MdAdminPanelSettings } from "react-icons/md";

const ButtonAdminPanel = () => {
  const enterPanelAdmin = (e) => {
    e.preventDefault();
    window.open("/#/admin/", "_blank");
  };

  return (
    <div
      onClick={enterPanelAdmin}
      className="cursor-pointer bg-orange-500 px-5 py-2 rounded uppercase font-bold w-fit text-white text-lg flex justify-center items-center gap-2 hover:bg-orange-600 transition-colors"
    >
      <MdAdminPanelSettings size={30} />
      <p>Panel Admin</p>
    </div>
  );
};

export default ButtonAdminPanel;

