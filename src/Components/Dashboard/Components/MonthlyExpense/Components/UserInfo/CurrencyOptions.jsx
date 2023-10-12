import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { CurrenciesUpdateSchema } from "../../../../../../Schema/UpdateCurrencies";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateCurrencyRequest,
  setDefaultUpdateCurrencyRequestState,
} from "../../../../../../Features/GetExpenses/Update/UpdateCurrency";
import { modifyCurrency } from "../../../../../../Features/GetUserProfile";
const { currencies_List } = require("../../../../../../LocalDataBank.json");

const CurrencyOptions = () => {
  const [displayPatchResMsg, setDisplayPatchResMsg] = useState("");
  const dispatch = useDispatch();
  // # Handel form
  const initialValue_Local = {
    currencyName: "",
  };
  const {
    errors,
    handleSubmit,
    values,
    handleChange,
    handleBlur,
    touched,
    resetForm,
  } = useFormik({
    initialValues: initialValue_Local,
    validationSchema: CurrenciesUpdateSchema,
    onSubmit: (values) => {
      const payload = currencies_List.filter((element) => {
        return element.name === values.currencyName;
      });
      dispatch(UpdateCurrencyRequest(payload[0]));
    },
  });

  // # Get redux state (Update currency)
  const {
    response: currencyUpdateSuccessRes,
    error: currencyUpdateErrorRes,
    statusCode: currencyUpdateStatusCode,
    loading: currencyUpdateLoading,
  } = useSelector((state) => state.UpdateCurrency);

  // # For update currency success response only
  useEffect(() => {
    if (currencyUpdateStatusCode === 200) {
      const { msg, payload } = currencyUpdateSuccessRes;
      const { code, symbol, name } = payload;

      // # DIsplay success msg
      setDisplayPatchResMsg(msg);

      // # Update state with new currency
      dispatch(modifyCurrency({ code, symbol, name }));
    }
  }, [currencyUpdateStatusCode, currencyUpdateSuccessRes, dispatch]);

  // # For update currency Error response only
  useEffect(() => {
    if (currencyUpdateStatusCode !== 200 && currencyUpdateErrorRes) {
      const { msg } = currencyUpdateErrorRes;
      setDisplayPatchResMsg(msg);
    }
  }, [currencyUpdateStatusCode, currencyUpdateErrorRes]);

  // # Clear form and state
  useEffect(() => {
    if (currencyUpdateStatusCode === 200) {
      const timeOut = setTimeout(() => {
        resetForm();
        setDisplayPatchResMsg("");
        dispatch(setDefaultUpdateCurrencyRequestState());
      }, 3000);

      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [currencyUpdateStatusCode, resetForm, dispatch, currencyUpdateSuccessRes]);
  // # update component when modify the currency in another component
  const currencyCode = useSelector((state) => state.UpdateCurrency).response
    ?.payload?.code;
  useEffect(() => {}, [currencyCode]);
  return (
    <form onSubmit={handleSubmit} className="relative w-fit space-y-6">
      <div className="">
        <label className="block">Select Currency:</label>
        <select
          name="currencyName"
          id="currencyName"
          className="w-full px-4 py-2 border rounded-lg appearance-none"
          size="3" // Display only 3 options, rest will be scrollable
          value={values.currencyName}
          onChange={handleChange}
          onBlur={handleBlur}
          required
        >
          <option value="" disabled>
            Select a category
          </option>
          {currencies_List.map((currency) => (
            <option key={currency.name} value={currency.name}>
              <span
                dangerouslySetInnerHTML={{ __html: currency.symbol }}
              ></span>{" "}
              {currency.name}
            </option>
          ))}
        </select>
        {errors.currencyName && touched.currencyName ? (
          <small className={` text-red-600 text-xs font-semibold`}>
            {errors.currencyName}
          </small>
        ) : (
          <></>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 px-3 py-1 rounded-md text-xs font-bold text-white duration-700 hover:shadow-xl hover:scale-90"
      >
        {!currencyUpdateLoading ? "Submit" : "Loading.."}
      </button>
      <br />
      <small
        className={`${
          currencyUpdateStatusCode === 200 ? "text-green-600 " : "text-red-600 "
        }  text-xs font-semibold`}
      >
        {displayPatchResMsg}
      </small>
    </form>
  );
};

export default CurrencyOptions;
