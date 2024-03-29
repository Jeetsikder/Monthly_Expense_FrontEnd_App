import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokensFromLocalStorage } from "../Utility/SaveGetCleanAccessTokenFromLoacl";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_GET_USER_INFO}`;

export const GetUserProfileRequest = createAsyncThunk(
  "get/profile/info",
  async (payload, thunkApi) => {
    try {
      const request = await axios.get(URL, {
        headers: {
          "x-access-token": getTokensFromLocalStorage().accessToken,
        },
      });
      const response = request.data;
      return response;
    } catch (error) {
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const GetUserProfileRequestSlice = createSlice({
  name: "GetUserProfileInfo",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultGetUserProfileRequestState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },
    modifyCurrency: (state, action) => {
      state.response.payload.currency.code = action.payload?.code;
      state.response.payload.currency.symbol = action.payload?.symbol;
      state.response.payload.currency.name = action.payload?.name;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetUserProfileRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetUserProfileRequest.fulfilled, (state, action) => {
        state.success = action.payload?.success;
        state.statusCode = action.payload?.code;
        state.response = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(GetUserProfileRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.statusCode = action.payload?.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload?.success;
      });
  },
});

export const { setDefaultGetUserProfileRequestState, modifyCurrency } =
  GetUserProfileRequestSlice.actions;

export default GetUserProfileRequestSlice.reducer;
