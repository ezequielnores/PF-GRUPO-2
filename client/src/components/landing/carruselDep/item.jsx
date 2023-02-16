import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Item({ item }) {
  return (
    <div>
      <Paper>
        <img
          src={item.image}
          alt="pe"
          style={{ width: "60%", height: "35vh " }}
        />
        <div style={{ textAlign: "center", height: "3vh " }}>
          <Link to={`/blog/${item.blog}`}>
            <Button className="CheckButton">{item.title}</Button>
          </Link>
        </div>
      </Paper>
    </div>
  );
}
export default Item;
