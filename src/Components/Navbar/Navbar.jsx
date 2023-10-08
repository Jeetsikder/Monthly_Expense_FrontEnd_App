import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearTokensFromLocalStorage } from "../../Utility/SaveGetCleanAccessTokenFromLoacl";

const navList_LoginFalse = [
  {
    item: "Sign up",
    path: "/sign-up",
    login: false,
    fun: () => {},
  },
  {
    item: "Log in",
    path: "log-in",
    login: false,
    fun: () => {},
  },
];

const navList_LoginTrue = [
  {
    item: "Dashboard",
    path: "dashboard",
    fun: () => {},
  },
  {
    item: "Sing out",
    path: "/",
    fun: () => {
      clearTokensFromLocalStorage();
      window.location.reload();
    },
  },
];

const Navbar = () => {
  const userLoginState = useSelector((state) => state.userState).login;
  const navList = userLoginState ? navList_LoginTrue : navList_LoginFalse;
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white  font-bold text-lg">
          <Link to="/">Monthly Expense</Link>
        </div>
        <div className="hidden sm:block">
          <ul className="space-x-4">
            {navList.map((element, index) => (
              <li
                key={element.item + element.path + index}
                className="inline-block"
                onClick={element.fun}
              >
                <Link
                  to={element.path}
                  className={`text-white hover:text-gray-300`}
                >
                  {element.item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleNavbar} className="text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden mt-2">
          <ul className="space-y-2">
            {navList.map((element, index) => (
              <li>
                <Link
                  to={element.path}
                  key={element.item + element.path + index}
                  onClick={element.fun}
                  className="block text-white hover:text-gray-300"
                >
                  {element.item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
