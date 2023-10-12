import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileRequest } from "../../../Features/GetUserProfile";
import CurrencyOptions from "./MonthlyExpense/Components/UserInfo/CurrencyOptions";

export default function UserInfo() {
  const dispatch = useDispatch();

  // # Call api for get profile info
  useEffect(() => {
    dispatch(GetUserProfileRequest());
  }, [dispatch]);

  // # Get redux state
  const {
    response: successRes,
    error: errorRes,
    statusCode,
    loading,
  } = useSelector((state) => state.GetUserProfile);

  const [getUserName, setGetUserName] = useState("Fetching user name.");
  const [getUserEmail, setGetUserEmail] = useState("Fetching email.");
  const [currencyName, setCurrencyName] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("Loading Currency");

  // # Get redux state (Update currency)
  const { statusCode: currencyUpdateStatusCode } = useSelector(
    (state) => state.UpdateCurrency
  );

  // # Set the values and display
  useEffect(() => {
    if (!loading && successRes && statusCode === 200) {
      const { payload: successResPayload } = successRes;
      const { name: userName, email: userEmail, currency } = successResPayload;
      const { name: currencyName, symbol: currencySymbol } = currency;
      setGetUserName(userName);
      setGetUserEmail(userEmail);
      setCurrencySymbol(currencySymbol);
      setCurrencyName(currencyName);
    } else {
      if (loading && errorRes) {
        const { msg: errorResMsg } = errorRes;
        setGetUserName(errorResMsg);
        setGetUserEmail(errorResMsg);
      }
    }
  }, [loading, successRes, statusCode, errorRes]);

  // Handel display choose currency
  const [displayChooseCurrency, setDisplayChooseCurrency] = useState(false);

  const handelDisplayChooseCurrency = () => {
    if (displayChooseCurrency) {
      return setDisplayChooseCurrency(false);
    }
    return setDisplayChooseCurrency(true);
  };

  // # Close the currency options module
  useEffect(() => {
    if (currencyUpdateStatusCode === 200) {
      const timeOut = setTimeout(() => {
        setDisplayChooseCurrency(false);
      }, 2099);
      return () => {
        clearTimeout(timeOut);
      };
    }
  }, [currencyUpdateStatusCode]);

  return (
    <section className=" h-fit bg-gray-100  px-3">
      <div className="container mx-auto py-8 ">
        <h2 className="text-2xl font-semibold mb-6">User Information</h2>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <div className="text-gray-900 text-lg">{getUserName}</div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="text-gray-900">{getUserEmail}</div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Currency
            </label>
            <div className="text-gray-900 flex flex-wrap">
              <h3 className="flex flex-wrap justify-center items-center gap-x-2">
                <span
                  className={`${
                    statusCode === 200 ? "text-2xl" : "text-lg"
                  }  font-semibold`}
                  dangerouslySetInnerHTML={{ __html: currencySymbol }}
                ></span>{" "}
                {currencyName}
              </h3>
              <button
                onClick={() => handelDisplayChooseCurrency()}
                className={`text-xs text-white font-bold ${
                  displayChooseCurrency ? "bg-red-600" : "bg-blue-600"
                }  mx-2 hover:scale-90 rounded-lg px-3 py-2 duration-700`}
              >
                {displayChooseCurrency
                  ? "Hide Choose Currency Module"
                  : " Change Currency"}
              </button>
            </div>
          </div>
          {displayChooseCurrency ? (
            <div className="mb-4">
              <CurrencyOptions />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
}
