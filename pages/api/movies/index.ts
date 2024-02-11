import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "../../../lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    await serverAuth(req);
    const movieData = await PrismaDb.movie.findMany();
    return res.status(200).json(movieData);   //* retrun list tất cả movie trong db
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
