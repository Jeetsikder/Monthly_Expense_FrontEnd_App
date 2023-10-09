import { useFormik } from "formik";
import { AddExpenseSchema } from "../../../Schema/AddExpense";
import { useDispatch, useSelector } from "react-redux";
import {
  AddExpenseRequest,
  setDefaultAddExpenseRequestState,
} from "../../../Features/AddExpense";
import FilterExpense from "./MonthlyExpense/FilterExpense";
import { setGetAllExpenseStateResponsePayload } from "../../../Features/GetExpenses/GetAllExpenses";
import { setAddFilterNameExpenseState } from "../../../Features/expense_Slice";
import { useEffect } from "react";

const Expense_TOPIC = [
  "housing",
  "transportation",
  "food and groceries",
  "others",
];

export default function AddExpenseForm({ onAddExpense }) {
  const dispatch = useDispatch();
  //   # Redux state Save expense
  const {
    response,
    statusCode,
    error: serverError,
    loading,
  } = useSelector((state) => state.addExpense);
  const successRes = response?.msg;
  const errorRes = serverError?.msg;

  // #  Handel form using formik
  const initialValues_Local = {
    category: "",
    amount: 0,
  };

  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: initialValues_Local,
      validationSchema: AddExpenseSchema,
      onSubmit: (values) => {
        const payload = {
          category: values.category,
          amount: values.amount,
        };
        dispatch(AddExpenseRequest(payload));
        setTimeout(() => {
          dispatch(setDefaultAddExpenseRequestState());
          values.amount = "";
          values.category = "";
        }, 3000);
      },
    });

  useEffect(() => {
    if (statusCode === 200) {
      const payload = {
        data: response?.payload,
      };

      dispatch(setGetAllExpenseStateResponsePayload(payload));
      dispatch(
        setAddFilterNameExpenseState({
          filterName: successRes,
        })
      );
    }
  }, [statusCode, response, successRes, dispatch]);

  return (
    <div className="w-full h-fit space-y-3">
      <form className="mx-auto w-4/5" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Category:
          </label>
          <select
            className="w-full px-3 py-2 border rounded-lg"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {Expense_TOPIC.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && touched.category ? (
            <small className={` text-red-600 text-xs font-semibold`}>
              {errors.category}
            </small>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Amount:</label>
          <input
            type="number"
            name="amount"
            className="px-3 py-2 border rounded-lg w-10/12"
            value={values.amount}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />
          <span className="text-2xl ms-2"> 💰</span>
          {errors.amount && touched.amount ? (
            <small className={` text-red-600 text-xs font-semibold`}>
              {errors.amount}
            </small>
          ) : (
            <></>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Loading" : " Add Expense"}
        </button>
        <br />
        <small
          className={` ${
            statusCode === 200 ? "text-green-600" : "text-red-600"
          } text-xs font-semibold`}
        >
          {statusCode === 200 ? successRes : errorRes}
        </small>
      </form>
      {/*  Add Filter */}
      <div>
        <FilterExpense />
      </div>
    </div>
  );
}
