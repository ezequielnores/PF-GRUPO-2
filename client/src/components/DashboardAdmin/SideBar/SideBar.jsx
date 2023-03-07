import React from "react";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import swal from "sweetalert";
//style
const butonsitos = {
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  alignItems: "center",
};
const SideBar = ({ path }) => {
  //delete id de localstorage, deslogeo
  const handleLogOut = (e) => {
    e.preventDefault();
    swal({
      title: "Are you sure you want to log out?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.removeItem("idAdmin");
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  return (
    <div>
      <div style={{ position: "fixed", left: "0", top: "9rem" }}>
        <Stack spacing={6}>
          <Stack spacing={1}>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeAdmin/ManagePatients">
                <div style={butonsitos}>
                  <AccountCircleIcon style={{ color: "#c2c1c1" }} />
                  <p style={{ marginLeft: "1rem" }}>Manage Patients</p>
                </div>
              </Link>
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeAdmin/ManageDoctors">
                <div style={butonsitos}>
                  <CalendarMonthIcon style={{ color: "#c2c1c1" }} />
                  <p style={{ marginLeft: "1rem" }}>Manage Doctors</p>
                </div>
              </Link>
            </button>
            <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeAdmin/ManageComments">
                <div style={butonsitos}>
                  <MedicalServicesIcon style={{ color: "#c2c1c1" }} />
                  <p style={{ marginLeft: "1rem" }}>Manage Comments</p>
                </div>
              </Link>
            </button>
            {/* <button style={{ border: "none", backgroundColor: "transparent" }}>
              <Link to="/HomeAdmin/ManageFQ">
                <div style={butonsitos}>
                  <RateReviewIcon style={{ color: "#c2c1c1" }} />
                  <p style={{ marginLeft: "1rem" }}>
                    Manage Frequent Questions
                  </p>
                </div>
              </Link>
            </button> */}
          </Stack>
          <button
            style={{
              border: "none",
              borderRadius: "0  1rem 1rem 0",
              backgroundColor: "#307196",
            }}
            onClick={(e) => handleLogOut(e)}
          >
            <Link>
              <div style={{ color: "white" }}>
                <LogoutIcon />
                Logout
              </div>
            </Link>
          </button>
        </Stack>
      </div>
    </div>
  );
};
export default SideBar;
