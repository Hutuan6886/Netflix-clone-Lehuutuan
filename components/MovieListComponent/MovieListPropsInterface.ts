//todo: MovieListProps là interface của props truyền từ thẻ cha cho MovieListComponent
export interface MovieListProps {
  data: Record<string, any>[]; //* data là 1 mảng dữ liệu chứa string hoặc any
  title: string;
}
