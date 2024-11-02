import React from 'react'
import { Box , Typography } from '@mui/material'
function ChatWindow( { text , date , direction}) {
  return (
    <Box display='flex' justifyContent={direction}>
    <Box>
        <Typography variant='caption'>
            {date}
        </Typography>
        <Typography variant='subtitle2' backgroundColor="white" padding="5px" >
            { text }
        </Typography>
    </Box>

    </Box>

  )
}

export default ChatWindow