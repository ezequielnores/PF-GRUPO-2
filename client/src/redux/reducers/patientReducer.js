import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const patientGetDetail = createAsyncThunk(
  "patient/getDetail",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/patient/${id}`
    );
    return response;
  }
);

export const patientGetAll = createAsyncThunk("patient/getAll", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/patient/`
  );
  return response;
});

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    detail: {},
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(patientGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patientGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(patientGetDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(patientGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patientGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(patientGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;
