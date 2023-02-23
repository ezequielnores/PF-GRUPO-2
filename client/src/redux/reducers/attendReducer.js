import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const attendPatientTurns = createAsyncThunk(
    "attend/attendPatient",
    async (data) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/turns/${data}`
        )
        return response.data;
    }
);

export const attendedPatientTurns = createAsyncThunk(
    "attend/attendedPatient",
    async (data) => {
        const id = data;
        // console.log(id, attended)
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/turns/update/${id}`,{attended:true})
        return response.data;
    }
);
export const createMedicalHistory = createAsyncThunk(
    "attend/createMedicalHistory",
    async (data) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/medicalHistory`,data)
        return response.data;
    }
);

export const attendPatientUrgency = createAsyncThunk(
    "attend/attendPatientUrgency",
    async (data) => {
        const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/urgency/${data}`
        )
        return response.data;
    }
);

export const attendedPatientUrgency = createAsyncThunk(
    "attend/attendedPatientUrgency",
    async (data) => {
        const {id, ...rest} = data;
        const response = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/urgency/${id}`,rest)
        return response.data;
    }
);

const attendSlice = createSlice({
    name: "attend",
    initialState: {
        details: {},
        status: "idle",
        error: null,
        idTurno:""
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(attendPatientTurns.pending, (state, action) => {
                state.status = "loading";
            })
            .addCase(attendPatientTurns.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.details = action.payload;
            })
            .addCase(attendPatientTurns.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    }
});

export default attendSlice.reducer;