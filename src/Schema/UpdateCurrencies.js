import * as yup from "yup";

export const CurrenciesUpdateSchema = yup.object({
  currencyName: yup
    .string()
    .min(3, "Counter name must be at least 3 characters long")
    .max(25, "Counter name maximum 25 characters long")
    .required("Counter name is required."),
});
