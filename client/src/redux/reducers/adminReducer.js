import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminGetAll = createAsyncThunk("admins/getAll", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/admins`
  );
  return response.data;
});

export const adminGetDetail = createAsyncThunk(
  "admins/getDetail",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admins/${id}`
    );
    return response.data;
  }
);

export const adminGetDetailForEdit = createAsyncThunk(
  "admins/getDetailForEdit",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/admins/${id}`
    );
    return response.data;
  }
);

export const adminRegister = createAsyncThunk(
  "admins/register",
  async (data) => {
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/admins`, data)
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        throw new Error("Failed");
      });
    console.log(response);
    return response.data;
  }
);

export const adminLogin = createAsyncThunk(
  "admins/login",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/admins/login`,
      data
    );
    return response.data;
  }
);

export const adminEdit = createAsyncThunk(
  "admins/editById",
  async ({ id, data }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/admins/edit/${id}`,
      data
    );
    return response.data;
  }
);

export const deleteAdmin = createAsyncThunk("admins/deleteById", async (id) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BACKEND_URL}/admins/delete/${id}`
  );
  return response.data;
});

export const disableAdmin = createAsyncThunk(
  "admins/disableById",
  async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/admins/disable/${id}`
    );
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    detail: {},
    listAll: [],
    status: "idle",
    error: null,
    loggedIn: {},
    forEdit: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(adminRegister.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(adminRegister.rejected, (state, action) => {
        state.state = "failed";
        state.error = action.payload;
      })
      .addCase(adminGetDetail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminGetDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(adminGetDetail.rejected, (state, action) => {
        state.state = "failed";
        state.detail = action.payload;
      })
      .addCase(adminGetAll.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminGetAll.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listAll = action.payload;
      })
      .addCase(adminGetAll.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(adminLogin.pending,(state, action) => {
        state.status = "loading";
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(deleteAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(deleteAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(disableAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(disableAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(disableAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(adminGetDetailForEdit.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(adminGetDetailForEdit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forEdit = action.payload;
      })
      .addCase(adminGetDetailForEdit.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default adminSlice.reducer;
