import { Box, TextField, Avatar, Stack, Typography, Button , Divider } from '@mui/material'
import { useNavigate } from 'react-router-dom'


function UserDivition({ item }) {

    const nav = useNavigate()
    return (

        <Stack
            className='userDivistionCard'
            direction="row"
            spacing={2}
            sx={{py:1}}
            onClick = {()=> nav(`/${item.id}/${item.name}`)}
        >
            <Avatar
            src={`https://api.dicebear.com/9.x/pixel-art/svg`}
            sx={{width:"32px",height:"32px"}}
            
            />
        <Typography variant='subtitle2' >{item.name}</Typography>
        </Stack>

    )
}

export default UserDivition