import React from "react";
import { MovieListProps } from "./MovieListPropsInterface";
import { isEmpty } from "lodash";
import MovieItem from "../MovieItemComponent/MovieItem";

//todo: Component MovieList nhận 1 props từ thẻ cha, thì sẽ khai báo giá trị nhận vào đó phải theo kiểu interface MovieListProps, title làm giá trị đầu vào để phân loại data
const MovieList: React.FC<MovieListProps> = ({ data, title }) => {
  //todo: Kiểm tra data có là rỗng không, nếu rỗng thì return  null (Khai báo để khi server sập sẽ không làm ảnh hưởng tới front-end)
  if (isEmpty(data)) {
    return null;
  }
  return (
    <div className="px-[25px] py-2 md:px-[50px] md:py-4">
      <h3 className="text-white text-md md:text-xl lg:text-2xl font-semibold py-[20px]">
        {title}
      </h3>
      <div className="grid grid-cols-4 gap-2">
        {data.map((movieItem, index) => {
          return (
            <div key={index}>
              <MovieItem data={movieItem} />;
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default MovieList;
