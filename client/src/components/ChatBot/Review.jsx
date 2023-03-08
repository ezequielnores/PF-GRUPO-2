import React from "react";
import { useEffect } from "react";
import {commentsGetAll} from "../../redux/reducers/commentsReducer";
import {useDispatch, useSelector} from "react-redux";

import {
    Box,
    Rating,
    Typography,
  } from "@mui/material";

const root = {
    float: "right",
    width: "83.4vw",
    padding: "1rem",
    marginLeft: "3rem",
    backgroundColor: "#f7f7f7",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  };
  
  const header = {
    marginBottom: "2rem",
  };
  const title = {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: "1",
    color: "#307196",
  };
  const reviewContainer = {
    marginBottom: "2rem",
    padding: "2",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };
  const ratingContainer = {
    display: "flex",
    alignItems: "center",
    marginBottom: "1rem",
  };
  const reviewerName = {
    fontWeight: "bold",
    marginBottom: "0.5rem",
  };
  const reviewText = {
    marginBottom: "0.5rem",
  };


const AllReviews=()=>{
    const dispatch=useDispatch();
    const totalReviews = useSelector(state => state.comments.listAll);

    useEffect(() => {
        dispatch(commentsGetAll());
    }, [])



return(
    <div>
    {/* <Paper style={root}> */}
        
        {totalReviews.length > 0 ? (
    <div >
    {totalReviews.map((review) => (
      <Box key={review.id} style={reviewContainer} sx={{padding:2}}>
        <div style={ratingContainer}>
          <Rating name="read-only" value={review.rating} readOnly/>
          <Typography variant="body2" color="textSecondary">
            {" "}
            ({review.rating})
          </Typography>
          <Typography style={reviewerName} sx={{marginLeft:52}}>Review #{review.id}</Typography>
        </div>
        

        <br/>
        <Typography style={reviewText} sx={{fontWeight:"bold"}}>{review.title}</Typography>
        <Typography style={reviewText}>{review.message}</Typography>
        <Typography variant="caption">
          <i>By anonymus patient</i>
        </Typography>
      </Box>
    ))}
  </div>) : (
        <Typography style={reviewerName}>
          <br />
          <br />
          <br />
          There are no reviews yet
        </Typography>
      )}
    
  {/* </Paper> */}
  </div>
)
}

export default AllReviews;