import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const adminGetDetail = createAsyncThunk(
    "admin/getDetail",
    async (id, thunkAPI) => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admins/${id}`);
        return response.data;
    }
);

export const adminLogin = createAsyncThunk(
    "admin/login",
    async (data, thunkAPI) => {
        const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/admins/login`, data);
        return response.data;
    }
);

export const adminRegister = createAsyncThunk(
    "admin/register",
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

export const adminGetAll = createAsyncThunk(
    "admin/getAll",
    async () => {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/admins/`);
        return response.data;
    }
);

export const adminUpdate = createAsyncThunk(
    "admin/editById",
    async ({ id, data }) => {
        const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/admins/edit/${id}`, data);
        return response.data;
    }
);

const adminSlice = createSlice({
    name: "admin",
    state: {
        detail: {},
        list: [],
        status: "idle",
        error: null,
        loggedIn: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(adminGetDetail.pending, (state, action) => state.status = "loading")
            .addCase(adminGetDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.detail = action.payload;
            })
            .addCase(adminGetDetail.rejected, (state, action) => {
                state.state = "failed";
                state.detail = action.payload;
            })
            .addCase(adminGetAll.pending, (state, action) => state.status = "loading")
            .addCase(adminGetAll, (state, action) => {
                state.status = "succeeded";
                state.list = action.payload;
            })
            .addCase(adminGetAll.rejected, (state, action) => {
                state.status = "failed";
                state.list = action.payload;
            })
            .addCase(adminLogin.pending, (state, action) => state.status = "loading")
            .addCase(adminLogin.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.loggedIn = action.payload;
            })
            .addCase(adminLogin.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            })
    }
});

export default adminSlice.reducer;