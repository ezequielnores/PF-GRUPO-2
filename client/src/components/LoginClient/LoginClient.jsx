import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";
const formLoginClient = () => {
    //aca va el codigo de login de cliente
    return (
        <div>
            <h1>LOGIN</h1>
            <ButtonGroup>
                <Button color="primary">
                    <Link to="/HomeClient">Aceptar</Link>
                </Button>
            </ButtonGroup>
            
            <h1>workin</h1>

        </div>
    )
}
export default formLoginClient;