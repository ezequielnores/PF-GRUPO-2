import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
const container = {
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};
const formLoginClient = () => {
<<<<<<< HEAD
    //aca va el codigo de login de cliente
    return (
        <div>
            <h1>LOGIN</h1>
            <ButtonGroup>
                <Button color="primary">
                    <Link to="/HomeClient">Aceptar</Link>
                </Button>
            </ButtonGroup>

        </div>
    )
}
export default formLoginClient;
=======
  //aca va el codigo de login de cliente
  return (
    <div style={container}>
      <h1>LOGIN</h1>
      <ButtonGroup>
        <Button color="primary">
          <Link to="/HomeClient">Aceptar</Link>
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default formLoginClient;
>>>>>>> 290c4dc327e40dad2419d445f840076df13c342f
