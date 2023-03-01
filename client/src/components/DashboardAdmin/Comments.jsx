import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { commentsGetAll } from "../../redux/reducers/commentsReducer";

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
              dispatch(commentsGetAll());
              setTimeout(setRenderSearch, 3000, !renderSearch);
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