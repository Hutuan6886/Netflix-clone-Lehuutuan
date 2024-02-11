import React from "react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data: user } = useCurrentUser();
  if (!visible) {
    return null;
  }
  return (
    <div
      className="bg-black bg-opacity-80  z-50
                    absolute top-9 right-0
                    w-32
                    rounded-md
                    flex flex-col items-start gap-4
                    border-2 border-gray-600"
    >
      <div className="text-white flex flex-row items-center gap-2 pt-3 pl-3">
        <img
          src="/images/default-blue.png"
          alt="default-blue"
          className="w-5 rounded-md"
        />
        <p className="hover:underline text-xs lg:text-sm">{user?.name}</p>
      </div>
      <hr className="border-0 bg-gray-600 w-full h-px" />
      <div
        className="text-white text-xs lg:text-sm flex flex-row items-center gap-2 pb-3 pl-3"
        onClick={() => signOut()}
      >
        <p>Đăng Xuất</p>
        <FiLogOut />
      </div>
    </div>
  );
};
export default AccountMenu;
