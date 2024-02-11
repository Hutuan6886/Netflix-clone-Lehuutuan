interface valuesProps {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
}
let userNameValid: boolean;
let emailValid: boolean;
let passwordValid: boolean;
let confirmPasswordValid: boolean;
const registerValidate = (values: valuesProps) => {
  const { name, email, password, confirmPassword } = values;

  if (name) {
    if (name.length >= 3 && name.length <= 20) {
      userNameValid = true;
    } else {
      userNameValid = false;
    }
  }
  if (email) {
    const mail = "";
    if (values.email.match(mail)) {
      emailValid = true;
    } else {
      emailValid = false;
    }
  }
  if (password) {
    const passPattern =
      /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    if (password.match(passPattern)) {
      passwordValid = true;
    } else {
      passwordValid = false;
    }
  }
  if (confirmPassword) {
    if (confirmPassword === password) {
      confirmPasswordValid = true;
    } else {
      confirmPasswordValid = false;
    }
  }
  // console.log("userNameValid", userNameValid);
  // console.log("emailValid", emailValid);
  // console.log("passwordValid", passwordValid);
  // console.log("confirmPasswordValid", confirmPasswordValid);

  // console.log(
  //   "valid",
  //   userNameValid && emailValid && passwordValid && confirmPasswordValid
  // );

  return userNameValid && emailValid && passwordValid && confirmPasswordValid; //* hợp lệ return true, không hợp lệ return false
};
export default registerValidate;
