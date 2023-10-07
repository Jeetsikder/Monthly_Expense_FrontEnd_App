const ACCESS_TOKEN_KEY = "x-access-token";
const AUTHORIZATION_KEY = "Authorization";
const LOGIN_KEY = "logIn";
export const saveTokensToLocalStorage = (accessToken, logIn) => {
  const authorizationObject = {
    [LOGIN_KEY]: logIn,
    [ACCESS_TOKEN_KEY]: accessToken,
  };
  localStorage.setItem(AUTHORIZATION_KEY, JSON.stringify(authorizationObject));
};

export const getTokensFromLocalStorage = () => {
  const authorizationString = localStorage.getItem(AUTHORIZATION_KEY);
  if (authorizationString) {
    const authorizationObject = JSON.parse(authorizationString);
    const accessToken = authorizationObject[ACCESS_TOKEN_KEY];
    const logIn = authorizationObject[LOGIN_KEY];
    return { accessToken, logIn };
  }
  return { accessToken: null, logIn: false };
};

export const clearTokensFromLocalStorage = () => {
  localStorage.removeItem(AUTHORIZATION_KEY);
};
// saveTokensToLocalStorage(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJfSWQiOiI2NTFkMmViYzJmNDg4NmQzODlkYWM1YTIifSwiaWF0IjoxNjk2NDk0ODY3LCJleHAiOjE2OTcwOTk2Njd9.JhVNS6jh9RtBnNYTcupXLPW4EdWwJMsQOh-pLiXlBU8",
//   true
// );
