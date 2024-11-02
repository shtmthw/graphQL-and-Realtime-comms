import { useParams } from "react-router-dom";
import { AppBar, Toolbar, Avatar, Box, Typography, TextField } from '@mui/material'
import ChatWindow from "./chatWindow";
import { useEffect, useState } from "react";
function ChatScreen() {
    const { id, name } = useParams()
    const [mmessages, setMessages] = useState([])
    useEffect(() => {
        getMessges()
    }, [])
    const getMessges = () => {
        fetch('http://localhost:4000/', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjEsImlhdCI6MTcyOTk2MDE5OX0.BiGAmgMUMqDsQh15CRR6n3GepU1fE2_yQkrxZvlC0SA"
            },
            body: JSON.stringify({
                query: `
                    query GetPersonalMessages($receiverId: String!) {
                    getPersonalMessages(receiverID: $receiverId) {
                        receiverID
                        senderID
                        text
                    }
                }
            `,
                variables: {
                    'receiverId': '3'
                }

            })
        }).then(res => res.json()).then(data => {console.log(data)})
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: '0' }}>
                <Toolbar>
                    <Avatar
                        src={`https://api.dicebear.com/9.x/pixel-art/svg`}
                        sx={{ width: "32px", height: "32px", mx: 2 }}

                    />
                    <Typography variant='h6' color="black" >{name}</Typography>
                </Toolbar>
            </AppBar>
            <Box backgroundColor='#f5f5f5' height='80vh' padding='20px' sx={{ overflowY: "auto" }}>
                <ChatWindow text='sex tonight?' date='12/12/24' direction='start' />
                <ChatWindow text='fosho' date='12/12/24' direction='end' />

            </Box>
            <TextField placeholder="Enter a message" variant="standard" fullWidth multiline rows={2}>
            </TextField>
        </Box>
    )
}

export default ChatScreen