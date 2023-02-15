import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
const formLoginMedic = () => {
    //aca va el codigo de login de cliente
    return (
        <div>
            <h1>LOGIN</h1>
            <ButtonGroup>
                <Button color="primary">
                    <Link to="/HomeMedic">Ingresar</Link>
                </Button>
            </ButtonGroup>
            
        </div>
    )
}
export default formLoginMedic;