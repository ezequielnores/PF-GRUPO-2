import React, { useState } from "react";
import {
  Select,
  MenuItem,
  Paper,
  Box,
  Rating,
  Typography,
  FormControl,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { commentsByDoctor } from "../../../redux/reducers/commentsReducer";
import { useEffect } from "react";

const root = {
  float: "right",
  width: "83.4vw",
  padding: "1rem",
  marginLeft: "3rem",
  backgroundColor: "#f7f7f7",
  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
};
const test = {
  color: "#307196",
  font: "700 3em/1",
  fontFamily: "tahoma",
  padding: ".25em 0 .325em",
  display: "block",
  margin: "0 auto",
  textShadow: "0 0.36px 8.896px #d4c7b3,0 -2px 1px #fff",
};
const header = {
  marginBottom: "2rem",
};
const subtitle = {
  color: "secondary",
  marginBottom: "1rem",
};
const formControl = {
  marginRight: "2rem",
  minWidth: "120",
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

const Reviews = () => {
  // const classes = useStyles();
  const reviews = useSelector((state) => state.comments.list);
  const doctorIdLocal = localStorage.getItem("idMedic");
  const dispatch = useDispatch();

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredReviews = reviews.filter((review) => {
    if (filter === "all") {
      return true;
    } else {
      return review.rating === parseInt(filter);
    }
  });

  useEffect(() => {
    dispatch(commentsByDoctor(doctorIdLocal));
  }, []);

  return (
    <Paper style={root}>
      <div style={header}>
        <Typography
          variant="button"
          fontSize="2.5rem"
          color="#307196"
          fontWeight="bold"
          style={test}
        >
          Patients reviews
        </Typography>
        <Typography style={subtitle}>Filter by rating:</Typography>
        <FormControl style={formControl}>
          <Select
            value={filter}
            onChange={handleFilterChange}
            displayEmpty
            inputProps={{ "aria-label": "Filtrar por calificación" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="5">5 stars</MenuItem>
            <MenuItem value="4">4 stars</MenuItem>
            <MenuItem value="3">3 stars</MenuItem>
            <MenuItem value="2">2 stars</MenuItem>
            <MenuItem value="1">1 star</MenuItem>
          </Select>
        </FormControl>
      </div>

      {filteredReviews.length > 0 ? (
        <div>
          {filteredReviews.map((review) => (
            <Box key={review.id} style={reviewContainer} sx={{ padding: 2 }}>
              <div style={ratingContainer}>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body2" color="textSecondary">
                  {" "}
                  ({review.rating})
                </Typography>
                <Typography style={reviewerName} sx={{ marginLeft: 70 }}>
                  Review #{review.id}
                </Typography>
              </div>

              <br />
              <Typography style={reviewText} sx={{ fontWeight: "bold" }}>
                {review.title}
              </Typography>
              <Typography style={reviewText}>{review.message}</Typography>
              <Typography variant="caption">
                <i>By anonymus patient</i>
              </Typography>
            </Box>
          ))}
        </div>
      ) : (
        <Typography style={reviewerName}>
          <br />
          <br />
          <br />
          There are no reviews with that rating
        </Typography>
      )}
    </Paper>
  );
};

export default Reviews;
