import * as yup from "yup";

export const SinhUpSchema = yup.object({
  name: yup
    .string()
    .min(3, "Name must be at least 3 characters long")
    .max(25, "Name maximum 25 characters long")
    .required("Name is required."),

  email: yup
    .string()
    .email()
    .required("Invalid email address. Please enter a valid email address."),

  confirmEmail: yup
    .string()
    .email()
    .oneOf([yup.ref("email"), null, "Email is required"])
    .required("Conform email is required."),

  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .required(
      "Password must be at least 8 characters long, and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (e.g. !@#$%^&*)"
    ),

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null, "Password is required"])
    .required("Repeat Password is required"),
});
