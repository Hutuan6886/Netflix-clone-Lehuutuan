import React from "react";
import { MovieItemProps } from "./MovieItemPropsInterface";
import { isEmpty } from "lodash";
import FavoriteButton from "../FavoriteButtonComponent/FavoriteButton";
import PlayButton from "../PlayButtonComponent/PlayButton";
import RenderRating from "../RenderRatingComponent/RenderRating";
import useRating from "@/hooks/useRating";
import useInfo from "@/hooks/useInfo";

const MovieItem: React.FC<MovieItemProps> = ({ data }) => {
  const { openInfo } = useInfo(); //* sử dụng hàm openInfo() trong store useInfo để khi click vào movieItem sẽ set visible <Info/> của movieId thành true, để <Info/> của movie.id đó hiện lên
  const { ratingScore } = useRating(data.id);

  if (isEmpty(data)) {
    return null;
  }

  return (
    <div
      className="relative h-[12vw] group"
      onClick={() => {
        openInfo(data.id);
      }}
    >
      {/* //* Tạo group để những thứ trong group sẽ thực hiện đồng bộ với nhau (hover sẽ cùng nhau). Khi hover vào sẽ là img hiển thị nổi bật lên trên và có thêm play btn ở dưới img */}
      <img
        src={data.thumbnailUrl}
        alt={data.thumbnailUrl}
        className="object-cover w-full h-[12vw] rounded-t-md drop-shadow-xl cursor-pointer
        group-hover:opacity-90 sm:group-hover:opacity-0 transition duration-300"
      />
      <div
        className=" shadow-md
        opacity-0 invisible sm:visible group-hover:opacity-100 absolute top-0 group-hover:z-10 group-hover:translate-x-[3vw] group-hover:-translate-y-[3vw] transition"
      >
        <img
          src={data.thumbnailUrl}
          alt={data.thumbnailUrl}
          className="object-cover w-full h-[12vw] rounded-t-md drop-shadow-xl cursor-pointer"
        />
        <div className="text-white bg-zinc-800 rounded-b-md w-full p-1 lg:p-3 transition flex flex-col place-items-start">
          <div className="w-full grid grid-cols-2 gap-y-2 py-1">
            <PlayButton data={data} />
            <RenderRating
              ratingScore={ratingScore as number}
              movieId={data.id}
            />
            <div className="text-[10px] font-bold lg:text-sm py-1 cursor-pointer">
              {data.genre}
            </div>
            <div className="ml-auto">
              {/* //* Khi click FavoriteButton, thì FavoriteButton sẽ được giá trị id của movie được click, FavoriteButton sẽ thực hiện API req giá trị movieId này để thực hiện save hoặc delete favoriteMovie */}
              <FavoriteButton movieId={data?.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieItem;
