//todo: [...nextauth].ts is an API route that will catch all requests that begin with a certain path. Conveniently, this is called Catch all API routes.
//todo: [..next-auth] là 1 API route để xử lý xác thực người dùng
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import PrismaDb from "../../../lib/prismadb";
import { compare } from "bcrypt";

import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter"; //* add package: npm install @next-auth/prisma-adapter, PrismaAdapter để kết nối NextAuth với PrismaDb

export default NextAuth({
  //todo: Cấu hình các attribute
  adapter: PrismaAdapter(PrismaDb),
  providers: [
    //todo: Cấu hình GithubProvider và GoogleProvider với các variables enviroment
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        //* credentials là biểu mẫu form khi logIn, giá trị credentials chính là giá trị của người dùng nhập vào
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
        console.log("credentials", credentials);

        if (!credentials.email || !credentials.password) {
          //*: đầu tiên sẽ check credentials xem email hay password của credential có bỏ trống hay không. Nếu bỏ trống thì throw error
          throw new Error("Email hoặc Password không được bỏ trống");
        }
        //todo: Nếu có credential.email và credential.password thì sẽ check user trong db có tồn tại hay k, tìm trong db xem có user.email = credential.email, thông qua findUnique. Nếu không có user thì throw err, nếu có thì check password bằg compare của bcrypt
        const user = await PrismaDb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        if (!user) {
          throw new Error("Tài khoản không tồn tại!");
        }
        const isCorrectPassword = await compare(
          //* compare(...) return ra true hoặc false
          credentials.password,
          user?.hash as string
        );

        if (!isCorrectPassword) {
          //todo: return null thì sẽ phải hồi thông báo về client đăng nhập không hợp lệ
          throw new Error("Mật khẩu không đúng!");
        }
        //todo: return đối tượng user thì cho biết đã đăng nhập hợp lệ và lưu user vào web json
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login", //* define login page, /login là login.tsx
  },
  debug: process.env.NODE_ENV === "development", //* Bật chết độ debug on, để trong quá trình code, các err sẽ được log on terminal
  session: {
    strategy: "jwt", //* json web token được authorization trả về client sau mỗi lần client thực hiện login thành công, jwt sau khi trả về sẽ sử dụng để truy cập vào user source
  },
  jwt: {
    secret: process.env.NEXTAUTH_URL_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
