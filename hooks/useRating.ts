import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useRating = (id: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `http://localhost:3000/api/rating/${id}` : null, //* route movies/id ứng với từng movie trong db
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const ratingScore = data?.ratingScore;
  const ratingModelArray = data?.ratingModelArray;

  /* // if (data?.length === 0) {
  //   //todo: Nếu data là 1 mảng không có phần tử nào thì không return data
  //   return { error, isLoading };
  // }
  // const ratingModelNumbers = data?.length;
  // //todo: Sau khi có mảng các model rating thì lấy ra thuộc tính stars của từng rating model để push vào chung 1 mảng, và tính trung bình giá trị của các thuộc thính stars lại bằng reduce() method
  // const totalRating = data
  //   ?.map((ratingModel: any) => {
  //     return ratingModel?.stars;
  //   })
  //   ?.reduce((total: number, currentValue: number) => {
  //     return total + currentValue;
  //   });
  // const tbRating10 = totalRating / ratingModelNumbers; //*thang điểm 10
  // const ratingScore = parseInt(((tbRating10 * 5) / 10).toFixed(1)); //* Đổi về thang điểm 5 và Làm tròn sau dấu phẩi 1 chữ số, toFixed() mặc định trả về string nêm phải parseInt để ép string sang number */
  return { ratingModelArray, ratingScore, error, isLoading, mutate };
};
export default useRating;
