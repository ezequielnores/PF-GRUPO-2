import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./reducers/appointmentReducer.js";
import doctorReducer from "./reducers/doctorReducer.js";
import historyReducer from "./reducers/historyReducer.js";
import patientReducer from "./reducers/patientReducer.js";
import commentsReducer from "./reducers/commentsReducer";
import adminReducer from "./reducers/adminReducer.js";
const store = configureStore({
  reducer: {
    patient: patientReducer,
    history: historyReducer,
    appointment: appointmentReducer,
    doctor: doctorReducer,
    comments: commentsReducer,
    admin: adminReducer,
  },
});

export default store;
