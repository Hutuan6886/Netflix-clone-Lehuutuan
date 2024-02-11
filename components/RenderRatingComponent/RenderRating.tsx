import React, { useCallback } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { RenderRatingProps } from "./RenderRatingProps";

const RenderRating: React.FC<RenderRatingProps> = ({
  ratingScore,
  movieId,
}) => {
  //todo: hook sử dụng để open RatingMovie component

  const renderStars = useCallback(() => {
    const stars: number = Math.floor(ratingScore as number);
    const halfStars: number = ratingScore % stars; //* Lấy điểm thực chia cho stars(đã làm tròn xuống) để lấy dư là số thập phân phía sau
    switch (stars) {
      case 1:
        return (
          <div className="flex flex-row items-center justify-start">
            <div>
              {[...Array(1)].map((item, index) => {
                return <FaStar key={index} />;
              })}
            </div>
            <div>{halfStars <= 0.5 ? <FaStarHalfAlt /> : <FaStar />}</div>
            <div className="flex flex-row items-center justify-start">
              {[...Array(3)].map((item, index) => {
                return <FaRegStar key={index} />;
              })}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-row items-center justify-start">
              {[...Array(2)].map((item, index) => {
                return <FaStar key={index} />;
              })}
            </div>
            <div>{halfStars <= 0.5 ? <FaStarHalfAlt /> : <FaStar />}</div>
            <div className="flex flex-row items-center justify-start">
              {[...Array(2)].map((item, index) => {
                return <FaRegStar key={index} />;
              })}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-row items-center justify-start">
              {[...Array(3)].map((item, index) => {
                return <FaStar key={index} />;
              })}
            </div>
            <div>{halfStars <= 0.5 ? <FaStarHalfAlt /> : <FaStar />}</div>
            <div>
              {[...Array(1)].map((item, index) => {
                return <FaRegStar key={index} />;
              })}
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-row items-center justify-start">
              {[...Array(4)].map((item, index) => {
                return <FaStar key={index} />;
              })}
            </div>
            <div>{halfStars <= 0.5 ? <FaStarHalfAlt /> : <FaStar />}</div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-row items-center justify-start">
            <div className="flex flex-row items-center justify-start">
              {[...Array(5)].map((item, index) => {
                return <FaStar key={index} />;
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  }, [ratingScore]);

  return (
    <div
      className="text-yellow-400 flex flex-row justify-end items-center gap-1 ml-auto"
      /* //todo: Không đặt hàm onClick open RatingMovie ở trong RenderRating bởi vì không phải lúc nào click vào RenderRating thì RatingMovie cũng đc mở  */
    >
      <div className="text-white font-semibold">{ratingScore || undefined}</div>
      <div>{renderStars()}</div>
    </div>
  );
};
export default RenderRating;
