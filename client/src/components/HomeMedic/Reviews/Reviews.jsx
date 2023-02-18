import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    marginLeft:theme.spacing(3),
    backgroundColor: "#f7f7f7",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  header: {
    marginBottom: theme.spacing(2),
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginBottom: theme.spacing(1),
    color:"#307196"
  },
  subtitle: {
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginRight: theme.spacing(2),
    minWidth: 120,
  },
  reviewContainer: {
    marginBottom: theme.spacing(2),
    padding: theme.spacing(2),
    border: '1px solid #ccc',
    borderRadius: 5,
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(1),
  },
  reviewerName: {
    fontWeight: "bold",
    marginBottom: theme.spacing(0.5),
  },
  reviewText: {
    marginBottom: theme.spacing(0.5),
  },
  divider: {
    marginBottom: theme.spacing(1),
  },
}));

const Reviews = () => {
  const classes = useStyles();

  const reviews = [
        {      
            
        id: 1,      
        title: "Very satisfied",      
        message:"Excellent care, the doctor is very kind and professional.",      
        rating: 5,      
        doctorId: null,      
        PatientId: null,    
    },    
    {   id: 2,      
        title: "I'm not satisfied",      
        message: "I was treated by an intern instead of the doctor I had requested, the attention was bad and it did not solve my health problem",      
        rating: 1,      
        doctorId: null,      
        PatientId: null,    },    
    {   id: 3,      
        title: "Regular",      
        message: "The attention was correct, but I had to wait a long time to be attended.",      
        rating: 3,      
        doctorId: null,      
        PatientId: null,},  
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
    <Paper className={classes.root} >
      <div className={classes.header}>
        <Typography className={classes.title}>Patients reviews</Typography>
        <Typography className={classes.subtitle}>Filter by rating:</Typography>
        <FormControl className={classes.formControl}>
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
            <Box className={classes.reviewContainer} key={review.id}>
            <div className={classes.ratingContainer}>
            <Rating name="read-only" value={review.rating} readOnly />
            <Typography variant="body2" color="textSecondary">
            {" "}
            ({review.rating})
            </Typography>
            </div>
            <Typography className={classes.reviewerName}>
            Review #{review.id}
            </Typography><br/>
            <Typography className={classes.reviewText}>
            {review.message}
            </Typography>
            <Typography variant="caption">
            <i>By anonymus patient</i>
            </Typography>
            </Box>
            ))}
            </div>
            ) 
            : (
        <Typography className={classes.reviewerName}><br/><br/><br/>There are no reviews with that rating</Typography>
      )}
            
            </Paper>
            );
};

export default Reviews;




