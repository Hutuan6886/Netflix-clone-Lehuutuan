//todo: useInfo hook là 1 store (sử dụng state management zustand) để quản lý trạng thái đóng mở của <Info /> khi click vào nút btn để mở bộ phim hoặc btn Info
//todo: useInfo hook là nơi chứa data mặc định của toàn bộ <Info/> component, tại client, sẽ sử dụng useInfo hook này để lấy data về gán cho <Info/>, sau khi click function ở client thì sẽ thực thi set thay đổi các biến trong store

import { create } from "zustand";

//todo: Tạo interface cho type của các giá trị state mặc định và các hàm thực hiện thay đổi các giá trị state đó
export interface InfoStoreInterface {
  //todo: Biến state mặc định của store
  movieId: any;
  isOpen: boolean;
  //todo: Function thực thi các chức năng thay đổi state
  openInfo: (movieId: string) => void; //* openInfo(movieId) tương tự như dispatch(openInfo(movieId)) ở redux(tại store redux truy suất movieId bằng action.movieId)
  closeInfo: () => void; //* closeInfo() không dispatch giá trị lên store mà cliseInfo là nút chức năng thay đổi trạng thái của biến mặc định isOpen trên store
}

const useInfo = create<InfoStoreInterface>((set) => ({
  //todo: Set giá trị mặc định cho store
  movieId: undefined, //* Lúc đầu khi chưa ấn vào movie thì movieId undefined, khi click vào movie thì hàm openInfo được set giá trị movieId
  isOpen: false,

  //todo: thực hiện thay đổi giá trị biến mặc định khi thực hiện chức năng 2 function openInfo và closeInfo
  openInfo: (movieId: string) => set({ movieId, isOpen: true }), //* lấy về compoenent gán trực tiếp cho các btn để mở Info
  closeInfo: () => set({ movieId: undefined, isOpen: false }),
}));
export default useInfo;
