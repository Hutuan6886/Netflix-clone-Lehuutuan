import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "@/lib/prismadb";

export default async function hanlder(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const { movieId } = req.query as any;

    await serverAuth(req);

    //todo: lấy toàn bộ rating model có movieId trùng với movieId được trích suất từ query
    const ratingModelArray = await PrismaDb?.rating.findMany({
      where: {
        movieId,
      },
    });

    const ratingModelNumbers = ratingModelArray?.length;
    //todo: Sau khi có mảng các model rating thì lấy ra thuộc tính stars của từng rating model để push vào chung 1 mảng, và tính trung bình giá trị của các thuộc thính stars lại bằng reduce() method
    const totalRating = ratingModelArray
      ?.map((ratingModel: any) => {
        return ratingModel?.stars;
      })
      ?.reduce((total: number, currentValue: number) => {
        return total + currentValue;
      });

    const tbRating10 = totalRating / ratingModelNumbers; //*thang điểm 10
    const ratingScore = parseInt(((tbRating10 * 5) / 10).toFixed(1)); //* Đổi về thang điểm 5 và Làm tròn sau dấu phẩi 1 chữ số, toFixed() mặc định trả về string nêm phải parseInt để ép string sang number

    return res.status(200).json({ ratingModelArray, ratingScore }); //* Mảng chứa các model rating của movieId này
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
