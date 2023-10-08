import { useFormik } from "formik";
import React, { useEffect } from "react";
import { loginFormSchema } from "../../Schema/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import { logInRequest } from "../../Features/LoginForm_Slice";
import {
  getTokensFromLocalStorage,
  saveTokensToLocalStorage,
} from "../../Utility/SaveGetCleanAccessTokenFromLoacl";
import { setUserLogin } from "../../Features/UserState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { accessToken: LocalSaveAccessToken } = getTokensFromLocalStorage();

  // # Redux state when api call for login
  const login = useSelector((state) => state.login);
  const login_loading = login?.loading;
  const login_statusCode = login?.statusCode;
  const { msg: successMsg, payload } = login?.response || {};
  const { msg: errorMsg } = login?.error || {};

  // #  Handel form using formik
  const initialValues_Local = {
    email: "",
    password: "",
  };

  const { values, handleSubmit, handleBlur, handleChange, errors, touched } =
    useFormik({
      initialValues: initialValues_Local,
      validationSchema: loginFormSchema,
      onSubmit: (values) => {
        const payload = {
          email: values.email,
          password: values.password,
        };
        dispatch(logInRequest(payload));
      },
    });

  // # Login Successfully save token in local storage
  useEffect(() => {
    if (login_statusCode === 200) {
      const { accessToken } = payload;
      saveTokensToLocalStorage(accessToken, true);
      dispatch(setUserLogin());
    }
  }, [login_statusCode, payload, dispatch]);

  // # When token save and login status code === 200 then we navigate to dashboard
  useEffect(() => {
    if (LocalSaveAccessToken && login_statusCode) {
      return navigate("/dashboard");
    }
  }, [LocalSaveAccessToken, login_statusCode, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
        <h2 className="text-2xl font-semibold mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.email && touched.email ? (
              <small className={` text-red-600 text-xs font-semibold`}>
                {errors.email}
              </small>
            ) : (
              <></>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
            {errors.password && touched.password ? (
              <small className={` text-red-600 text-xs font-semibold`}>
                {errors.password}
              </small>
            ) : (
              <></>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
          >
            {!login_loading ? "Sign In" : "Loading..."}
          </button>
        </form>
        <br />
        <small
          className={` ${
            login_statusCode !== 200 ? "text-red-600" : "text-green-600"
          }  text-xs font-semibold`}
        >
          {login_statusCode !== 200 ? errorMsg : successMsg}
        </small>
      </div>
    </div>
  );
};

export default Login;
