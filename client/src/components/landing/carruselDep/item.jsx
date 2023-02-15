import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
function Item({ item }) {
  return (
    <Paper>
      <img
        src={item.image}
        alt="pe"
        style={{ width: "60%", height: "30vh " }}
      />
      <div style={{ textAlign: "center" }}>
        <Link to={`/blog/${item.blog}`}>
          <Button className="CheckButton">{item.title}</Button>
        </Link>
      </div>
    </Paper>
  );
}
export default Item;
