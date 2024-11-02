import Sidebar from "./side"
import {Box} from '@mui/material'
import { Route, Routes } from 'react-router-dom'
import WelcomeScreen from "./welcomeScreen"
import ChatScreen from "./chatscreen"

function Home() {
    return( 
        <Box display='flex'>
            <Sidebar />

            <Routes>
                <Route path="/"  element={<WelcomeScreen/>} />
                <Route path="/:id/:name" element={<ChatScreen/>}/>
            </Routes>
        </Box>
    )}
    


export default Home