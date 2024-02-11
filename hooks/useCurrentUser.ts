//todo: useCurrentUser hook này để sử dụng load data user trên front-end, (SWR là một thư viện React Hooks dùng trong việc fetch data.)
//todo: install swr package: npm install swr

import useSWR from "swr";
import fetcher from "../lib/fetcher";

//todo: Nếu lần đầu tiên sử dụng useCurrentUser hook fetch api tại bất kì chỗ nào, thì nó sẽ không fetch data lại nữa nếu data đã tồn tại
const useCurrentUser = () => {
  //todo: userSWR giúp xử lý các state bất đồng bộ như data từ api, giống như reactQuery không cần sử dụng redux
  //     Những state về các khoảnh khắc của data

  // isLoading or status === 'loading' - Query chưa có data
  // isError or status === 'error' - Query xảy ra lỗi
  // isSuccess or status === 'success' - Query thành công và data đã có sẵn
  // Những state về data

  // error - Nếu isError === true thì error sẽ xuất hiện ở đây
  // data - Nếu isSuccess === true thì data sẽ xuất hiện ở đây
  // Đặc biệt là fetchStatus

  // isFetching or fetchStatus === 'fetching' - Đang fetching API.
  // isPaused or fetchStatus === 'paused' - Query muốn fetch API nhưng bị tạm dừng vì một lý do nào đó.
  // fetchStatus === 'idle' - Query không làm gì cả
  //todo: useSWR(key:string, (key) => { get(key).then(...)});
  //todo: key là 1 url để param thứ 2 sử dụng làm giá trị đầu vào get giá trị
  //todo: param thứ 2 là 1 fetcher function, sử dụng url end point key để get data

  const { data, error, isLoading, mutate } = useSWR(
    `http://localhost:3000/api/getCurrentUser`,
    fetcher
  );

  return { data, error, isLoading, mutate };
  //todo: Ví dụ là muốn tạo một app todo để add thêm các new todo. Nhưng mỗi lần add thêm một item mới, cần phải refresh lại page để cập nhập các thay đổi. Nhưng với SWR mutate, có thể cập nhập thay đổi request. Nghĩa là khi thêm một dữ liệu mới, nó sẽ tự động fetch lại các request khác rồi sau đó update trên UI. (ví dụ update mutate ở phần update favorite movie after click add favorite button)
};
export default useCurrentUser;
