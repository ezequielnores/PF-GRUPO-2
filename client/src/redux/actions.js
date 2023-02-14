import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const PATIENT_CREATE = "PATIENT_CREATE";
export const PATIENT_EDIT = "PATIENT_EDIT";
export const PATIENT_GETDETAIL = "PATIENT_GETDETAIL";
export const PATIENT_ERROR = "PATIENT_ERROR";

export const DOCTOR_CREATE = "DOCTOR_CREATE";
export const DOCTOR_EDIT = "DOCTOR_EDIT";
export const DOCTOR_GETALL = "DOCTOR_GETALL";
export const DOCTOR_GETDETAIL = "DOCTOR_GETDETAIL";

export const patientGetDetail = createAsyncThunk(
  PATIENT_GETDETAIL,
  async (id, thunkAPI) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/patient/${id}`)
      .then((response) => {
        return response.data;
      });
  }
);

export const doctorGetDetail = createAsyncThunk(
  DOCTOR_GETDETAIL,
  async (id, thunkAPI) => {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/doctor/${id}`)
      .then((response) => {
        return response.data;
      });
  }
);
