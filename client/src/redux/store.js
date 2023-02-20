import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./reducers/appointmentReducer.js";
import doctorReducer from "./reducers/doctorReducer.js";
import historyReducer from "./reducers/historyReducer.js";
import patientReducer from "./reducers/patientReducer.js";
import commentsReducer from "./reducers/commentsReducer"
const store = configureStore({
  reducer: {
    patient: patientReducer,
    history: historyReducer,
    appointment: appointmentReducer,
    doctor: doctorReducer,
    comments: commentsReducer
  },
});

export default store;
