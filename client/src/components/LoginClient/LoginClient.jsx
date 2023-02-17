import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
//logic
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientGetAll } from "../../redux/reducers/patientReducer";
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

const FormLoginClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //me creo estado para guardar lo que toma de inptus
  const [info, setInfo] = useState({
    mail: "",
    password: "",
    id: "",
  });
  //seteo la info con los inputs
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      [evento.target.name]: evento.target.value,
    });
  };
  const pacientes = useSelector((state) => state.patient.list);


  //SUBMITTTT
  const handleSubmit = (e) => {
    e.preventDefault();
    const authenticatedPatient = pacientes.find((paciente) => {
      return paciente.mail === paciente.mail && paciente.password === paciente.password;
    });
    console.log(authenticatedPatient.id);
    if (authenticatedPatient) {
      const id = authenticatedPatient.id;
      localStorage.setItem("id", id);
      navigate("/HomeClient/Profile", { state: { id } });
    } else {
      alert("Error en credenciales");
    }
  };
  //primera carga
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      navigate("/HomeClient/Profile");
    } else {
      dispatch(patientGetAll());
    }
  }, []);

  console.log(info);

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
export default FormLoginClient;


// import { Link } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { ButtonGroup } from "@mui/material";
// const container = {
//   width: "100%",
//   height: "100vh",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
// };
// const formLoginClient = () => {
//   //aca va el codigo de login de cliente
//   return (
//     <div style={container}>
//       <h1>LOGIN</h1>
//       <ButtonGroup>
//         <Button color="primary">
//           <Link to="/HomeClient">Aceptar</Link>
//         </Button>
//       </ButtonGroup>
//     </div>
//   );
// };
// export default formLoginClient;