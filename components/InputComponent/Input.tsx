/* //! không còn được sử dụng trong dự án */
import InputProps from "./InputProps";

//todo: Input Compoent sẽ nhận các biến props truyền vào, giá trị của các biến này sẽ được truyền bằng cách gán giá trị lên các thuộc tính của <Input/> tại nơi sử dụng <Input/> <Input id=... value=... onChange=... />
const Input: React.FC<InputProps> = ({ id, value, onChange, label, type }) => {
  return (
    //todo: Tạo ra button có placeholder là label của input field, sau khi focus vào input, placholder sẽ di chuyển lên trên ô input
    //* appearance-none: xoá nhưng giá trị css mặc định của element đó
    //* ring-0: là giá trị mặc định vòng màu của button element sau khi focus vào
    //* duration-150: là transition
    //* peer: là class xây dưng element trên yếu tố anh chị em (based on sibling element) (có thể ứng dụng trong invalidation để warning).
    //* scale: phóng to ra hoặc thu nhỏ vô tại tâm
    //* z-10: là z-index để ưu tiên mức độ trên cùng
    //* origin: là chọn tâm và sử dụng translate để dịch chuyện hoặc rotate để xoay từ cái tâm đó
    <div className="relative">
      <input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className="
        appearance-none
        bg-neutral-700 text-white
        text-md
        rounded-[4px]
        px-5 pt-6 p-1
        w-full
        focus:outline-none
        focus:ring-0
        peer
  "
        placeholder=" "
      />
      <label
        htmlFor={id}
        className="
        absolute
        text-md
        text-zinc-400
        duration-150
        transform -translate-y-3 scale-75 top-4 left-6 z-10 origin-[-30px]  //*i chuyển label vào input field
        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0   //*kết nối label là placeholder của input, và set hình dạng và vị trí label chưa focus
        peer-focus:scale-75 peer-focus:-translate-y-3   //*hình dạng và vị trí label sau focus
      "
      >
        {label}
      </label>
    </div>
  );
};
export default Input;
