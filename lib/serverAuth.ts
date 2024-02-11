//todo: Để check user login
//todo: serverAuth.ts liến kết với PrismaDb, nhận vào 1 req từ API gửi lên, check xem req từ API gửi lên có được phép truy cập vào user ở server hay không, nếu được phép thì return user đó
import PrismaDb from "./prismadb";
import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";

const serverAuth = async (req: NextApiRequest) => {
  const session = await getSession({ req }); //* getSession() sử dụng các request hoặc các response object param để lấy các thông tin người dùng ở session hiện tại nếu nó tồn tại. getSession() là clientSide
  console.log(`session`, session);

  //todo: Check session hiện tại người dùng phải có email
  if (!session?.user?.email) {
    throw new Error("Không thể đăng nhập!");
  }
  //todo: Check email của session hiện tại có tồn tại trên server hay chưa, nếu chưa thì throw err, nếu tồn tại thì return user
  const currentUser = PrismaDb.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  if (!currentUser) {
    throw new Error("Người dùng không tồn tại!");
  }

  return currentUser;
};
export default serverAuth;
