import { useDispatch, useSelector } from "react-redux";
import { setDefaultSignUpRequestState } from "../../Features/SignUpForm_Slice";
import { Link } from "react-router-dom";

const SignUpSuccess = ({ setSingUpFormBlank }) => {
  const dispatch = useDispatch();
  // # Redux state for Sign up Api call res
  const signUp_Sate = useSelector((state) => state.signUp);
  const signUp_Sate_response = signUp_Sate?.response;
  const signUp_Sate_response_msg = signUp_Sate_response?.msg;

  const handelClickSingUpAgain = () => {
    setSingUpFormBlank();
    dispatch(setDefaultSignUpRequestState());
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-lg w-full sm:w-1/2 md:w-1/3 lg:w-1/4 space-y-3">
        <h2 className="text-2xl font-semibold mb-6">Sign Up Successful</h2>
        <p className="mb-4 text-green-600">{signUp_Sate_response_msg}</p>
        <p className="text-gray-700">
          You can now{" "}
          <Link to="/login" className="text-blue-500">
            login
          </Link>{" "}
          to your account.
        </p>
        <button
          type="submit"
          onClick={() => handelClickSingUpAgain()}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue hover:bg-blue-600"
        >
          Sign Up Again
        </button>
      </div>
    </div>
  );
};

export default SignUpSuccess;
