import useCurrentUser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";

//todo: Tạo protect client cho profiles tương tự như home page
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Profiles = () => {
  //todo: sử dụng useCurrentUser hook để Get dataUser để gán vào profiles
  const { data: user } = useCurrentUser();
  //todo: sử dụng useRouter hook để click vào profile sẽ redirect qua Home
  const router = useRouter();

  return (
    <div className="h-full flex justify-center items-center">
      {/* //* 'h-full flex justify-center items-center' để Căn giữa bố cục */}
      <div className="flex flex-col">
        {/* //* flex-col là 1 cột nhiều hàng */}
        <h2 className="text-white font-semibold text-3xl text-center">
          Chọn tài khoản truy cập ?
        </h2>
        <div className="flex flex-row justify-around text-center mt-4">
          <div
            className="w-24 group"
            onClick={() => {
              router.push(`/`);
            }}
          >
            {/* //* class group để các element trong group đó được đồng bộ với nhau, ví dụ như khi hover */}
            <img
              src="/images/default-blue.png"
              alt="profile-blue"
              className="
              rounded-md 
              border-2 border-transparent
              group-hover:cursor-pointer group-hover:border-white duration-300"
            />
            <p
              className="text-gray-400 text-lg 
            group-hover:text-white group-hover:cursor-pointer duration-300"
            >
              {user?.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profiles;
