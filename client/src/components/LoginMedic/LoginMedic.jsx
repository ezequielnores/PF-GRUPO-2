import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import { Alert } from "@mui/material";
//logic
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { docrtorGetAll } from "../../redux/reducers/doctorReducer";
//styles
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

const FormLoginMedic = () => {
  //Estado error para alert
  const [successLogin, setSuccessLogin] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //me creo estado para guardar lo que toma de inptus
  const [info, setInfo] = useState({
    mail: "",
    password: "",
  });
  //seteo la info con los inputs
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      [evento.target.name]: evento.target.value,
    });
  };
  const doctores = useSelector((state) => state.doctor.list);
  console.log(doctores);

  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    const authenticatedDoctor = doctores.find((doctor) => {
      return doctor.mail === info.mail && doctor.password === info.password;
    });
    if (authenticatedDoctor) {
      const id = authenticatedDoctor.id;
      localStorage.setItem("id", id);
      navigate("/HomeMedic/Profile");
    } else {
      setSuccessLogin("error");
    }
  };
  //primera carga
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/HomeMedic/Profile");
    } else {
      dispatch(docrtorGetAll());
    }
  }, []);

  console.log(info);
  //RENDER
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
            Login
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
};
export default FormLoginMedic;
