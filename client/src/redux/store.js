import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./reducers/appointmentReducer.js";
import doctorReducer from "./reducers/doctorReducer.js";
import historyReducer from "./reducers/historyReducer.js";
import patientReducer from "./reducers/patientReducer.js";
import commentsReducer from "./reducers/commentsReducer";
import attendReducer from "./reducers/attendReducer";
import urgencyReducer from "./reducers/urgencyReducer";
import adminReducer from "./reducers/adminReducer";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    history: historyReducer,
    appointment: appointmentReducer,
    doctor: doctorReducer,
    comments: commentsReducer,
    attend: attendReducer,
    urgency: urgencyReducer,
    admin: adminReducer
  },
});

export default store;
