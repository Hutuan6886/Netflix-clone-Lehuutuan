import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    //todo: Kiểm tra user login
    await serverAuth(req);
    const { movieId } = req.query; //*: trong nextjs api, nếu định nghĩa route name là [movieId].ts thì giá trị của movieId ở giữa 2 square brackets sẽ được truy suất bằng const {movieId} = req.query

    //todo: Kiểm tra movieId có hay không
    if (!movieId) {
      throw new Error("movieId is not exist");
    }

    //todo: Kiểm tra type of movieId có là string hay không
    if (typeof movieId !== "string") {
      throw new Error("movieId is invalid");
    }

    /* //todo: GET Movie----------------------------------------------------- */
    //todo: Get movie ứng với movieId
    const movie = await PrismaDb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    //todo: kiểm tra movie sau khi get ra có tồn tại không
    if (!movie) {
      throw new Error("The movie is not exist");
    }

    return res.status(200).json(movie); //* return movie ứng với movieId
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
