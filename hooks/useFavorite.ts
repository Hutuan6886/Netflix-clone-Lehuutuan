import useSWR from "swr";
import axios from "axios";
import fetcher from "@/lib/fetcher";

const useFavorite = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/renderFavoriteMovies`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading, mutate };
};
export default useFavorite;
