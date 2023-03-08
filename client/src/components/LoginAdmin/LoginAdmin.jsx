import { Alert, Button, Card, Input, Typography } from "@mui/material";
import swal from "sweetalert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAll, adminGetDetail } from "../../redux/reducers/adminReducer";
//Firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../authentication/firebase";

const divPadre = {
  display: "flex",
  justifyContent: "center",
  alignItems: "start",
  width: "100%",
  height: "100vh",
  backgroundColor: "#43B8C8",
};
const box = {
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  width: "40rem",
  height: "45rem",
  justifyContent: "space-evenly",
};
const cardDiv = {
  display: "flex",
  flexDirection: "column",
  width: "30rem",
  height: "25rem",
  justifyContent: "space-around",
  boxShadow:
    "-10px 10px 0px #307196,-20px 20px 0px rgba(48, 113, 150, 0.7),-30px 30px 0px rgba(48, 113, 150, 0.4),-40px 40px 0px rgba(48, 113, 150, 0.1)",
  padding: "2rem",
};
const inputs = {
  fontSize: "1rem",
  color: "#333333",
};
const buton = {
  backgroundColor: "#307196",
  borderRadius: "15px",
};

export default function LoginAdmin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.listAll);
  // const admins = useSelector((state) => state.admins.list);
  const [successLogin, setSuccessLogin] = useState(null);
  const [info, setInfo] = useState({
    mail: "",
    password: "",
    id: "",
  });
  const [error, setError] = useState({
    mail: "",
    password: "",
  });

  const validateForm = (data, name) => {
    if (name === "password") {
      if (
        !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[-+_!@#$%^&*.,?]).{8,}$/.test(
          data[name] || data[name] !== ""
        )
      ) {
        setError({
          ...error,
          [name]:
            "•Minimum 8 characters •One upper case letter •One loweer case letter •One number •One special character",
        });
      } else {
        setError({
          ...error,
          [name]: "",
        });
      }
    }
    if (name === "mail") {
      if (
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
          data[name] || data[name] !== ""
        )
      ) {
        setError({ ...error, [name]: "•Musst be a valid email" });
      } else setError({ ...error, [name]: "" });
    }
  };

  const handleChange = (name, value) => {
    setInfo({
      ...info,
      [name]: value,
    });
    validateForm({ ...info, [name]: value}, name);
  };

  //SUBMIT
  const handleSubmit =  async (e) => {
    e.preventDefault();
    try{
      const userCredential = await signInWithEmailAndPassword(
        auth,
        info.mail,
        info.password,
      );
      const user = userCredential.user;
      console.log("admin logueado: " + user.email);
      if(user) {
        const email = user.email
        const adminFind = admin.find((admin) => {
          return admin.mail === email
        })
        if(adminFind.active === false){
          setSuccessLogin(false);
          await swal("Administrator disabled", {
            icon: "warning",
          });
        } else {
          localStorage.setItem("mailAdmin",email);
          localStorage.setItem("idAdmin", adminFind.id);
          dispatch(adminGetDetail(adminFind.id))
          setSuccessLogin(true);
          navigate("/HomeAdmin");
        }
      } else {
        setSuccessLogin(false);
        await swal("Unregistered administrator", {
          icon: "warning",
        });
      }
    } catch(error){
      console.log({ Error: error.message });
      await swal("Unregistered administrator", {
        icon: "warning",
      });
    }
  };

  useEffect(() => {
    const admin = localStorage.getItem("mailAdmin");
    if (admin){
      dispatch(adminGetAll())
      navigate("/HomeAdmin");
    } dispatch(adminGetAll())
  }, [dispatch, navigate]);

  return (
    <div style={divPadre}>
      <form
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        style={box}
        noValidate
        autoComplete="off"
      >
        {successLogin === "error" && (
          <Alert severity="error">Incorrect or missing information</Alert>
        )}
        <Card style={cardDiv}>
          <Typography
            variant="h2"
            align="center"
            style={{
              color: "#307196",
              marginBottom: "2rem",
              fontWeight: "semibold",
              fontFamily: "monospace",
              fontSize: "3rem",
            }}
          >
            Login Admins
          </Typography>
          <label>Email</label>
          <Input
            error={error.mail}
            style={inputs}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            name="mail"
            value={info.mail}
            type="mail"
            required
            fullWidth
            margin="normal"
          />
          {error.mail && 
            <Typography
              variant="caption" 
              color="error">
                •Musst be a valid email
            </Typography>}
          <label>Password</label>
          <Input
            error={error.password}
            style={inputs}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            name="password"
            value={info.password}
            type="password"
            required
            fullWidth
            margin="normal"
          />
          {error.password && 
            <Typography
              variant="caption" 
              color="error">
                •Minimum 8 characters •One upper case letter •One loweer case letter •One number •One special character
            </Typography>}
          <Button
            variant="contained"
            type="submit"
            value="Send"
            style={buton}
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
        </Card>
      </form>
    </div>
  );
}
