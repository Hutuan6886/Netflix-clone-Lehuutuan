import React from "react";

import { FaPlay } from "react-icons/fa";
import { PlayButtonProps } from "./PlayButtonPropsInterface";
import { useRouter } from "next/router";

const PlayButton: React.FC<PlayButtonProps> = ({ data }) => {
  const movieId = data?.id;
  const router = useRouter();
  if (data?.genre === "Billboard") {
    return (
      <button
        className="flex flex-row items-center justify-center gap-2
                        bg-zinc-200 text-black rounded-md px-3 py-1.5 md:px-4 md:py-2
                        hover:bg-zinc-300 transition"
        onClick={() =>
          router.push(`/watch/${movieId}`)
        } /* //* Click Play button sẽ redirect tới watch/[movieId] page */
      >
        <FaPlay />
        <p className="text-xs md:text-sm">Play</p>
      </button>
    );
  }

  return (
    <button
      className="text-sm lg:text-xl cursor-pointer text-green-500 hover:text-green-700 transition
              flex flex-row items-center gap-1"
      onClick={() =>
        router.push(`/watch/${movieId}`)
      } /* //* Click Play button sẽ redirect tới watch/[movieId] page */
    >
      <FaPlay />
      <div className="text-[10px] lg:text-sm">{data?.duration}</div>
    </button>
  );
};

export default PlayButton;
