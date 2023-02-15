import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const historyGetDetail = createAsyncThunk(
  "medicalHistory/get",
  async (id, thunkAPI) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/patient/${id}`)
      .then((response) => {
        return response.data;
      });
  }
);



///addRegister/:id

export const historyGetAll = createAsyncThunk(
  "medicalHistory/getAll",
  async () => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/medicalHistory/`)
      .then((response) => {
        return response.data;
      });
  }
);

export const historyAddById = createAsyncThunk(
  "medicalHistory/addById",
  async (id, data) => {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/medicalHistory/addRegister/${id}`,
        data
      )
      .then((response) => {
        return response.data;
      });
  }
);

const medicalHistorySlice = createSlice({
  name: "medicalHistory",
  initialState: {
    detail: {},
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(historyGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(historyGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(historyGetDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(historyGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(historyGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(historyGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default medicalHistorySlice.reducer;
