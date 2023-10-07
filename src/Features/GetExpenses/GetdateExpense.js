import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokensFromLocalStorage } from "../../Utility/SaveGetCleanAccessTokenFromLoacl";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_FILTER_EXPENSE_BY_DATE}`;

// # Create a config object for header
const { accessToken } = getTokensFromLocalStorage();

const config = {
  headers: {
    "x-access-token": accessToken,
  },
};
export const GetdateExpenseRequest = createAsyncThunk(
  "get/date/expense",
  async (payload, thunkApi) => {
    try {
      const request = await axios.post(URL, payload, config);
      const response = request.data;

      return response;
    } catch (error) {
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const GetdateExpenseRequestSlice = createSlice({
  name: "GetdateExpenseRequest",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultGetdateExpenseRequestState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetdateExpenseRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetdateExpenseRequest.fulfilled, (state, action) => {
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
      .addCase(GetdateExpenseRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.statusCode = action.payload?.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload?.success;
      });
  },
});

export const { setDefaultGetdateExpenseRequestState } =
  GetdateExpenseRequestSlice.actions;

export default GetdateExpenseRequestSlice.reducer;
