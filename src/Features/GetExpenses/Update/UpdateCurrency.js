import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokensFromLocalStorage } from "../../../Utility/SaveGetCleanAccessTokenFromLoacl";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_UPDATE_CURRENCIES}`;

export const UpdateCurrencyRequest = createAsyncThunk(
  "update/currency/request",
  async (payload, thunkApi) => {
    try {
      const request = await axios.patch(URL, payload, {
        headers: {
          "x-access-token": getTokensFromLocalStorage().accessToken,
        },
      });
      const response = request.data;
      return response;
    } catch (error) {
      console.log(error);
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const UpdateCurrencyRequestSlice = createSlice({
  name: "UpdateCurrencyRequest",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultUpdateCurrencyRequestState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UpdateCurrencyRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateCurrencyRequest.fulfilled, (state, action) => {
        state.success = action.payload?.success;
        state.statusCode = action.payload?.code;
        state.response = action.payload;
        state.loading = false;
        state.error = null;

        // * Set token in local storage
        const accessToken = state?.response?.msg?.accessToken;
        const refreshToken = state?.response?.msg?.refreshToken;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      })
      .addCase(UpdateCurrencyRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.statusCode = action.payload?.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload?.success;
      });
  },
});

export const { setDefaultUpdateCurrencyRequestState } =
  UpdateCurrencyRequestSlice.actions;

export default UpdateCurrencyRequestSlice.reducer;
