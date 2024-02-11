import { PrismaClient } from "@prisma/client";

declare global {
  //todo: có thể tạo riêng declare global này qua 1 file riêng đặt tên là 'global.d.ts' tại thư mục ngoài cùng của project
  //todo: Để khai báo prismadb is type of PrismaClient thuộc global which is type of globalThis
  namespace globalThis {
    var prismadb: PrismaClient;
  }
}

//todo: Phải tạo file này bởi vì cơ chế Hot Preloading của nextjs, code bị thay đổi, update thì sẽ rerun
const client = global.prismadb || new PrismaClient(); //* Tạo client là 1 đối tượng instance của new PrismaClient(), nghĩa là client tương tự như 1 PrismaService, sử dụng để tương tác với Mongodb Atlas
if (process.env.NODE_ENV !== "production") {
  global.prismadb = client;
}

export default client;
