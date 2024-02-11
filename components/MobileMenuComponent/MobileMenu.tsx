import React from "react";
import NavbarItem from "../NavbarComponent/NavbarItem";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  if (!visible) {
    //* Nếu props visible được truyền vào là flase thì return null
    return null;
  }
  return (
    <div
      className="absolute top-7 left-3 
                w-56 bg-black bg-opacity-80 z-50 rounded-md py-4"
    >
      <div
        className="flex flex-col items-start gap-4"
      >
        <NavbarItem label="Home" />
        <NavbarItem label="Series" />
        <NavbarItem label="Films" />
        <NavbarItem label="New & Popular" />
        <NavbarItem label="My List" />
        <NavbarItem label="Browse by Languages" />
      </div>
    </div>
  );
};
export default MobileMenu;
