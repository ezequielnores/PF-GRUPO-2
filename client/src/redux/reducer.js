import { createReducer } from "@reduxjs/toolkit";
import { patientGetDetail,doctorGetDetail } from "./actions";
import { patientGetDetail, doctorGetDetail } from "./actions";

const initialState = { patientDetail: {}, doctorDetail: {} };

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(patientGetDetail.fulfilled, (state, action) => {
      state.patientDetail = action.payload;
    })
    .addCase(doctorGetDetail.fulfilled, (state, action) => {
      state.doctorDetail = action.payload;
    });
});
