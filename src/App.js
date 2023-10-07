import "./App.css";
import { BrowserRouter as Main, Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar/Navbar";
import SignUpForm from "./Components/SignUpForm/SignUpForm";
import Login from "./Components/Login/Login";
import Dashboard from "./Components/Dashboard/Dashboard";
import { useDispatch, useSelector } from "react-redux";
import { getTokensFromLocalStorage } from "./Utility/SaveGetCleanAccessTokenFromLoacl";
import { useEffect } from "react";
import { setUserLogin } from "./Features/UserState";
import NotFound404 from "./Components/NotFound/NotFound404";

function App() {
  const dispatch = useDispatch();
  const { logIn: loginStateLocalStorage } = getTokensFromLocalStorage();
  useEffect(() => {
    if (loginStateLocalStorage) {
      dispatch(setUserLogin());
    }
  });
  const userLoginState = useSelector((state) => state.userState).login;

  return (
    <div className="App">
      <Main>
        <Navbar />
        <Routes>
          <Route path="/sign-up" Component={SignUpForm}></Route>
          <Route path="/log-in" Component={Login}></Route>
          {/* Login Components */}
          {userLoginState ? (
            <Route path="/dashboard" Component={Dashboard}></Route>
          ) : (
            <></>
          )}

          <Route path="*" Component={NotFound404}></Route>
        </Routes>
      </Main>
    </div>
  );
}

export default App;
// log-in
