import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminGetDetail } from "../../redux/reducers/adminReducer";
import swal from "sweetalert";
import logo from "../../assets/logoiCare.png";
import ManagePlans from "./ManagePlans/ManagePlans";
import ManageAdmins from "./ManageAdmins";
import {
  patientGetAll,
  patientSetActive,
} from "../../redux/reducers/patientReducer";
import {
  docrtorGetAll,
  doctorSetActive,
} from "../../redux/reducers/doctorReducer";
import { deleteComment } from "../../redux/reducers/commentsReducer";
import { plansGetAll } from "../../redux/reducers/plansReducer.js";
import { adminGetAll } from "../../redux/reducers/adminReducer.js";
import ToManage from "./ToManage";
import { Button, Typography } from "@mui/material";
//styles
const container = {
  width: "100%",
  height: "100vh",
  backgroundColor: "#f2f2f2",
};
const navBar = {
  backgroundColor: "#43B8C8",
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  alignItems: "center",
  flexDirection: "row",
  height: "8rem",
  width: "100%",
};
const casiContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "row",
};
const belowNav = {};
const Home = (props) => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin.detail);

  const patients = useSelector((state) => state.patient.list);
  const doctors = useSelector((state) => state.doctor.list);
  const location = useLocation();
  const [selected, setSelected] = useState({
    patients: false,
    doctors: false,
    comments: false,
    frequentQuestions: false,
    plans: false,
    admin: false,
  });

  const handleClickPatients = () => {
    dispatch(patientGetAll());
    setSelected({
      patients: true,
      doctors: false,
      comments: false,
      frequentQuestions: false,
      plans: false,
      admin: false,
    });
  };

  const handleClickDoctors = () => {
    dispatch(docrtorGetAll());
    setSelected({
      patients: false,
      doctors: true,
      comments: false,
      frequentQuestions: false,
      plans: false,
      admin: false,
    });
  };

  const handleClickComments = () => {
    setSelected({
      patients: false,
      doctors: false,
      comments: true,
      frequentQuestions: false,
      plans: false,
      admin: false,
    });
  };

  const handleClickFrequentQuestions = () => {
    setSelected({
      patients: false,
      doctors: false,
      comments: false,
      frequentQuestions: true,
      plans: false,
      admin: false,
    });
  };
  const handleClickPlans = () => {
    dispatch(plansGetAll());
    setSelected({
      patients: false,
      doctors: false,
      comments: false,
      frequentQuestions: false,
      plans: true,
      admin: false,
    });
  };
  const handleClickAdmins = () => {
    dispatch(adminGetAll());
    setSelected({
      patients: false,
      doctors: false,
      comments: false,
      frequentQuestions: false,
      plans: false,
      admin: true,
    });
  };
  const handleLogout = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("mailAdmin");
        window.location.href = "https://pf-grupo-2.vercel.app/";
      }
    });
  };

  useEffect(() => {
    const adminId = window.localStorage.getItem("idAdmin");

    if (adminId) {
      dispatch(adminGetDetail(adminId));
    }
  }, []);

  return (
    <div style={container}>
      <div style={casiContainer}>
        <img
          src={logo}
          alt="img"
          style={{
            width: "4.3vw",
            top: "0.5rem",
            left: "4.3rem",
            marginLeft: "3rem",
            paddingTop: "7px",
            marginRight: "2rem",
          }}
        />
        <div style={navBar}>
          <div style={{ marginLeft: "25rem", display: "flex", gap: "1rem" }}>
            <Button
              variant="contained"
              onClick={handleClickPatients}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Patients
            </Button>
            <Button
              variant="contained"
              onClick={handleClickDoctors}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Doctors
            </Button>
            <Button
              variant="contained"
              onClick={handleClickComments}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Comments
            </Button>
            <Button
              variant="contained"
              onClick={handleClickFrequentQuestions}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Frequent Questions
            </Button>
            <Button
              variant="contained"
              onClick={handleClickPlans}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Plans
            </Button>
            <Button
              variant="contained"
              onClick={handleClickAdmins}
              style={{ backgroundColor: "#307196" }}
            >
              Manage Admins
            </Button>
          </div>
          <div style={{ paddingRight: "2rem" }}>
            <Typography
              variant="body1"
              style={{ paddingBottom: "5px", fontWeight: "bold" }}
            >
              {admin?.name} {admin?.surname}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
      {/* DEBAJO DEL NAV */}
      <div style={belowNav}>
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
            updateActive={doctorSetActive}
            toRenderDoctors={selected.doctors}
          />
        )}
        {selected.comments && <ToManage toRenderComments={selected.comments} />}
        {selected.frequentQuestions && (
          <ToManage toRenderFrequentQuestions={selected.frequentQuestions} />
        )}

        {selected.plans && <ManagePlans />}
        {selected.admin && <ManageAdmins />}
      </div>
    </div>
  );
};

export default Home;
