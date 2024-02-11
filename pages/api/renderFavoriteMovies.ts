//todo: renderFavoriteMovies sử dụng GET req để load toàn bộ favorite movie ở db hiển thị lên front-end

import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    //todo: Check user
    const currentUser = await serverAuth(req);
    //todo: tìm toàn bộ favorite movie của user đó để return ra ngoài
    const favoriteList = await PrismaDb.movie.findMany({
      //* Tìm trong toàn bộ movie của db, lấy ra những movie trong db có id trùng với currentUser?.favoriteIdMovie, để render toàn bộ favoriteMovie của currentUser
      where: {
        id: {
          in: currentUser?.favoriteIdMovie,
        },
      },
    });
    return res.status(200).json(favoriteList);  //* GET favortieMovieList của currentUser
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
