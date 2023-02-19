import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import Paper from '@material-ui/core/Paper';
// import Box from '@material-ui/core/Box';
// import Rating from '@material-ui/lab/Rating';
import {
  Select,
  MenuItem,
  Paper,
  Box,
  Rating,
  Typography,
  FormControl,
} from "@mui/material";
// const useStyles = makeStyles((theme) => ({
const root = {
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
const divider = {
  marginBottom: "1rem",
};

const Reviews = () => {
  // const classes = useStyles();

  const reviews = [
    {
      id: 1,
      title: "Very satisfied",
      message: "Excellent care, the doctor is very kind and professional.",
      rating: 5,
      doctorId: null,
      PatientId: null,
    },
    {
      id: 2,
      title: "I'm not satisfied",
      message:
        "I was treated by an intern instead of the doctor I had requested, the attention was bad and it did not solve my health problem",
      rating: 1,
      doctorId: null,
      PatientId: null,
    },
    {
      id: 3,
      title: "Regular",
      message:
        "The attention was correct, but I had to wait a long time to be attended.",
      rating: 3,
      doctorId: null,
      PatientId: null,
    },
  ];

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

  return (
    // <Paper className={classes.root}>
    //   <div className={classes.header}>
    //     <Typography className={classes.title}>Patients reviews</Typography>
    //     <Typography className={classes.subtitle}>Filter by rating:</Typography>
    //     <FormControl className={classes.formControl}>
    //       <Select
    //         value={filter}
    //         onChange={handleFilterChange}
    //         displayEmpty
    //         inputProps={{ "aria-label": "Filtrar por calificación" }}
    //       >
    //         <MenuItem value="all">All</MenuItem>
    //         <MenuItem value="5">5 stars</MenuItem>
    //         <MenuItem value="4">4 stars</MenuItem>
    //         <MenuItem value="3">3 stars</MenuItem>
    //         <MenuItem value="2">2 stars</MenuItem>
    //         <MenuItem value="1">1 star</MenuItem>
    //       </Select>
    //     </FormControl>
    //   </div>

    //   {filteredReviews.length > 0 ? (
    //     <div>
    //       {filteredReviews.map((review) => (
    //         <Box className={classes.reviewContainer} key={review.id}>
    //           <div className={classes.ratingContainer}>
    //             <Rating name="read-only" value={review.rating} readOnly />
    //             <Typography variant="body2" color="textSecondary">
    //               {" "}
    //               ({review.rating})
    //             </Typography>
    //           </div>
    //           <Typography className={classes.reviewerName}>
    //             Review #{review.id}
    //           </Typography>
    //           <br />
    //           <Typography className={classes.reviewText}>
    //             {review.message}
    //           </Typography>
    //           <Typography variant="caption">
    //             <i>By anonymus patient</i>
    //           </Typography>
    //         </Box>
    //       ))}
    //     </div>
    //   ) : (
    //     <Typography className={classes.reviewerName}>
    //       <br />
    //       <br />
    //       <br />
    //       There are no reviews with that rating
    //     </Typography>
    //   )}
    // </Paper>
    <Paper style={root}>
      <div style={header}>
        <Typography style={title}>Patients reviews</Typography>
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
            <Box key={review.id} style={reviewContainer}>
              <div style={ratingContainer}>
                <Rating name="read-only" value={review.rating} readOnly />
                <Typography variant="body2" color="textSecondary">
                  {" "}
                  ({review.rating})
                </Typography>
              </div>
              <Typography style={reviewerName}>Review #{review.id}</Typography>
              <br />
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
