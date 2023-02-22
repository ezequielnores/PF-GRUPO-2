import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const urgencyGetDetail = createAsyncThunk(
  "urgency/getOne",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/urgency/${id}`
    );
    return response.data;
  }
);

export const urgencyGetAll = createAsyncThunk("urgency/getAll", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/urgency`
  );
  return response.data;
});

export const urgencyCreate = createAsyncThunk(
  "urgency/create",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/urgency`,
      data
    );
    return response.data;
  }
);
export const urgencyEdit = createAsyncThunk(
  "urgency/updateById",
  async ({ id, data }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/urgency/${id}`,
      data
    );
    return response.data;
  }
);

const appointmentSlice = createSlice({
  name: "urgency",
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
      .addCase(urgencyGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(urgencyGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(urgencyGetDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(urgencyGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(urgencyGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(urgencyGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(urgencyCreate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(urgencyCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(urgencyCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
