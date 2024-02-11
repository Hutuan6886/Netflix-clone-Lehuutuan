//todo: api route là pages/api/[movieId], client route là pages/watch/[movieId]
//todo: /watch/[movieId] để trình chiếu video
import FavoriteButton from "@/components/FavoriteButtonComponent/FavoriteButton";
import RatingMovie from "@/components/RatingMovieComponent/RatingMovie";
import useMovieId from "@/hooks/useMovieId";
import { useRouter } from "next/router";
import React from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import RenderRating from "@/components/RenderRatingComponent/RenderRating";
import useRating from "@/hooks/useRating";
import useOpenRating from "@/hooks/useOpenRating";
import { KeyedMutator } from "swr";

const Watch: React.FC = () => {
  const router = useRouter();
  /* //todo: Tại PlayButton thực hiện onClick={() =>router.push(`/watch/${movieId}`)} => Để truy suất giá trị movieId tại client, sử dụng route.query(Ngược lại tại client truy suất server thì req.query) */
  const { movieId } = router?.query;
  //todo: Sử dụng movieId để get video từ useMovieId hook.
  //todo: Lỗi định nghĩa tại tại giá trị đầu vào thì sử dụng as strin,... : Argument of type 'string | string[] | undefined' is not assignable to parameter of type 'string'. Type 'undefined' is not assignable to type 'string'.
  //todo: useMovieId(movieId) return data:{movie,tbRating5}
  const { data: movie } = useMovieId(movieId as string);
  const { ratingScore, mutate: mutateRatingScore } = useRating(
    movieId as string
  );

  //todo: hook sử dụng để open RatingMovie component
  const { isOpen, openRating } = useOpenRating();

  return (
    <div
      className="relative w-screen h-screen
        flex flex-col gap-5"
    >
      <nav
        className="fixed w-full font-blod 
      flex -flex-row items-center justify-start gap-2
      p-4 z-10 text-white bg-black bg-opacity-60"
      >
        <IoMdArrowRoundBack
          size={32}
          className="cursor-pointer"
          onClick={() => router.push("/")}
        />
        <p className="text-lg md:text-2xl">{`Đang xem phim: ${movie?.title}`}</p>
      </nav>
      <div className="pt-[62px]">
        <video
          className="w-full"
          autoPlay
          controls
          src={movie?.videoUrl}
        ></video>
      </div>
      <div
        className="grid grid-cols-2 text-white
                        w-[90%] mx-auto"
      >
        <div className="flex items-center">
          <FavoriteButton movieId={movieId as string} />
        </div>
        <div className="ml-auto cursor-pointer">
          {ratingScore === undefined ? (
            <button
              className="text-green-300 font-bold hover:scale-125 transition"
              onClick={() => {
                openRating(movieId as string);
              }}
            >
              Đánh giá
            </button>
          ) : (
            <div
              onClick={() => {
                openRating(movieId as string);
              }}
            >
              <RenderRating
                ratingScore={ratingScore as number}
                movieId={movieId as string}
              />
            </div>
          )}
          {/*//todo: RatingMovie sẽ ẩn hiện theo trạng thái visible khi click vào RenderRating component*/}
          <RatingMovie visible={isOpen} movieId={movieId as string} />
        </div>
      </div>
      <div
        className="text-white w-[95%] mx-auto
      flex flex-col items-start gap-2 pb-3"
      >
        <h3 className="text-2xl font-bold">Giới thiệu</h3>
        <p>{movie?.description}</p>
      </div>
    </div>
  );
};
export default Watch;
