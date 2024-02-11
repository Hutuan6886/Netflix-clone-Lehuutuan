interface valuesProps {
  email: string;
  password: string;
}
let emailValid: boolean;
let passwordValid: boolean;
const loginValidate = (values: valuesProps) => {
  const { email, password } = values;

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
//   console.log("emailValid", emailValid);
//   console.log("passwordValid", passwordValid);

//   console.log("valid", emailValid && passwordValid);

  return emailValid && passwordValid; //* hợp lệ return true, không hợp lệ return false
};
export default loginValidate;
