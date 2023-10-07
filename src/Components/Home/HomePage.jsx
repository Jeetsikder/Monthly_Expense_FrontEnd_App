import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className=" w-full min-h-screen flex justify-center items-center">
        <button className=" px-3 py-3 rounded-xl bg-blue-600  text-white font-bold">
          <Link to="/sign-up">Get Started</Link>
        </button>
      </section>
    </>
  );
}
