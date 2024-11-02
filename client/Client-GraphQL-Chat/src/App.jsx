import { useEffect, useState } from 'react'
import Auth from './pages/auth'
import { Box } from '@mui/system'
import './App.css'
import Home from './pages/home'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  return(
      <>
        {localStorage.getItem('token')? <Home/> : <Auth setLoggedIn={setLoggedIn}/>}
      </>
  )
}

export default App
