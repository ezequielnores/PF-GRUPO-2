import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createFrequentAsk = createAsyncThunk(
  "frequentQuestions/create",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions`,
      data
    );
    return response.data;
  }
);

export const getFrequentAskById = createAsyncThunk(
  "frequentQuestions/getDetail",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions/${id}`
    );
    return response.data;
  }
);

export const getFrequentAskByAsk = createAsyncThunk(
  "frequentQuestions/getDetail",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions?ask=${data}`
    );
    return response.data;
  }
);

export const getAllFrequentQuestions = createAsyncThunk(
  "frequentQuestions/getAll",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions`
    );
    return response.data;
  }
);

export const updateFrequentAskById = createAsyncThunk(
  "frequentQuestions/update",
  async (id, data) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions/update/${id}`,
      data
    );
    return response.data;
  }
);

export const deleteFrequentAskById = createAsyncThunk(
  "frequentQuestions/delete",
  async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/frequentQuestions/delete/${id}`
    );
    return response.data;
  }
);

const frequentQuestionsSlice = createSlice({
  name: "frequentQuestions",
  initialState: {
    detail: {},
    list: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(createFrequentAsk.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(createFrequentAsk.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.detail = action.payload;
        })
        .addCase(createFrequentAsk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(getAllFrequentQuestions.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getAllFrequentQuestions.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.list = action.payload;
        })
        .addCase(getAllFrequentQuestions.rejected, (state, action) => {
            state.state = "failed";
            state.error = action.payload;
        })
        .addCase(getFrequentAskById.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getFrequentAskById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.detail = action.payload;
        })
        .addCase(getFrequentAskById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(getFrequentAskByAsk.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(getFrequentAskByAsk.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.detail = action.payload;
        })
        .addCase(getFrequentAskByAsk.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(updateFrequentAskById.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(updateFrequentAskById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.detail = action.payload
        })
        .addCase(updateFrequentAskById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
        .addCase(deleteFrequentAskById.pending, (state, action) => {
            state.status = "loading";
        })
        .addCase(deleteFrequentAskById.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.detail = action.payload;
        })
        .addCase(deleteFrequentAskById.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.payload;
        })
  },
});

export default frequentQuestionsSlice.reducer;