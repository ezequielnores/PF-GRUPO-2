import { Link } from "react-router-dom";
import style from "./SideBar.module.css";
import Stack from "@mui/material/Stack";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import RateReviewIcon from "@mui/icons-material/RateReview";
import LogoutIcon from "@mui/icons-material/Logout";
import swal from "sweetalert";

const SideBar = ({ open, handleOpen }) => {
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
        localStorage.removeItem("idMedic");
        window.location.href = "http://localhost:3000/";
      }
    });
  };
  return (
    <div>
      <div style={{ position: "fixed", left: "0", top: "9rem" }}>
        <Stack spacing={6}>
          <Stack spacing={1} width={open ? 200 : 45}>
            <button onClick={handleOpen} style={{ textAlign: "end" }}>
              <MenuIcon />
            </button>
            <button>
              <Link to="/HomeMedic/Profile">
                {open ? (
                  <div className={style.divbutton}>
                    <AccountCircleIcon />
                    Profile
                  </div>
                ) : (
                  <AccountCircleIcon />
                )}
              </Link>
            </button>
            <button>
              <Link to="/HomeMedic/Agenda">
                {open ? (
                  <div className={style.divbutton}>
                    <CalendarMonthIcon />
                    My Appointments
                  </div>
                ) : (
                  <CalendarMonthIcon />
                )}
              </Link>
            </button>
            <button>
              <Link to="/HomeMedic/MedicalEmergency">
                {open ? (
                  <div className={style.divbutton}>
                    <MedicalServicesIcon />
                    Urgency
                  </div>
                ) : (
                  <MedicalServicesIcon />
                )}
              </Link>
            </button>
            <button>
              <Link to="/HomeMedic/Reviews">
                {open ? (
                  <div className={style.divbutton}>
                    <RateReviewIcon />
                    Reviews
                  </div>
                ) : (
                  <RateReviewIcon />
                )}
              </Link>
            </button>
          </Stack>
          <button
            style={{ background: "#307196" }}
            onClick={(e) => handleLogOut(e)}
          >
            <Link>
              {open ? (
                <div className={style.divbutton} style={{ color: "white" }}>
                  <LogoutIcon />
                  Logout
                </div>
              ) : (
                <LogoutIcon style={{ color: "white" }} />
              )}
            </Link>
          </button>
        </Stack>
      </div>
    </div>
  );
};
export default SideBar;
