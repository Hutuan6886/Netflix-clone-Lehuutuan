import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/NavbarComponent/Navbar";
import Billboard from "@/components/BillboardComponent/BillBoard";
import MovieList from "@/components/MovieListComponent/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavorite from "@/hooks/useFavorite";
import Info from "@/components/InfoComponent/Info";
import useInfo from "@/hooks/useInfo";

//todo: PROTECTED CLIENT ROUTE
//todo: Chặn truy cập vào route khi chưa đăng nhập
export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context); //* Check session ng dùng tại page này có tồn tại không
  if (!session) {
    //* Nếu ng dùng không tồn tại, nghĩa là đã signOut() rồi hoặc đăng nhập sai, làm cho context không tồn tại, thì redirect /login page
    return {
      redirect: {
        destination: "http://localhost:3000/login",
        permanent: false,
      },
    };
  }

  return {
    //* nếu ng dùng còn tồn tại thì return props rỗng
    props: {},
  };
}

//?: Lúc đầu Home được khai báo là page default mặc định trong tất cả các page được protect client: export default function Home () {...}
//?: ===> nên khi login thành công mặc định sẽ nhảy vào Home, chứ không redirect theo callbackUrl của hàm signIn ==> nên sẽ export hàm Home như 1 hàm thông thường

const Home = () => {
  const { data: user } = useCurrentUser(); //* đặt tên gọi khác(alias) cho data là user
  const { movieData: movie } = useMovieList(); //* Mảng data movie, truyền movie props cho MovieList
  const { data: favoriteMovies } = useFavorite(); //* Mảng data movie favorite, truyền favoriteMovies props cho MovieList
  const { isOpen } = useInfo(); //* Lấy giá trị mặc định từ store Info về gán cho props của Info component

  return (
    <div className="relative">
      <Navbar />
      <Billboard />
      <div className="">
        {/* //todo: render MovieList */}
        <MovieList title="ALL MOVIES" data={movie} />
        {/* //todo: render FavoriteMoviesList */}
        <MovieList title="MY FAVORITE MOVIES" data={favoriteMovies} />
      </div>
      {/* //todo: Component Info */}
      <Info visible={isOpen} />
    </div>
  );
};
export default Home;
