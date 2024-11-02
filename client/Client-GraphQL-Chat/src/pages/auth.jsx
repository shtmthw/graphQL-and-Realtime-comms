import { useEffect, useState } from 'react';
import { Box, TextField, Stack, Typography, CircularProgress, Alert, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGNUP , LOGIN } from '../graphqlCntrls/mutations';

function Auth({setLoggedIn}) {
  const [logged, setLogged] = useState(false);
  const [CreateNewUser, { data: signupData, loading: isLoadingSignup, error }] = useMutation(SIGNUP);
  const [LoginUser , {data : loginData , loading : isLoadingLogin , error : error2}] = useMutation(LOGIN , {
    onCompleted(data){
      localStorage.setItem('token' , data.loginUser.token)
      setLoggedIn(false)
      window.location.reload();
    }
  })
  const [formData, setFormData] = useState({});
  if(isLoadingSignup || isLoadingLogin){
    return (
      <Box>
        <CircularProgress/>
      </Box>
    )
  }

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (logged) {
      LoginUser({variables : {
        userInfo : formData
      }})
    } else {
      CreateNewUser({ variables: { newUser: formData } });
    }
  };

  return (
<>

  <Box display="flex" justifyContent="center" alignItems="center" height="80vh" component="form" onSubmit={handleFormSubmit}>
      <Stack direction="column" spacing={4} sx={{ width: "400px" }}>
        {signupData && <Alert severity="success">Registered Successfully</Alert>}
        {loginData && <Alert severity="success">Logged In Successfully</Alert>}
      
        {error && <Alert severity="error">{error.cause.message}</Alert>}
        {error2 && <Alert severity="error">{error2.cause.message}</Alert>}
        <Typography variant="h5">Please {logged ? 'Login' : 'SignUp'}</Typography>

        {!logged && (
          <TextField name="name" required label="Full Name" onChange={onChange} variant="standard" />
        )}
        <TextField required name="email" type="email" label="Your Email" onChange={onChange} variant="standard" />
        <TextField required name="password" type="password" label="Password" onChange={onChange} variant="standard" />

        <Button variant="outlined" type="submit" disabled={isLoadingSignup}>
          {isLoadingSignup ? <CircularProgress size={24} /> : logged ? 'Login' : 'SignUp'}
        </Button>

        <Typography
          variant="subtitle1"
          style={{ cursor: 'pointer' }}
          onClick={() => setLogged(!logged)}
        >
          {logged ? 'Create a new Account?' : 'Already Signed In?'}
        </Typography>
      </Stack>
    </Box>
    </>

);
}

export default Auth;