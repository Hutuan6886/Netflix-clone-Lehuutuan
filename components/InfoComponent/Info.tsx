import React, { useCallback, useEffect, useState } from "react";
import PlayButton from "../PlayButtonComponent/PlayButton";
import { IoClose } from "react-icons/io5";
import useInfo from "@/hooks/useInfo";
import useMovieId from "@/hooks/useMovieId";
import RenderRating from "../RenderRatingComponent/RenderRating";
import useRating from "@/hooks/useRating";
import FavoriteButton from "../FavoriteButtonComponent/FavoriteButton";

//!: if(!!a) 2 dấu chấm than đứng trước 1 variable sẽ ép variable đó về giá trị boolean
//!: console.log(!!undefine) console.log(!!false) console.log(!!'') console.log(!!null) => false
//!: console.log(!![]) console.log(!!{}) console.log(!!'true') console.log(!!3) console.log(!!-1) => true

interface InfoProps {
  visible?: boolean;
}

const Info: React.FC<InfoProps> = ({ visible }) => {
  //todo: Mặc định lúc đầu Info sẽ đóng và movieId undefine
  const [isVisible, setIsVisible] = useState(!!visible); //* Set state isVisible mặc định là giá trị visible đầu vào là false,sử dụng để tạo hiệu ứng thu phóng cho css
  useEffect(() => {
    setIsVisible(!!visible);
  }, [visible]);
  const { movieId, closeInfo } = useInfo(); //* undefine theo giá trị mặc định store
  //todo: Lấy giá trị data, lúc đầu sẽ chưa có data vì movieId undefine
  const { data: movie } = useMovieId(movieId);
  //todo: Lấy giá trị ratingScore để render
  const { ratingScore } = useRating(movieId);

  //todo: Xử lý hàm close
  const handleCloseInfo = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => {
      //* Delay để làm một số hiệu ứng animation trong khi chờ load
      closeInfo(); //* Thực thi hàm closeInfo
    }, 300);
  }, [closeInfo]);

  if (!visible) {
    //todo: Nếu visible=false thì return null, để không hiện lên
    return null;
  }

  //todo: Nếu visible được set bằng true thì hiện leenF
  return (
    <div
      className="z-20 fixed top-0 left-0 w-full h-full
    bg-black bg-opacity-70 overflow-x-hidden overflow-y-auto
    flex justify-center items-center"
    >
      <div
        className={` ${
          !isVisible ? "scale-0" : "scale-100"
        } transition duration-500
        relative
        w-full md:w-[70%] lg:w-[50%] h-auto object-cover bg-black rounded-md drop-shadow-md
          p-5`}
      >
        <div
          className="absolute top-0 right-0 
        text-black cursor-pointer m-2 group"
          onClick={handleCloseInfo}
        >
          <IoClose
            className="text-white group-hover:scale-125 transition"
            size={20}
          />
        </div>
        <video
          autoPlay
          muted
          loop
          poster={movie?.thumbnailUrl}
          src={movie?.videoUrl}
          className="rounded-md"
        ></video>
        <div
          className="text-white
        flex flex-col justify-center gap-3
        pt-3"
        >
          <div className="flex flex-row justify-center gap-3">
            <h3 className="text-xl md:text-3xl font-bold">{movie?.title}</h3>
            <PlayButton data={movie} />
            <FavoriteButton movieId={movieId} />
            <RenderRating
              ratingScore={ratingScore as number}
              movieId={movieId as string}
            />
          </div>
          <p className="text-sm md:text-base">{movie?.description}</p>
        </div>
      </div>
    </div>
  );
};
export default Info;
