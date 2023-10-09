import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function HomePage() {
  const userLoginState = useSelector((state) => state.userState).login;
  return (
    <>
      <section className=" w-full min-h-screen flex justify-center items-center">
        <button className=" px-3 py-3 rounded-xl bg-blue-600  text-white font-bold">
          <Link to={!userLoginState ? "/sign-up" : "/dashboard"}>
            {!userLoginState ? "Get Started" : "Go to Dashboard"}
          </Link>
        </button>
      </section>
    </>
  );
}
