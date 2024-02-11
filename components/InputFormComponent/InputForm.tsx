import { useState } from "react";

const InputForm = (props: any) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

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
        {...inputProps} //* Tất cả các thuộc tính còn lại được truyền từ props sẽ đc gắn vào field (value,id,...)
        onChange={onChange}
        onBlur={(e: any) => setFocused(true)} //* set focused của các input field từ false sang true nếu focus ra ngoài, (onBlur là click and leave focus)
        onFocus={
          () => inputProps.name === "confirmPassword" && setFocused(true) //* Nếu focus vào confirmPassword thì set focused=true, Bởi vì confirmPassword là field cuối cùng, nên sau khi nhập password xong, chuyển qua click vào confirmPassword thì sẽ hiện error message invalid của confirmPassword lên trước, sau khi nhập khớp với password thì error message invalid sẽ mất đi
        }
        className={`
            appearance-none
            bg-neutral-700 text-white
            text-md
            
            px-5 pt-6 p-1
            w-full
            focus:outline-none
            focus:ring-0
            peer
            rounded-[4px] 
            border-b-2 valid:border-transparent transition 
            ${
              focused
                ? "invalid-[focus]:border-orange-500"
                : "invalid-[focus]:border-transparent"
            }
        `}
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
      <span
        className={
          `text-orange-500 text-xs pt-1 
          transition
          ${
            focused
              ? "peer-invalid-[focus]:block"
              : "peer-invalid-[focus]:hidden" //! peer-invalid-[focus]:block peer để kết nối cha con với input, khi focused của input field đó true thì invalid-[focus]:block để hiện err nếu invalid sau khi focus, ngược lại
          } peer-valid:hidden peer-invalid:block` //! valid:hidden lúc đầu là valid nên hidden, sau đó nếu iinvalid thì block để hiệu err
        }
      >
        {errorMessage}
      </span>
    </div>
  );
};
export default InputForm;
