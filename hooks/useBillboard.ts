import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  console.log("GIT", process.env.GITHUB_ID);
  console.log("GOOGLE", process.env.GOOGLE_CLIENT_ID);
  console.log("API_URL", process.env.API_URL);
  const { data, error, isLoading } = useSWR(
    `http://localhost:3000/api/randomMovie`,
    fetcher,
    {
      //todo: trong useSWR có 1 số thuộc thính
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  //   console.log("ramdomMovieData", data);
  return { data, error, isLoading };
};
export default useBillboard;
