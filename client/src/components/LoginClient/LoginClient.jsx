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

        </div>
    )
}
export default formLoginClient;