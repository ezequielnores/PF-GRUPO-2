import { createReducer } from "@reduxjs/toolkit";
import { patientGetDetail } from "./actions";

const initialState = {};

export const rootReducer = createReducer(initialState, (builder) => {
  builder.addCase(patientGetDetail.fulfilled, (state, action) => {
    state.patient = action.payload;
  });
});
