import { create } from "zustand";
//todo: sử dụng để quản lý trạng thái open và close của <RatingMovie /> component
interface OpenRatingStoreProps {
  movieId: any;
  isOpen: boolean;
  openRating: (movieId: string) => void;
  closeRating: () => void;
}

const useOpenRating = create<OpenRatingStoreProps>((set) => ({
  //todo: set giá trị mặc định
  isOpen: false,
  movieId: undefined, //* giá trị movieId để openRating của movieId đó

  openRating: (movieId: string) =>
    set({
      movieId,
      isOpen: true,
    }),
  closeRating: () =>
    set({
      movieId: undefined,
      isOpen: false,
    }),
}));

export default useOpenRating;
