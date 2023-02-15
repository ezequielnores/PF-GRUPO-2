import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientReducer.js";

const store = configureStore({
  reducer: {
    patient: patientReducer,
  },
});

export default store;
