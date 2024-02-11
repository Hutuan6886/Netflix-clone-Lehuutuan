//todo: getCurrentUser sử dụng để nhận req user từ phương thức GET, sau đó kiểm tra tính hợp lệ và return us về res
import serverAuth from "@/lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    //todo: đưa req GET cho serverAuth kiểm tra, sau đó trả user về res
    const currentUser = await serverAuth(req);

    return res.status(200).json(currentUser);
  } catch (err) {
    return res.status(400).end();
  }
}
