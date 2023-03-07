import { Alert, Button, Card, Input, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { adminGetAll, adminLogin } from "../../redux/reducers/adminReducer";
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
  const state = useSelector((state) => state.admin);
  // const admins = useSelector((state) => state.admins.list);
  const [successLogin, setSuccessLogin] = useState(null);
  const [info, setInfo] = useState({
    mail: "",
    password: "",
    id: "",
  });

  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      [evento.target.name]: evento.target.value,
    });
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
        localStorage.setItem("mailAdmin", email);
        navigate("/HomeAdmin", { state: { email } });
      } else {
        setSuccessLogin("error");
      }
    } catch(error){
      console.log({ Error: error.message });
    }
  };

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) alert("Admin ya logueado");
  }, []);

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
            type="email"
            name="mail"
            style={inputs}
            onChange={(e) => handleChange(e)}
          />
          <label>Password</label>
          <Input
            type="password"
            name="password"
            style={inputs}
            onChange={(e) => handleChange(e)}
          />
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
