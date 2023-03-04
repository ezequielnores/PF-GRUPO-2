import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
//logic
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { patientGetAll , patientUpdatePassword} from "../../redux/reducers/patientReducer";
import { Alert } from "@mui/material";
//Firebase
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../authentication/firebase";
import MailSender from "../ResetPassword/MailSender";

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

const FormLoginClient = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const pacientes = useSelector((state) => state.patient.list);
  const [successLogin, setSuccessLogin] = useState(null);
  const [open, setOpen] = useState(false);
  //me creo estado para guardar lo que toma de inptus
  const [info, setInfo] = useState({
    mail: "",
    password: "",
    id: "",
  });

  const handleOpenResetPassword = () => {
    setOpen(true);
  };

  //seteo la info con los inputs
  const handleChange = (evento) => {
    evento.preventDefault();
    setInfo({
      ...info,
      [evento.target.name]: evento.target.value,
    });
  };

  //SUBMIT
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        info.mail,
        info.password
      );
      const user = userCredential.user;
      console.log("usuario logeado: " + user.email);
  
      //Aca lo que hay que hacer es que firebase se ocupe de el logueo del usuario y no se haga una corroboracion con la db. Lo unico que se deberia hacer con la db es que mediante
      //un atributo como el uid brindado por firebase al registrarse, se guarde en un atributo de la db para que en este momento de logueo se encuentre al usuario mediante ese uid.
      //Primero para que se encargue de toda la autenticacion firebase y segundo porq cuando hay un cambio de contraseña nose puede cambiar la que esta en la base de datos en el
      //momento de resetPassword, entonces la idea es q para este punto este ya este logueado y q si la contraseña es distinta se cambie la de la db y ahi recien vaya a la HOME.
      const authenticatedPatient = pacientes.find((paciente) => {
        return paciente.mail === auth.currentUser.email;
      });

      if (authenticatedPatient) {
        if (authenticatedPatient.password !== info.password) {
          dispatch(patientUpdatePassword(authenticatedPatient.id, info.password));
        }
        console.log(authenticatedPatient);
        const id = authenticatedPatient.id;
        localStorage.setItem("id", id);
        // navigate("/HomeClient/Profile", { state: { id } });
      } else {
        setSuccessLogin("error");
      }
    } catch (error) {
      console.log({ Error: error.message });
    }
  };

  //SUBMIT WITH GOOGLE
  const handleLoginWithGoogle = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      const found = pacientes.find((paciente) => {
        return paciente.mail === auth.currentUser.email;
      });
      console.log(found);
      console.log(auth.currentUser);
      if (!found) {
        await auth.currentUser.delete();
        alert("The user doesnt exists in the app");
      } else {
        const id = found.id;
        localStorage.setItem("id", id);
        navigate("/HomeClient/Profile", { state: { id } });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //FIRST RENDER
  useEffect(() => {
    const id = localStorage.getItem("id");
    if (id) {
      // navigate("/HomeClient/Profile");
    } else {
      dispatch(patientGetAll());
    
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
            onClick={(e) => handleLogin(e)}
          >
            Login
          </Button>

          <Button
            variant="contained"
            type="submit"
            value="Send"
            style={buton}
            onClick={handleLoginWithGoogle}
          >
            Login with Google
          </Button>

          <Button
            variant="contained"
            style={buton}
            onClick={handleOpenResetPassword}
          >
            Forgot my password
          </Button>
          <MailSender open={open} setOpen={setOpen} />
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
