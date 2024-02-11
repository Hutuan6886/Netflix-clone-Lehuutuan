import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  try {
    const { currentUser, ratingStars, movieId } = req.body;
    if (ratingStars === "0") {
      throw new Error("Rating is invalid");
    }

    //todo: create rating model (schema rating model có stars và userId cần được gán vào)
    const currentRating = await PrismaDb.rating.create({
      data: {
        stars: ratingStars,
        userId: currentUser.id,
        movieId,
      },
    });

    return res.status(200).json(currentRating); //* return the rating model
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
