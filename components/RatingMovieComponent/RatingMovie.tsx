import useCurrentUser from "@/hooks/useCurrentUser";
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { RatingMovieProps } from "./WriteRatingPropsInterface";
import { IoClose } from "react-icons/io5";
import useOpenRating from "@/hooks/useOpenRating";
import useRating from "@/hooks/useRating";

//todo: props WriteRating nhận vào dataUser để lấy userId và thực hiện post req userId và ratingObject lên model rating ở server
const RatingMovie: React.FC<RatingMovieProps> = ({ movieId, visible }) => {
  const { data: currentUser } = useCurrentUser();
  const [ratingStars, setRatingStars] = useState(0);
  const [hoverStars, setHoverStars] = useState(0);

  const [isVisible, setIsVisible] = useState(!!visible); //* Trạng thái state isVisible để tạo hiệu ứng thu phóng cho component RatingMovie
  const { closeRating } = useOpenRating();
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);

  //todo: Để làm ẩn đi mục đánh giá khi user đó đã đánh giá bộ phim này rồi, thì lấy mảng các ratingModel của movieId này ra, sau đó duyệt từng thành phần, chỉ cần có rating.userId bất kì = currentUser.id thì chứng tỏ currentUser đã rating movieId này r, và không cho phép rating nữa
  const { ratingModelArray, mutate: mutateRatingScore } = useRating(movieId); //* 1 mảng các rating model đã rating movieId này
  const isAllowRating = ratingModelArray
    ?.map((ratingModel: any) => {
      //* Map() ra 1 mảng chứa thành thành phần userId của tất cả rating model trong mảng ratingModelArray
      return ratingModel?.userId;
    })
    ?.includes(currentUser?.id); //* Check xem currentUser.id có nằm trong mảng id của rating vừa map ra không

  const handleCloseRatingMovie = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      closeRating(); //* Close rating sau khi click Gửi

      mutateRatingScore(); //*: thực hiện auto update lại toàn bộ data trong useRating là ratingModelArray và ratingScore
    }, 200);
  }, [closeRating]);

  //todo: Hàm để post các giá trị lấy được lên api
  const handleRatingMovie = useCallback(async () => {
    try {
      await axios.post("/api/sendRatingMovie", {
        //* Post mới 1 rating lên db
        currentUser,
        ratingStars,
        movieId,
      });

      //todo:

      //todo: Chạy closeRating sau khi post req
      handleCloseRatingMovie();
    } catch (error) {
      console.log(error);
    }
  }, [ratingStars, currentUser, movieId, handleCloseRatingMovie]);

  if (!visible) {
    return null;
  }

  return (
    <div
      className="fixed top-0 left-0
    bg-black bg-opacity-70 w-full h-full
    flex flex-col items-center justify-center"
    >
      <div
        className={`${
          !isVisible ? "scale-0" : "scale-100"
        } trnasition duration-500
        relative 
        bg-black rounded-md
       w-auto h-auto p-10
       flex flex-col items-center gap-4
       overflow-hidden`}
      >
        <div
          className="absolute top-0 right-0 
        text-black cursor-pointer m-2 group"
          onClick={handleCloseRatingMovie}
        >
          <IoClose
            className="text-white group-hover:scale-125 transition"
            size={20}
          />
        </div>
        {isAllowRating ? (
          <div className="text-green-400 font-bold ">
            Bạn đã bình chọn bộ phim này!
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-y-5">
            <h3 className="text-green-400 font-bold text-3xl">
              Đánh giá của bạn ?
            </h3>
            <div
              className="flex flex-row items-center justify-start gap-0.5
                "
            >
              {[...Array(10)].map((star, index) => {
                const currentRatingStars = index + 1;
                return (
                  <div className="text-white" key={index}>
                    <FaStar
                      className={`cursor-pointer ${
                        currentRatingStars <= (hoverStars || ratingStars)
                          ? "text-yellow-300"
                          : null
                        /* //* lúc đầu ratingStars=0 và hoverStars=0, currentRatingStars luôn > ratingStars và hoverStars => null, Khi click hoặc di chuột vào currentRatingStars thứ 3, thực thi currentRatingStars = hoverStars và currentRatingStars = ratingStars (ratingStars và hoverStars = 3) => set màu vàng cho những currentRatingStars mà currentRatingStars đó <= RatingStars nghĩa là currentRatingStars 1 đến currentRatingStars 3 */
                      }`}
                      size={20}
                      value={
                        currentRatingStars
                      } /*//* index mới đầu = 0 => tạo ra value ứng với mỗi star là từ 1-10 */
                      onClick={() => setRatingStars(currentRatingStars)}
                      onMouseEnter={() => setHoverStars(currentRatingStars)}
                      onMouseLeave={() => setHoverStars(0)}
                      /*//* Khi hover tới star 3, thì hoverStars=currentRatingStars=3(onMouseEnter thực thi) => stars 1-3 sẽ màu vàng. 
                  //* Khi click vào star 3 => ratingStars=currentRatingStars=3(onClick thực thi)
                  //* Sau đó di chuyển chuột ra ngoài star 3 => hoverStars=0(onMouseLeave thực thi) => hoverStars trong điều kiện bên dưới sẽ k đúng nữa => chỉ còn (onClick thực thi => màu hiển thị cố định ở star được click)
                   currentRatingStars <= (hoverStars || ratingStars)
                      ? "text-yellow-300"
                      : null
                  */
                    />
                  </div>
                );
              })}
            </div>
            <button
              className=" px-3 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-700 transition"
              onClick={handleRatingMovie}
            >
              Xác Nhận
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default RatingMovie;
