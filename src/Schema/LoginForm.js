import * as yup from "yup";

export const loginFormSchema = yup.object({
  email: yup
    .string()
    .email()
    .required("Invalid email address. Please enter a valid email address."),

  password: yup
    .string()
    .min(1, "Name must be at least 1 characters long")
    .required("Password must be required"),
});
