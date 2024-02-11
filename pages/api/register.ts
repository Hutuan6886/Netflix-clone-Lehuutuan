//todo: File Controller /api/register
//todo: Controller này chỉ nhận POST METHOD cho /api/register
import bcrypt from "bcrypt";
import PrismaDb from "../../lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: Chỉ nhận POST METHOD nên sẽ báo lỗi khi không đúng METHOD
  if (req.method !== "POST") {
    return res.status(405).end(); //* 405 Method Not Allowed
  }

  //todo: Nếu nhận đúng METHOD POST
  try {
    //todo: Check xem thông tin user nhận từ client có trùng với một trong những user trong DB hay chưa
    const { name, email, password } = req.body; //* extract các properties của req.body
    const verifyUserExist = await PrismaDb.user.findUnique({
      where: {
        email,
      },
    });
    //todo: Nếu user đã tồn tại
    if (verifyUserExist) {
      return res.status(422).json({ Error: "Email này đã tồn tại!" }); //* 422 Unprocessable Content (The request was well-formed but was unable to be followed due to semantic errors.)
    }
    //todo: Nếu user chưa tồn tại, biến hash password và lưu thông tin user vào DB
    const newUser = await PrismaDb.user.create({
      data: {
        name,
        email,
        hash: await bcrypt.hash(password, 12),
        image: "",
        emailVerify: new Date(),
      },
    });
    return res.status(200).json(newUser); //* 200 OK
  } catch (err) {
    console.log(err);
  }
}
