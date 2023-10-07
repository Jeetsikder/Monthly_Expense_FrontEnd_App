import { createSlice } from "@reduxjs/toolkit";

export const userStateSlice = createSlice({
  name: "userState",
  initialState: {
    login: false,
  },
  reducers: {
    setUserLogin: (state) => {
      state.login = true;
    },
  },
});

export const { setUserLogin } = userStateSlice.actions;

export default userStateSlice.reducer;
