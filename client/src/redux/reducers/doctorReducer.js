import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const doctorGetDetail = createAsyncThunk(
  "doctor/get",
  async (id, thunkAPI) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`)
      .then((response) => {
        return response.data;
      });
  }
);

export const docrtorGetAll = createAsyncThunk("doctor/getAll", async () => {
  await axios
    .get(`${process.env.REACT_APP_BACKEND_URL}/doctor/`)
    .then((response) => {
      return response.data;
    });
});

export const doctorAdd = createAsyncThunk("doctor/addById", async (data) => {
  await axios
    .post(`${process.env.REACT_APP_BACKEND_URL}/doctor`, data)
    .then((response) => {
      return response.data;
    });
});

export const doctorUpdate = createAsyncThunk(
  "doctor/updateById",
  async (id, data) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/doctor/update/${id}`, data)
      .then((response) => {
        return response.data;
      });
  }
);

const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    detail: {},
    list: [],
    status: "idle",
    error: null,
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
      });
  },
});

export default doctorSlice.reducer;
