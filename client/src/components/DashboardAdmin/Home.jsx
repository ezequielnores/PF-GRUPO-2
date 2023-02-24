import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminGetDetail } from "../../redux/reducers/adminReducer";
import {
  patientGetAll,
  patientSetActive,
} from "../../redux/reducers/patientReducer";
import {
  docrtorGetAll,
  doctorUpdate,
} from "../../redux/reducers/doctorReducer";
import { commentsGetAll } from "../../redux/reducers/commentsReducer";
import ToManage from "./ToManage";

const Home = (props) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.detail);
  const patients = useSelector((state) => state.patient.list);
  const doctors = useSelector((state) => state.doctor.list);
  const comments = useSelector((state) => state.comments.list);
  const location = useLocation();
  const [selected, setSelected] = useState({
    patients: false,
    doctors: false,
    comments: false,
    frequentQuestions: false,
  });

  const handleClickPatients = () => {
    dispatch(patientGetAll());
    setSelected({
      patients: true,
      doctors: false,
      comments: false,
      frequentQuestions: false,
    });
  };

  const handleClickDoctors = () => {
    dispatch(docrtorGetAll());
    setSelected({
      patients: false,
      doctors: true,
      comments: false,
      frequentQuestions: false,
    });
  };

  const handleClickComments = () => {
    dispatch(commentsGetAll());
    setSelected({
      patients: false,
      doctors: false,
      comments: true,
      frequentQuestions: false,
    });
  };

  const handleClickFrequentQuestions = () => {
    dispatch(commentsGetAll());
    setSelected({
      patients: false,
      doctors: false,
      comments: false,
      frequentQuestions: true,
    });
  };

  const handleLogout = () => {
    props.setAdmin(null);
    window.localStorage.removeItem("idAdmin");
  };

  useEffect(() => {
    const adminId = window.localStorage.getItem("idAdmin");
    dispatch(adminGetDetail(adminId));
  }, []);

  console.log(patients);

  return (
    <div style={{ position: "relative" }}>
      <h1>Administration</h1>
      <h2>
        Admin: {admin?.name} {admin?.surname}
      </h2>
      <button onClick={handleLogout}>Logout</button>

      {location.pathname.endsWith("/HomeAdmin") && (
        <div>
          <button onClick={handleClickPatients}>Manage Patients</button>
          <button onClick={handleClickDoctors}>Manage Doctors</button>
          <button onClick={handleClickComments}>Manage Comments</button>
          <button onClick={handleClickFrequentQuestions}>
            Manage Frequent Questions
          </button>

          <div>
            {selected.patients && (
              <ToManage
                entities={patients}
                updateActive={patientSetActive}
                toRenderPatients={selected.patients}
              />
            )}
            {selected.doctors && (
              <ToManage
                entities={doctors}
                updateActive={doctorUpdate}
                toRenderDoctors={selected.doctors}
              />
            )}
            {selected.comments && (
              <ToManage
                entities={comments}
                update={comments}
                toRenderComments={selected.comments}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
