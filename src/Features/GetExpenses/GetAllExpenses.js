import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getTokensFromLocalStorage } from "../../Utility/SaveGetCleanAccessTokenFromLoacl";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_BACKEND_END_POINT_GET_ALL_EXPENSES}`;

const { accessToken } = getTokensFromLocalStorage();
// Create a config object for header
const config = {
  headers: {
    "x-access-token": accessToken,
  },
};
export const GetAllExpense = createAsyncThunk(
  "get/all/expense",
  async (payload, thunkApi) => {
    try {
      const request = await axios.get(URL, config);
      const response = request.data;

      return response;
    } catch (error) {
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const GetAllExpenseSlice = createSlice({
  name: "GetAllExpense",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultGetAllExpenseState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },

    setGetAllExpenseStateResponsePayload: (state, action) => {
      state.response.payload = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAllExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllExpense.fulfilled, (state, action) => {
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
      .addCase(GetAllExpense.rejected, (state, action) => {
        console.log(action);

        state.error = action.payload;
        state.statusCode = action.payload.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload.success;
      });
  },
});

export const {
  setDefaultGetAllExpenseState,
  setGetAllExpenseStateResponsePayload,
} = GetAllExpenseSlice.actions;

export default GetAllExpenseSlice.reducer;
