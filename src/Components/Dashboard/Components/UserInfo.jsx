import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserProfileRequest } from "../../../Features/GetUserProfile";

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

  // # Set the values and display
  useEffect(() => {
    if (!loading && successRes && statusCode === 200) {
      const { payload: successResPayload } = successRes;
      const { name: userName, email: userEmail } = successResPayload;
      setGetUserName(userName);
      setGetUserEmail(userEmail);
    } else {
      if (loading && errorRes) {
        const { msg: errorResMsg } = errorRes;
        setGetUserName(errorResMsg);
        setGetUserEmail(errorResMsg);
      }
    }
  }, [loading, successRes, statusCode, errorRes]);

  return (
    <div className=" h-fit bg-gray-100">
      <div className="container mx-auto py-8">
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
        </div>
      </div>
    </div>
  );
}
