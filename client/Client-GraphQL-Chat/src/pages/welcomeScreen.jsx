import React from 'react'
import { Typography , Stack } from '@mui/material'



function WelcomeScreen() {
  return (
    <>
    <Stack flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <Typography variant='h2'>
            Welcome To OUR zone!
        </Typography>
    </Stack>
    </>

  )
}

export default WelcomeScreen