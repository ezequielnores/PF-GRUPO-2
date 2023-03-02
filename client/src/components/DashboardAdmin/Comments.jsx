import { Button, Card, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commentsGetAll } from "../../redux/reducers/commentsReducer";

const container = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  flexWrap: "wrap",
};
const cardSita = {
  width: "auto",
  marginBottom: "1rem",
  height: "50%",
  padding: "10px",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
};
const Comments = ({
  comments,
  authorName,
  authorLastName,
  deleteComment,
  setRenderSearch,
  renderSearch,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  return (
    <div style={container}>
      {comments.map((comment) => (
        <Card key={comment.id} style={cardSita}>
          <Typography
            variant="button"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "4px",
              fontWeight: "bold",
              gap: "5px",
            }}
          >
            Title: <Typography variant="body2">{comment.title}</Typography>
          </Typography>
          <Typography
            variant="button"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "4px",
              fontWeight: "bold",

              gap: "5px",
            }}
          >
            Rating: <Typography variant="body2">{comment.rating}</Typography>
          </Typography>
          <Typography
            variant="button"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "4px",
              fontWeight: "bold",

              gap: "5px",
            }}
          >
            By:
            <Typography variant="body2">
              {authorName} {authorLastName}
            </Typography>
          </Typography>
          <Typography
            variant="button"
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "4px",
              fontWeight: "bold",

              gap: "5px",
            }}
          >
            Message: <Typography variant="body2">{comment.message}</Typography>
          </Typography>
          <Button
            variant="outlined"
            style={{ marginTop: "1rem" }}
            onClick={async () => {
              await dispatch(deleteComment(comment.id));
              dispatch(commentsGetAll());
              setTimeout(setRenderSearch, 3000, !renderSearch);
            }}
          >
            DELETE COMMENT
          </Button>
        </Card>
      ))}
    </div>
  );
};

export default Comments;
