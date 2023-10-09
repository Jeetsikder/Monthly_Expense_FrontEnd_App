import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  GetdateExpenseRequest,
  setDefaultGetdateExpenseRequestState,
} from "../../../Features/GetExpenses/GetdateExpense";
import { useEffect } from "react";
import { setGetAllExpenseStateResponsePayload } from "../../../Features/GetExpenses/GetAllExpenses";
import { setAddFilterNameExpenseState } from "../../../Features/expense_Slice";

export default function ByDate() {
  const dispatch = useDispatch();

  // # Redux state
  const {
    response,
    statusCode,
    loading,
    error: serverError,
  } = useSelector((state) => state.GetdateExpense);
  const response_msg = response?.msg;
  const serverError_msg = serverError?.msg;

  const currentDate = new Date().toISOString().substr(0, 10);

  // #  Handel form using formik
  const initialValues_Local = {
    startDate: currentDate,
  };

  const { values, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: initialValues_Local,
    onSubmit: (values) => {
      const payload = {
        startDate: values.startDate,
      };
      dispatch(GetdateExpenseRequest(payload));

      setTimeout(() => {
        dispatch(setDefaultGetdateExpenseRequestState());
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
        <label className="block text-gray-700 font-bold mb-2">
          Start Date:
        </label>
        <input
          type="date"
          name="startDate"
          value={values.startDate}
          onChange={handleChange}
          onBlur={handleBlur}
          required
          className="w-full px-3 py-2 border rounded-lg"
        />
        <br />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300 mt-4"
        >
          {loading ? "Loading..." : "Search"}
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
