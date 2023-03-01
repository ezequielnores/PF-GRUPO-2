import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const patientGetDetail = createAsyncThunk(
  "patient/getDetail",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/patient/${id}`
    );
    return response.data;
  }
);

export const getPatientByMail = createAsyncThunk(
  "patient/getPatientByMail",
  async (data, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/patient/patientByMail?mail=${data.mail}`
    );
    return response.data;
  }
);

export const patientLogin = createAsyncThunk(
  "patient/login",
  async (data, thunkAPI) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/patient/login`,
      data
    );
    return response.data;
  }
);

export const patientRegister = createAsyncThunk(
  "patient/register",
  async (data) => {
    const response = await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/patient`, data)
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

export const patientGetAll = createAsyncThunk("patient/getAll", async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_URL}/patient/`
  );
  return response.data;
});

export const patientUpdate = createAsyncThunk(
  "patient/editById",
  async ({ id, data }) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/patient/edit/${id}`,
      data
    );
    return response.data;
  }
);

export const setMakeDisableAdmin = createAsyncThunk(
  "patient/editById",
  async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/patient/setMakeDisableAdmin/${id}`
    );
    return response.data;
  }
);

export const patientSetActive = createAsyncThunk(
  "patient/setActive",
  async (id) => {
    const response = await axios.put(
      `${process.env.REACT_APP_BACKEND_URL}/patient/setActive/${id}`
    );
    return response.data;
  }
);

const patientSlice = createSlice({
  name: "patient",
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
      })
      .addCase(patientLogin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patientLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedIn = action.payload;
      })
      .addCase(patientLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(patientSetActive.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(patientSetActive.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(patientSetActive.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(getPatientByMail.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getPatientByMail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(getPatientByMail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(setMakeDisableAdmin.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(setMakeDisableAdmin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(setMakeDisableAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default patientSlice.reducer;
