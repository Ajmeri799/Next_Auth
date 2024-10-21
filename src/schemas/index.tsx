import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .email("*invalid email")
    .required("*please enter your email"),
  password: Yup.string().min(8).required("*plese enter the password"),

  firstName: Yup.string()
    .min(3)
    .max(10)
    .required("*please enter the first name"),
  lastName: Yup.string().min(3).max(25).required("*please enter the last name"),
  confirmPassword: Yup.string()
    .required()
    .oneOf([Yup.ref("password")], "*password must match"),
});
export const LoginVali = Yup.object({
  email: Yup.string()
    .email("*invalid email")
    .required("*please enter your email"),
  password: Yup.string().min(8).required("*plese enter the password"),
});
