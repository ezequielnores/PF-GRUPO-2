import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
const container = {
  width: "100%",
  height: "100vh",
};
const formLoginMedic = () => {
  //aca va el codigo de login de cliente
  return (
    <div style={container}>
      <h1>LOGIN</h1>
      <ButtonGroup>
        <Button color="primary">
          <Link to="/HomeMedic">Ingresar</Link>
        </Button>
      </ButtonGroup>
    </div>
  );
};
export default formLoginMedic;
