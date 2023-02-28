import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Comments = ({
  comments,
  authorName,
  authorLastName,
  deleteComment,
  setChange,
  change,
  renderSearch,
  setRenderSearch
}) => {
  const dispatch = useDispatch();
  const [render, setRender] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>Title: {comment.title}</p>
          <p>Message: {comment.message}</p>
          <p>Rating: {comment.rating}</p>
          <p>
            By: {authorName} {authorLastName}
          </p>
          <button
            onClick={async () => {
              await dispatch(deleteComment(comment.id));
              setRenderSearch(!renderSearch);
              setRender(!render);
            }}
          >
            DELETE COMMENT
          </button>
        </div>
      ))}
    </div>
  );
};

export default Comments;
