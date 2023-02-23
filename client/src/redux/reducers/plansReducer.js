import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const postPlans = createAsyncThunk(
  "plans/create",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/plans`,
      data
    );
    return response.data;
  }
);

export const plansGetAll = createAsyncThunk(
  "plans/getAll",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/plans`
    );
    return response.data;
  }
);


export const plansEditById = createAsyncThunk(
  "plans/editById",
  async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/plans/${id}`
    );
    return response.data;
  }
);


export const deletePlan = createAsyncThunk(
  "plans/deleteById",
  async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/plans/${id}`
    );
    return response.data;
  }
);



const plansSlice = createSlice({
  name: "plans",
  initialState: {
    detail: {},
    listAll:[],
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postPlans.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postPlans.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(postPlans.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(plansEditById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(plansEditById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(plansEditById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(plansGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(plansGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(plansGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deletePlan.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
  },
});

export default plansSlice.reducer;