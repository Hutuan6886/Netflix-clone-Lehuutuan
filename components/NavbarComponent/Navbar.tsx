import NavbarItem from "./NavbarItem";

import { IoSearchSharp } from "react-icons/io5";
import { TbBellRingingFilled } from "react-icons/tb";
import { IoChevronDown } from "react-icons/io5";
import { useCallback, useEffect, useState } from "react";
import MobileMenu from "../MobileMenuComponent/MobileMenu";
import AccountMenu from "../AccountMenuComponent/AccountMenu";
import Image from "next/image";

//todo: Cách tạo background Navbar từ transparent đổi sang đen trong suốt sau khi scrolldown( Tạo giá trị TOP_OFFSET -> Tạo useEffect sự kiện handlerScroll để thay thế vào sự kiện scroll của window -> handlerScroll sẽ set cho backgroundNavbarScroll true hoặc false sẽ ứng với className được gắn vào Navbar)
const TOP_OFFSET = 20; //* 20 là giá trị animation bắt đầu chuyển động

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [backgroundNavbarScroll, setBackgroundNavbarScroll] = useState(false);

  const toggleShowMobileMenu = useCallback(
    () => setShowMobileMenu((current) => !current),
    []
  );
  const toggleShowAccountMenu = useCallback(
    () => setShowAccountMenu((current) => !current),
    []
  );

  useEffect(() => {
    const handlerScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setBackgroundNavbarScroll(true);
      } else {
        setBackgroundNavbarScroll(false);
      }
    };

    //todo: Kết nối handlerScroll vào sự kiện scroll của window
    window.addEventListener("scroll", handlerScroll);
    //todo: Ngắt kết nối với sự kiện đó
    return () => {
      window.addEventListener("scroll", handlerScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed z-20 w-full flex flex-row justify-start items-center transition ${
        backgroundNavbarScroll ? "bg-zinc-900 bg-opacity-80" : null
      }`}
    >
      <div
        className="px-4 py-4 lg:px-9 
        flex flex-row items-center 
        transition duration-500
        overflow-hidden"
      >
        <Image
          src="/images/logo.png"
          sizes="100vw"
          width={0}
          height={0}
          alt="logo"
          className=" w-full h-5 md:h-7"
        />
      </div>
      <div className="hidden md:flex flex-row justify-left items-center">
        {/* //* nhỏ hơn md screen thì hidden, và screen lớn hơn md thì hiện và sử dụng flex */}
        <NavbarItem label="Home" />
        <NavbarItem label="Series" />
        <NavbarItem label="Films" />
        <NavbarItem label="New & Popular" />
        <NavbarItem label="My List" />
        <NavbarItem label="Browse by Languages" />
      </div>
      <div
        className="relative
        cursor-pointer
        text-white text-sm 
       px-[15px] lg:px-[20px] 
       flex flex-row justify-center items-center gap-1 md:hidden"
        onClick={toggleShowMobileMenu}
      >
        <p>Browse</p>
        <IoChevronDown
          /* //* transition để chuyển động quay rotate sẽ mượt hơn */
          className={`transition ${!showMobileMenu ? "rotate-180" : null}`}
        />
        <MobileMenu visible={showMobileMenu} />
      </div>
      <div
        className="flex flex-row justify-center items-center gap-4 lg:gap-8 
                    ml-auto
                    px-5 lg:px-9"
      >
        <div className="text-white lg:text-xl cursor-pointer">
          <IoSearchSharp />
        </div>
        <div className="text-white lg:text-xl cursor-pointer">
          <TbBellRingingFilled />
        </div>
        <div
          className="cursor-pointer relative
                        flex flex-row justify-center items-center"
          onClick={toggleShowAccountMenu}
        >
          <Image
            src="/images/default-blue.png"
            alt="default-blue.png"
            sizes="100vw"
            width={0}
            height={0}
            className="rounded-md w-6 lg:w-8"
          />
          <IoChevronDown
            className={`text-white text-sm lg:text-md transition ${
              !showAccountMenu ? "rotate-180" : null
            }`}
          />
          <AccountMenu visible={showAccountMenu} />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
