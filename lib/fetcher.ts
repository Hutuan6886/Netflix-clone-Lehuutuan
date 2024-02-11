//todo: fetcher sử dụng axios để tạo phương thức GET dataUser lên API, server trả về cho fetcher dataUser
import axios from "axios";

const fetcher = (url: string) => {
  return axios.get(url).then((res) => {
    return res.data;
  });
};
/* 
const fetcher = (url: string) => axios.get(url).then((res) => res.data); //*: Nếu viết ntn thì mặc định sẽ return ra nếu không có dấu ngoặc
*/
export default fetcher;
