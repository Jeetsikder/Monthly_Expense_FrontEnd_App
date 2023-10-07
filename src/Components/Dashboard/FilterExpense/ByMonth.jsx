import { useFormik } from "formik";
import {
  GetMonthExpenseRequest,
  setDefaultGetMonthExpenseRequestState,
} from "../../../Features/GetExpenses/GetMonthExpense";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setGetAllExpenseStateResponsePayload } from "../../../Features/GetExpenses/GetAllExpenses";
import { setAddFilterNameExpenseState } from "../../../Features/expense_Slice";

export default function ByMonth() {
  // # Redux state
  const {
    response,
    statusCode,
    loading,
    error: serverError,
  } = useSelector((state) => state.GetMonthExpense);
  const response_msg = response?.msg;
  const serverError_msg = serverError?.msg;

  const dispatch = useDispatch();
  const getCurrentMonthYear = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, "0");
    return `${year}-${month}`;
  };

  // #  Handel form using formik
  const initialValues_Local = {
    startMonth: getCurrentMonthYear(),
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: initialValues_Local,
    onSubmit: (values) => {
      const payload = {
        startMonth: values.startMonth,
      };
      dispatch(GetMonthExpenseRequest(payload));
      setTimeout(() => {
        dispatch(setDefaultGetMonthExpenseRequestState());
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
          filterName: "Filtered by Date:- " + response_msg,
        })
      );
    }
  }, [statusCode, response, response_msg, dispatch]);
  return (
    <div className="max-w-md mx-auto p-4 border rounded-lg shadow-md bg-white">
      <form action="" onSubmit={handleSubmit}>
        <label className="block text-gray-700 text-lg font-bold mb-2">
          Select a Month:
        </label>
        <input
          type="month"
          name="startMonth"
          value={values.startMonth}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full mt-4 hover:bg-blue-600 transition duration-300"
        >
          {loading ? "Loading" : "Search"}
        </button>
        <br />
        <small
          className={`font-bold  ${
            statusCode === 200 ? "text-green-600" : "text-red-600"
          }`}
        >
          {statusCode === 200 ? response_msg : serverError_msg}
        </small>
      </form>
    </div>
  );
}
