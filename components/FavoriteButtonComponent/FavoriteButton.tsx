import React, { useCallback, useMemo } from "react";
import { FavoriteButtonProps } from "./FavoriteButtonPropsInterface";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import useFavorite from "@/hooks/useFavorite";
/* //: useMemo là hàm giống như helper cho phép chỉ định: lưu lại kết quả của hàm nào và những giá trị nào sẽ làm thay đổi kết quả đó.
useMemo tập trung vào việc tránh lặp đi lặp lại các logic tính toán nặng nề.
Cụ thể, nó trả về một giá trị (là kết quả trả về từ việc thực thi, chạy hàm fn mà bạn pass vào ứng với tham số thứ nhất).
Nếu một trong số các dependencies thay đổi, thì hàm tính toán sẽ được thực thi lại, từ đó trả ra giá trị mới. Ngược lại, nếu nhận thấy giá trị của các dependencies kia không đổi, thì ngay lập tức useMemo trả ra kết quả trước đó mà không hề tính toán lại, từ đó tránh được một khối lượng lớn công việc, giúp ích cho performance. */

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ movieId }) => {
  //todo: movieId nhận vào sẽ thực hiện POST hoặc DELETE req API để update favoriteList

  //todo: Kiểm tra movieId đã tồn tại ở trong favoriteIdMovie[] của currentUser k, nếu k thì return false(để thực hiện POST req), nếu rồi thì return true(để thực hiện DELETE req)
  const { data: currentUser, mutate: mutateUser } = useCurrentUser();
  const { mutate: mutateFavoriteMovie } = useFavorite();
  const isFavorite = useMemo(() => {
    //* Lúc đầu dependency movieId được truyền vào isFavorite từ thẻ cha MovieItem => hàm isFavorite thực thi kiểm tra favoriteIdMovie[] của currentUser là rỗng => isFavorite là false và được lưu lại
    //* Khi thực hiện click toggleFavoriteMovie thì hàm toggleFavoriteMovie sẽ thực thi, nhận isFavorite là false thì sẽ thực hiện GET movieId để add movieId vào favoriteIdMovie[] của currentUser
    //* Lúc này, movieId đó nếu có tồn tại trong favoriteIdMovie[] (.includes()) của currentUser thì isFavorite sẽ là true nếu click lại lần thứ 2 => req DELETE thực hiện xoá movieId khỏi favoriteIdMovie[] của currentUser. Nếu click lần thứ 2 qua movieId khác thì isFavorite sẽ bằng false
    return currentUser?.favoriteIdMovie.includes(movieId);
  }, [currentUser, movieId]);

  const toggleFavoriteMovie = useCallback(async () => {
    //todo: Gửi req cho /api/saveFavoriteMovies
    let res;
    if (isFavorite) {
      //   res = await axios({
      //     method: "POST",
      //     url: "/api/saveFavoriteMovies",
      //     data: { movieId },
      //   });
      res = await axios.delete("/api/saveFavoriteMovies", {
        data: {
          movieId,
          currentUser, //* Truyền currentUser để thực hiện logic xoá movieId trong mảng favoriteIdMovie[] của currentUser
        },
      }); //* res sẽ được return của /api/saveFavoriteMovies trả ra user sau khi update, nghĩa là res là user sau khi thực hiện xoá movieId
    } else {
      res = await axios.post("/api/saveFavoriteMovies", {
        movieId,
        currentUser, //* Truyền currentUser để thực hiện logic truyền movieId vào mảng favoriteIdMovie[] của currentUser
      }); //* res sẽ được return của /api/saveFavoriteMovies trả ra user sau khi update, nghĩa là res là user sau khi thực hiện thêm movieId
    }

    //todo: sử dụng mutate để tự động update mục favorite lên front-end mà không cần load page
    const autoUpdateFavorite = res?.data?.favoriteIdMovie; //* gán favoriteIdMovie data res cho mutate của currentUser

    mutateUser({ ...currentUser, favoriteIdMovie: autoUpdateFavorite }); //* mọi thứ của currentUser sẽ gán lại cho mutate của user, chỉ thay đổi favoriteIdMovie của user
    mutateFavoriteMovie(); //* Sau khi thay đổi favoriteIdMovie của user thì luôn Chạy mutateFavoriteMovie() để favorite list sẽ tự động update sau mỗi lần mutateUser(...) có thay đổi
  }, [isFavorite, movieId, currentUser, mutateUser, mutateFavoriteMovie]); //* isFavorite,movieId thay đổi ứng với mỗi movie và mỗi currentUser sẽ làm toggleFavoriteMovie rerun

  const ChangeIconFavorite = isFavorite ? FaHeart : FaRegHeart;
  return (
    <div
      className={`${
        isFavorite ? "text-red-700" : "text-white"
      } cursor-pointer font-bold text-3xl hover:scale-125 transition`}
      onClick={toggleFavoriteMovie}
    >
      <ChangeIconFavorite />
    </div>
  );
};
export default FavoriteButton;
