import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const appointmentGetDetail = createAsyncThunk(
  "appointment/getOne",
  async (id, thunkAPI) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/turns/${id}`)
      .then((response) => {
        return response.data;
      });
  }
);

export const appointmentGetAll = createAsyncThunk(
  "appointment/getAll",
  async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/turns/`)
      .then((response) => {
        return response.data;
      });
  }
);

export const appointmentCreate = createAsyncThunk(
  "appointment/create",
  async (data) => {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/turns`, data)
      .then((response) => {
        return response.data;
      });
  }
);

const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    detail: {},
    list: [],
    listAll: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(appointmentGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(appointmentGetDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(appointmentGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentCreate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(appointmentCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default appointmentSlice.reducer;
