import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokensFromLocalStorage } from "../Utility/SaveGetCleanAccessTokenFromLoacl";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_ADD_EXPENSES}`;

export const AddExpenseRequest = createAsyncThunk(
  "add/expense/request",
  async (payload, thunkApi) => {
    try {
      const request = await axios.post(URL, payload, {
        headers: {
          "x-access-token": getTokensFromLocalStorage().accessToken,
        },
      });
      const response = request.data;
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const AddExpenseRequestSlice = createSlice({
  name: "AddExpenseRequest",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultAddExpenseRequestState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(AddExpenseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddExpenseRequest.fulfilled, (state, action) => {
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
      .addCase(AddExpenseRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.statusCode = action.payload?.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload?.success;
      });
  },
});

export const { setDefaultAddExpenseRequestState } =
  AddExpenseRequestSlice.actions;

export default AddExpenseRequestSlice.reducer;
