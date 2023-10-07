import * as yup from "yup";

export const AddExpenseSchema = yup.object({
  category: yup.string().required("Category is required "),

  amount: yup
    .number()
    .min(1, "Amount must be greater than 0.")
    .required("Amount must be greater than 0."),
});
