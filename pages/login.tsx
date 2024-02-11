//todo: a login page (localhost:3000/login)
import { useCallback, useState } from "react";
import Input from "../components/InputComponent/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import loginValidate from "@/validation/loginValidate";
import registerValidate from "@/validation/registerValidate";
import InputForm from "@/components/InputFormComponent/InputForm";

const Login = () => {
  /* //todo: VALIDATION */
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  } as any);
  const inputsLogin: any = [
    {
      id: "2",
      name: "email",
      type: "email",
      errorMessage: "Địa chỉ email không hợp lệ!",
      label: "Email",
      required: true,
    },
    {
      id: "3",
      name: "password",
      type: "password",
      errorMessage:
        "Mật khẩu có ít nhất 8 kí tự bao gồm 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 kí tự đặc biệt!",
      label: "Mật Khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
  ];
  const inputsRegister: any = [
    {
      id: "1",
      name: "name",
      type: "text",
      errorMessage:
        "Tài Khoản có 3-20 kí tự, không bao gồm các kí tự có dấu và các kí tự đặc biệt!",
      label: "Tài Khoản",
      pattern: "^[A-Za-z ]{3,20}$",
      required: true,
    },
    {
      id: "2",
      name: "email",
      type: "email",
      errorMessage: "Địa chỉ email không hợp lệ!",
      label: "Email",
      required: true,
    },
    {
      id: "3",
      name: "password",
      type: "password",
      errorMessage:
        "Mật khẩu có ít nhất 8 kí tự bao gồm 1 chữ cái thường, 1 chữ cái hoa, 1 chữ số và 1 kí tự đặc biệt!",
      label: "Mật Khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: "4",
      name: "confirmPassword",
      type: "password",
      errorMessage: "Mật khẩu không trùng khớp!",
      label: "Xác Nhận Lại Mật Khẩu",
      pattern: values.password,
      required: true,
    },
  ];
  const onChange = (e: any) => {
    //* [e.target.name] chính là thuộc tính name của input object: 'name' 'email' 'password' 'confirmPassword'
    //* e.target.value là các giá trị nhập vào
    //* => nghĩa là gán giá trị nhập vào e.target.value cho các 'name' 'email' 'password' 'confirmPassword' bên trong ...value, để setState cho 'name' 'email' 'password' 'confirmPassword'
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  /* //todo:--------------------------------------------------------------------------------------- */

  /* //todo: QUẢN LÝ TRẠNG THÁI LOGIN HOẶC REGISTER */
  const [variant, setVariant] = useState("login"); //* Biến để switch log in và create new account
  const toggleVariant = useCallback(() => {
    setVariant((curentVariant) =>
      curentVariant === "login" ? "register" : "login"
    ); //* Lúc đầu curentVariant= 'login' thì sẽ đổi thành register, còn không phải 'login' thì sẽ đổi thành login
  }, []);
  /* //todo:---------------------------------------------------------------------------------------------*/

  /* //todo: SUBMIT LOGIN FORM */
  const submitFormToLogin = useCallback(async () => {
    //todo: Xử lý login validation
    if (!loginValidate(values)) {
      return alert("Vui lòng điền đầy đủ thông tin!");
    }

    //todo: Đặt submitFormToLogin trước submitFormToRegister để chạy submitFormToLogin() bên trong submitFormToRegister ==> sau khi click submitFormToRegister sẽ thực hiện đăng nhập luôn
    try {
      //todo: next-auth/react thiết kế sẵn 1 số function như signIn signout,... để hỗ trợ 1 bên thứ 3 đăng nhập
      await signIn("credentials", {
        //* signIn(credentials nào đó sẽ được định nghĩa là 1 id tại [...nextauth],giá trị của credentials đó)
        email: values.email,
        password: values.password,
        redirect: true,
        callbackUrl: `http://localhost:3000/profiles`, //* redirect tới 1 profile user xác định theo giá trị [id] or [slug] của user đó
        //todo: gửi tất cả giá trị bên trên qua credentials trong authorized() tại [nextauth]
      });
      // If you need to redirect to another page but you want to avoid a page reload, you can try: const data = await signOut({redirect: false, callbackUrl: "/foo"}) where data.url is the validated URL you can redirect the user to without any flicker by using Next.js's useRouter().push(data.url)
      // router.push("/"); //* redirect tới 1 route nhưng sử dụng useRouter hook
    } catch (err) {
      console.log(err);
    }
  }, [
    values,
    // router
  ]); //* submitFormToLogin cần email và password, thêm giá trị router để thay đổi redirect router.push("...")
  /* //todo:--------------------------------------------------------------------------------------------------- */

  /* //todo: SUBMIT REGISTER FORM */
  const submitFormToRegister = useCallback(async () => {
    //todo: Xử lý register validation trước khi gửi req
    if (!registerValidate(values)) {
      //* Không hợp lệ return false sẽ chạy vào đây đê invalid
      return alert("Vui lòng điền đẩy đủ thông tin!");
    }

    //todo: Sử dụng axios để test các method controller(GET POST PATCH DELETE)
    try {
      //* POST localhost:3000/api/register (controller là /api/register.ts sẽ gửi các request và nhận các respond từ PrismaDb, PrismaDb giống PrismaService và /api/register.ts giống các Controller của các module trong Angular Nestjs)
      await axios.post(`http://localhost:3000/api/register`, {
        name: values.name,
        email: values.email,
        password: values.password,
      });

      submitFormToLogin(); //* sau khi register thành công thì thực hiện đăng nhập
    } catch (err) {
      console.log(err);
    }
  }, [values, submitFormToLogin]); //* thêm giá trị submitFormToLogin đầu vào để thực hiện function submitFormToLogin()
  /* //todo:--------------------------------------------------------------------------------------------------- */

  return (
    <div className="relative w-full bg-[url('/images/background.jpg')] bg-no-repeat bg-cover bg-center bg-fixed">
      {/* //todo: background element */}
      <div className="h-full w-full bg-zinc-900 lg:bg-opacity-50">
        {/* //todo: element làm mờ background */}
        <nav className="w-full px-10 py-5 ">
          {/* //todo: logo element (height:44px */}
          <img src="/images/logo.png" alt="logo" className="h-11" />
        </nav>
        <div className="flex justify-center">
          {/* //todo: form login */}
          <div className="px-[68px] py-[60px] bg-black bg-opacity-80 rounded-[5px] h-auto md:w-2/5 md:max-w-md w-full">
            <h3 className="text-white font-semibold text-3xl">
              {variant === "login" ? "Đăng Nhập" : "Tạo Tài Khoản"}
            </h3>
            {variant === "login" ? (
              <form className="flex flex-col gap-4 my-6">
                {inputsLogin.map((input: any) => {
                  return (
                    <InputForm
                      key={input.id}
                      {...input} /* //* {...input} toàn bộ thuộc tính của object input có trong mảng inputs*/
                      value={
                        values[input.name]
                      } /* //* input.name chính là các: 'username' 'email' 'password' 'confirmPassword' => values[input.name] chính là các value của 'username' 'email' 'password' 'confirmPassword' tại ...values state */
                      onChange={
                        onChange
                      } /* //* gửi hàm onChange vào để input bên trong InputForm Thực hiện setValues */
                    />
                  );
                })}
                <button
                  className="bg-red-600 text-white font-bold w-full py-3 mt-2 rounded-md hover:bg-red-800 transition"
                  type="button"
                  onClick={submitFormToLogin}
                >
                  Đăng Nhập
                </button>
              </form>
            ) : (
              <form className="flex flex-col gap-4 my-6">
                {inputsRegister.map((input: any) => {
                  return (
                    <InputForm
                      key={input.id}
                      {...input} /* //* {...input} toàn bộ thuộc tính của object input có trong mảng inputs*/
                      value={
                        values[input.name]
                      } /* //* input.name chính là các: 'username' 'email' 'password' 'confirmPassword' => values[input.name] chính là các value của 'username' 'email' 'password' 'confirmPassword' tại ...values state */
                      onChange={
                        onChange
                      } /* //* gửi hàm onChange vào để input bên trong InputForm Thực hiện setValues */
                    />
                  );
                })}
                <button
                  className="bg-red-600 text-white font-bold w-full py-3 mt-2 rounded-md hover:bg-red-800 transition"
                  type="button"
                  onClick={submitFormToRegister}
                >
                  Đăng Ký
                </button>
              </form>
            )}
            {variant === "login" ? (
              <div className="flex flex-col gap-6 w-full mb-3">
                <button
                  className="bg-white rounded-md py-1 font-semibold hover:bg-neutral-200 duration-300"
                  onClick={() =>
                    signIn("google", {
                      callbackUrl: "http://localhost:3000/",
                    })
                  }
                >
                  <FcGoogle className="inline m-1" size={30} />
                  Google
                </button>
                <button
                  className="bg-white rounded-md py-1 font-semibold hover:bg-neutral-200 duration-300"
                  onClick={() =>
                    signIn("github", {
                      callbackUrl: "http://localhost:3000/",
                    })
                  }
                >
                  <FaGithub className="inline m-1" size={30} />
                  Github
                </button>
              </div>
            ) : null}
            <p className="text-[#8c8c8c] text-[16px]">
              {variant === "login"
                ? "Bạn mới tham gia Netflix?"
                : "Sẵn sàng để đang nhập?"}
              <span
                className="cursor-pointer text-white"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Đăng ký ngay" : "Đăng nhập"}
              </span>
            </p>
            <p className="text-[#8c8c8c] text-[13px]">
              Quá trình đăng nhập được Google reCAPTCHA bảo vệ để đảm bảo bạn
              không phải là robot.
              <a href="" className="text-[#0071eb]">
                Tìm hiểu thêm
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
