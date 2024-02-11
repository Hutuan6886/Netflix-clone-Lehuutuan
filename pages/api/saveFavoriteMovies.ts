//todo: Trên front-end Có 1 nút btn favorite thực hiện 2 chứ năng API là thêm và xoá movie đó trở thành favorite hoặc không, vì vậy có 2 phương thức req là POST và DELETE để xoá hoặc thêm bộ phim đó thành yêu thích
import serverAuth from "../../lib/serverAuth";
import { NextApiRequest, NextApiResponse } from "next";
import PrismaDb from "../../lib/prismadb";
import { without } from "lodash";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //todo: POST
    if (req.method === "POST") {
      //todo: lấy giá trị user đang login
      // const currentUser = await serverAuth(req);   // getSession(req) trong serverAuth(req) khi nhận POST method, return session ra null. Trong khi GET method vẫn trả ra session là user bình thường, nên phải lấy thông tin currentUser bằng cách truyền currentUser cùng với movieId từ POST request ở FavoriteButton Component, FavoriteButton Component lấy currentUser từ useCurrentUser hook
      //todo: movieId sẽ được req đưa lên sau khi click btn favorite
      const { movieId, currentUser } = req.body;
      //todo: Kiểm tra xem movieId đó có tồn tại trong Movie list của db hay không, nếu không tồn tại thì throw error
      const isExistMovie = await PrismaDb.movie.findUnique({
        where: {
          id: movieId,
        },
      });
      if (!isExistMovie) {
        throw new Error("Invalid Movie");
      }

      //todo: Nếu movie hợp lệ, thì push movieId đó vào mảng favoriteIdMovie[] của user, sử dụng currentUser để tìm tới user trong db để update
      const user = await PrismaDb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIdMovie: {
            push: movieId,
          },
        },
      });
      return res.status(200).json(user); //* return user sau khi được push thêm  movieId
    }
    //todo: DELETE
    if (req.method === "DELETE") {
      //todo: movieId sẽ được req đưa lên sau khi click btn favorite
      const { movieId, currentUser } = req.body;
      //todo: Kiểm tra xem movieId đó có tồn tại trong Movie list của db hay không, nếu không tồn tại thì throw error
      const isExistMovie = await PrismaDb.movie.findUnique({
        where: { id: movieId },
      });
      if (!isExistMovie) {
        throw new Error("Invalid Movie");
      }

      //todo: Nếu movie hợp lệ, thì xoá movieId đó vào mảng favoriteIdMovie[] của user, sử dụng currentUser để tìm tới user trong db để update
      const updateFavoriteIdMovie = without(
        currentUser?.favoriteIdMovie,
        movieId
      );
      const user = await PrismaDb.user.update({
        where: {
          email: currentUser?.email || "",
        },
        data: {
          favoriteIdMovie: updateFavoriteIdMovie,
        },
      });
      return res.status(200).json(user); //* return user sau khi DELETE movieId đó
    }
    //todo: Nếu không đúng 2 phương thức trên thì return lỗi
    return res.status(405).end();
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
