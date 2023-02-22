import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./reducers/appointmentReducer.js";
import doctorReducer from "./reducers/doctorReducer.js";
import historyReducer from "./reducers/historyReducer.js";
import patientReducer from "./reducers/patientReducer.js";
import commentsReducer from "./reducers/commentsReducer";
<<<<<<< HEAD
import attendReducer from "./reducers/attendReducer";
=======
import urgencyReducer from "./reducers/urgencyReducer";
import adminReducer from "./reducers/adminReducer";

>>>>>>> f2150f2dd51db816b50a2dc04483e536bfa0df1f
const store = configureStore({
  reducer: {
    patient: patientReducer,
    history: historyReducer,
    appointment: appointmentReducer,
    doctor: doctorReducer,
    comments: commentsReducer,
<<<<<<< HEAD
    attend: attendReducer,
=======
    urgency: urgencyReducer,
    admin: adminReducer
>>>>>>> f2150f2dd51db816b50a2dc04483e536bfa0df1f
  },
});

export default store;
