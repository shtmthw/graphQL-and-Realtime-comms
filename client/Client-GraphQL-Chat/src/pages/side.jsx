import { Box, TextField, Avatar, Stack, Typography, Button, Divider } from '@mui/material'

import UserDivition from './userDivision'
function Sidebar() {
    const user = [
        { id: 1, name: 'matthew_1' }
        , { id: 2, name: 'matthew_2' },
        { id: 3, name: 'matthew_3' }

    ]
    return (

        <Box backgroundColor='#f7f7f7'
            height="100vh"
            width="250px"
            padding="10px"
        >
            <Typography variant='h6'>Chat</Typography>

            <Divider />
            {
                user.map((item) => {
                    return <UserDivition item={item} key={item.id} />
                })
            }
            <Button onClick={() => {
                localStorage.clear('token')
                window.location.reload()
            }}>Logout</Button>
        </Box>
    )
}

export default Sidebar