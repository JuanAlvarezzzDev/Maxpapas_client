import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { SidebarItem } from "./SidebarItem";
import SideItem from "./constants/SideItem";

export const AdminSidebar = () => {
  return (
    <Sidebar>
      {SideItem.map((item, key) => (
        <SidebarItem
          key={key}
          icon={item.icon}
          text={item.text}
          enlace={item.enlace}
        />
      ))}
    </Sidebar>
  );
};
