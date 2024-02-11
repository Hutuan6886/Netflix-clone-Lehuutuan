//todo: ramdomMovie.ts để get 1 video từ db hiển thị lên billboard component tại trang chính sau khi người dùng đăng nhập vào
import serverAuth from "../../lib/serverAuth";
import PrismaDb from "../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: Kiểm tra phương thức
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    //todo: Kiểm tra người dùng đăng nhập
    await serverAuth(req); //* Nếu không có user đăng nhập thì sẽ throw err chính bên trong serverAuth

    //todo: Muốn return ra random video thì sử dụng
    // const movieTotal = await PrismaDb.movie.count(); 
    // const indexRandom = Math.floor(Math.random() * movieTotal); //* Math.flor() làm tròn xuống
    // const randomMovie = await PrismaDb.movie.findMany({
    //   take: 1,
    //   skip: indexRandom,
    // });
    // return res.status(200).json(randomMovie[0]);


    const billboardMovie = await PrismaDb.movie.findFirst({
      where: {
        genre: "Billboard",   //* Hiện video của quảng cáo
      },
    });
    return res.status(200).json(billboardMovie);
    
  } catch (error) {
    console.log(error);

    return res.status(400).end();
  }
}
