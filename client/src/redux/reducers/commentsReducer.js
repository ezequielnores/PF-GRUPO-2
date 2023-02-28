import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const postComments = createAsyncThunk(
  "turns/create",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/comments`,
      data
    );
    return response.data;
  }
);

export const commentsGetAll = createAsyncThunk(
  "comments/getAll",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/comments`
    );
    return response.data;
  }
);


export const commentsById = createAsyncThunk(
  "comments/getById",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/comments/${id}`
    );
    return response.data;
  }
);


export const editComments = createAsyncThunk(
  "comments/edit",
  async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/comments/edit/${id}`
    );
    return response.data;
  }
);


export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (id) => {
    const response = await axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/comments/delete/${id}`
    );
    return response.data;
  }
);



export const commentsByDoctor = createAsyncThunk(
  "comments/getByIdDoctor",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/comments/doctor/${id}`
    );
    return response.data;
  }
);

export const commentsByDoctor2 = createAsyncThunk(
  "comments/getByMailDoctor",
  async (mail) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/comments/commentsByMailDoctor?mail=${mail}`
    );
    return response.data;
  }
);

export const commentsByPatient = createAsyncThunk(
  "comments/getByIdPatient",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/comments/patient/${id}`
    );
    return response.data;
  }
);

const commentsSlice = createSlice({
  name: "comments",
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
      .addCase(postComments.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(postComments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(postComments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentsById.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(commentsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentsGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentsGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(commentsGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentsByDoctor.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentsByDoctor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(commentsByDoctor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentsByPatient.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentsByPatient.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(commentsByPatient.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(commentsByDoctor2.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(commentsByDoctor2.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(commentsByDoctor2.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;