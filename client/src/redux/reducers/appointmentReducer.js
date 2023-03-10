import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const appointmentGetDetail = createAsyncThunk(
  "appointment/getOne",
  async (id, thunkAPI) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/${id}`
    );
    return response.data;
  }
);

export const appointmentGetAll = createAsyncThunk(
  "appointment/getAll",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/`
    );
    return response.data;
  }
);
export const appointmentsAttended = createAsyncThunk(
  "appointment/getAttended",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnsAttended`
    );
    return response.data;
  }
);
export const appointsNoAttended = createAsyncThunk(
  "appointment/getNoAttended",
  async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnsNoAttended`
    );
    return response.data;
  }
);

export const appointmentGetAllByPatientId = createAsyncThunk(
  "appointment/getByPatientId",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnsByPatient/${id}`
    );
    return response.data;
  }
);

export const appointmentGetAllByDoctorId = createAsyncThunk(
  "appointment/getByDoctorId",
  async (id) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnsByDoctor/${id}`
    );
    return response.data;
  }
);


export const appointmentGetByDateTime = createAsyncThunk(
  "appointment/getByDateTime",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnByDateAndHourAndDoctor`,data
    );
    return response.data;
  }
);
export const appointmentByDate = createAsyncThunk(
  "appointment/getByDate",
  async (data) => {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/turns/turnsByDate`,data
    );
    return response.data;
  }
);

export const appointmentCreate = createAsyncThunk(
  "appointment/create",
  async (data) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/turns`,
      data
    );
    return response.data;
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
      .addCase(appointmentGetAllByDoctorId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentGetAllByDoctorId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(appointmentGetAllByDoctorId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentGetAllByPatientId.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentGetAllByPatientId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(appointmentGetAllByPatientId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentGetByDateTime.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentGetByDateTime.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.detail = action.payload;
      })
      .addCase(appointmentGetByDateTime.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentsAttended.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentsAttended.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(appointmentsAttended.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointsNoAttended.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointsNoAttended.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(appointsNoAttended.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(appointmentByDate.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(appointmentByDate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(appointmentByDate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default appointmentSlice.reducer;
