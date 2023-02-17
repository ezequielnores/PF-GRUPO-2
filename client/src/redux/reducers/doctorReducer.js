import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const doctorLogin = createAsyncThunk(
  "doctor/login",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/doctor/login}`,
      data
    );

    return response.data;
  }
);

export const doctorGetDetail = createAsyncThunk(
  "doctor/get",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`
    );

    return response;
  }
);

export const docrtorGetAll = createAsyncThunk("doctor/getAll", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/doctor/`
  );
  return response;
});

export const doctorAdd = createAsyncThunk("doctor/addById", async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_URL}/doctor`,
    data
  );
  return response;
});

export const doctorUpdate = createAsyncThunk(
  "doctor/updateById",
  async (id, data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/doctor/update/${id}`,
      data
    );
    return response;
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    detail: {},
    list: [],
    status: "idle",
    error: null,
    loggedIn: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(doctorGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(doctorGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(doctorGetDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(docrtorGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(docrtorGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(docrtorGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(doctorAdd.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(doctorAdd.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(doctorAdd.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(doctorLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(doctorLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = action.payload;
      })
      .addCase(doctorLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default doctorSlice.reducer;
