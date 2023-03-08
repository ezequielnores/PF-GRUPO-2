import React from "react";
import { CircularProgress, Typography, Card } from "@mui/material";

const Loading = () => {
    return (
        <div>
            <Card style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"space-evenly", alignItems:"center"}}>

                <Typography variant='h3'>
                    Wait a second please...
                </Typography>
                
                <CircularProgress />

            </Card>
        </div>
    )
}

export default Loading;