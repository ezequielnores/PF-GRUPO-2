import React, { Component } from 'react';

const LinkReview =()=> {
        return (
            <div>
                <p>If you want to see all the reviews about our medical specialists, click the following link and you will be redirected to the reviews section.</p>
                <a  href="http://localhost:3000/totalReviews" target="_blank" style={{color:"black",textDecoration:"underline", fontWeight:"bold"}}>Reviews</a>
            </div>
        )
}

export default LinkReview;

