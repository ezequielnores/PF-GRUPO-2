import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const ErrorPage = () => {
   
    return (
        <div>
           <Box style={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                minHeight: '80vh',
                flexDirection: "column"
              }}>
                
              <Typography variant='h2' style={{ color:"black" }}>
                Error 4🚫4 Page Not Found
              </Typography>

              <Button color="primary" onClick={() => window.history.back()}>
                Go Back
              </Button>

           </Box>
        </div>
    )
}

export default ErrorPage;