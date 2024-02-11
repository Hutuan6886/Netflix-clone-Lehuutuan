import { NavItem } from "./NavItemInterface";
import React from "react";

const NavbarItem: React.FC<NavItem> = ({ label }) => {
  return (
    <div
      className="text-white text-xs md:text-sm
                    px-[15px] lg:px-[20px] 
                    cursor-pointer"
    >
      {label}
    </div>
  );
};
export default NavbarItem;
