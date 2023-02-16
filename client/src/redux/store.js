import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./reducers/appointmentReducer.js";
import historyReducer from "./reducers/historyReducer.js";
import patientReducer from "./reducers/patientReducer.js";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    history: historyReducer,
    appointment:appointmentReducer,
    
  },
});

export default store;
