import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = `${process.env.REACT_APP_BACKEND_HOSTED_ON}${process.env.REACT_APP_BACKEND_END_POINT_SIGN_UP}`;

export const generateSignUpRequest = createAsyncThunk(
  "generate/SingUp/request",
  async (payload, thunkApi) => {
    try {
      const request = await axios.post(URL, payload);
      const response = request.data;
      return response;
    } catch (error) {
      //* You can handle error cases and return custom error messages or perform additional actions here
      return thunkApi.rejectWithValue(error?.response?.data);
    }
  }
);

export const generateSignUpRequestSlice = createSlice({
  name: "generateSignUpRequest",
  initialState: {
    response: null,
    success: false,
    statusCode: null,
    error: null,
    loading: null,
  },
  reducers: {
    setDefaultSignUpRequestState: (state) => {
      state.response = null;
      state.success = false;
      state.statusCode = null;
      state.error = null;
      state.loading = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateSignUpRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateSignUpRequest.fulfilled, (state, action) => {
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
      .addCase(generateSignUpRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.statusCode = action.payload?.code;
        state.loading = false;
        state.response = null;
        state.success = action.payload?.success;
      });
  },
});

export const { setDefaultSignUpRequestState } =
  generateSignUpRequestSlice.actions;

export default generateSignUpRequestSlice.reducer;
