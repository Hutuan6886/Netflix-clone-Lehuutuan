import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieList = () => {
  const { data, error, isLoading } = useSWR(`http://localhost:3000/api/movies`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const movieData = data?.filter(
    //* Trong data có cả Movie và Billboard, Lọc data Movie
    (movieItem: any) => movieItem.genre !== "Billboard"
  );

  return { movieData, error, isLoading };
};
export default useMovieList;
