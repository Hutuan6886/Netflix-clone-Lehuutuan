import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovieId = (id: string) => {
  const { data, error, isLoading } = useSWR(
    id ? `http://localhost:3000/api/movies/${id}` : null, //* route movies/id ứng với từng movie trong db
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return { data, error, isLoading };
};
export default useMovieId;
