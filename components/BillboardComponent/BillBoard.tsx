import useBillboard from "@/hooks/useBillboard";
import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import PlayButton from "../PlayButtonComponent/PlayButton";
import useInfo from "@/hooks/useInfo";

const Billboard = () => {
  const { data: movie } = useBillboard();
  const { openInfo } = useInfo();

  return (
    <div className="relative w-full h-[50vw]">
      <video
        autoPlay
        muted
        loop
        poster={movie?.thumbnailUrl}
        src={movie?.videoUrl}
        className="w-full h-[50vw] object-cover brightness-[70%]"
      ></video>
      <div className="absolute top-[20%] md:top-[30%] lg:top-[40%] w-[90%] md:w-[50%] ml-4 md:ml-16 text-white">
        <h3 className="text-lg md:text-xl lg:text-[3rem] font-bold drop-shadow-xl">
          {movie?.title}
        </h3>
        <p className="w-[90%] my-2 md:my-3 lg:my-[30px] text-xs md:text-lg drop-shadow-xl">
          {movie?.description}
        </p>
        <div className="flex flex-row justify-start items-center gap-2">
          <PlayButton data={movie} />
          <button className="bg-white bg-opacity-30 rounded-md px-3 py-1.5 md:px-4 md:py-2 flex flex-row justify-center items-center gap-1 hover:bg-opacity-50 transition">
            <RiErrorWarningLine />
            <p
              className="text-xs md:text-sm"
              onClick={() => {
                openInfo(movie.id); //todo: Sử dụng useInfo() hook để set visible component Info của movie.id truyền vào bằng true,để hiện lên
              }}
            >
              More Info
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Billboard;
