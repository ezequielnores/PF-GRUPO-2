import { Paper, Button } from "@mui/material";

function Item({ item }) {
  return (
    <Paper>
      <img
        src={item.image}
        alt="pe"
        style={{ width: "100%", height: "30vh " }}
      />
      <div style={{ textAlign: "center" }}>
        <h3>{item.title}</h3>
        <Button className="CheckButton" variant="contained">
          Mas informacion
        </Button>
      </div>
    </Paper>
  );
}
export default Item;
