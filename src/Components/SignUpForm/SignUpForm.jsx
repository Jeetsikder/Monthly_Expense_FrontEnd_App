import { useFormik } from "formik";
import { SinhUpSchema } from "../../Schema/SignUpForm";
import { useDispatch, useSelector } from "react-redux";
import { generateSignUpRequest } from "../../Features/SignUpForm_Slice";
import { useEffect, useState } from "react";
import SignUpSuccess from "./SignUpSuccess";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const [signUpSuccess_State, setSignUpSuccess_State] = useState(false);

  // # Redux state for Sign up Api call res
  const signUp_Sate = useSelector((state) => state.signUp);
  const { loading } = signUp_Sate;
  const signUp_Sate_statusCode = signUp_Sate?.statusCode;
  const signUp_Sate_error = signUp_Sate?.error;
  const signUp_Sate_error_msg = signUp_Sate_error?.msg;

  // #  Handel form using formik
  const initialValues_Local = {
    email: "",
    confirmEmail: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  const {
    values,
    handleSubmit,
    handleBlur,
    handleChange,
    errors,
    touched,
    initialValues,
  } = useFormik({
    initialValues: initialValues_Local,
    validationSchema: SinhUpSchema,
    onSubmit: (values) => {
      console.log(values);
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
      };
      dispatch(generateSignUpRequest(payload));
      // generateSignUpRequest
    },
  });

  useEffect(() => {
    if (signUp_Sate_statusCode === 409) {
      initialValues.email = "";
      initialValues.confirmEmail = "";
    }
    if (signUp_Sate_statusCode === 200) {
      setSignUpSuccess_State(true);
    } else {
      setSignUpSuccess_State(false);
    }
    // if(signUp_Sate_statusCode===null){
    //   setSignUpSuccess_State(false);

    // }
  }, [signUp_Sate_statusCode, initialValues]);

  const setFormValueBlank = () => {
    window.location.reload();
  };

  return (
    <>
      {!signUpSuccess_State ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <h2 className="text-2xl font-semibold mb-6 ">Sign Up</h2>
            <form
              action="#"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-3"
            >
              {/* Name */}
              <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                {errors.name && touched.name ? (
                  <small className={` text-red-600 text-xs font-semibold`}>
                    {errors.name}
                  </small>
                ) : (
                  <></>
                )}
              </div>

              <div className="">
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
              <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Email
                </label>
                <input
                  type="email"
                  name="confirmEmail"
                  value={values.confirmEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                {errors.confirmEmail && touched.confirmEmail ? (
                  <small className={` text-red-600 text-xs font-semibold`}>
                    {errors.confirmEmail}
                  </small>
                ) : (
                  <></>
                )}
              </div>

              <div className="">
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
              <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <small className={` text-red-600 text-xs font-semibold`}>
                    {errors.confirmPassword}
                  </small>
                ) : (
                  <></>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
              >
                {loading ? "Loading" : " Sign Up"}
              </button>
              <br />
              <small className={` text-red-600 text-xs font-semibold`}>
                {signUp_Sate_error_msg}
              </small>
            </form>
          </div>
        </div>
      ) : (
        <></>
      )}
      {signUpSuccess_State ? (
        <SignUpSuccess setSingUpFormBlank={setFormValueBlank} />
      ) : (
        <></>
      )}
    </>
  );
};

export default SignUpForm;
