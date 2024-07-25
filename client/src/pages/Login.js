import {
    Container,
    Card,
    Button,
    TextField, 
    Typography, 
    Box,
    styled,
    Alert
} from '@mui/material'
import { Send, SendAndArchive } from '@mui/icons-material'
import {  Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { login } from '../actions/auth'

import { selectUser } from '../actions/user'
import { UserContext } from '../contexts/UserContext'

const Login = () => {
    const navigate = useNavigate()
    const {state, dispatch} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({username: '', password: ''})
    const {state: userState, dispatch: userDispatch} = useContext(UserContext)

    useEffect(() => {
      if(state.isAuthenticated){
        console.log(state.user, "logging")
        selectUser(userDispatch, state.user, state.user)
        navigate('/profile')
      }

    }, [state])

    const handleInputChange = (e) => {
      const {id, value} = e.target
      setCredentials({...credentials, [id]: value})
    }

    const handleSubmit = async () => {
      await login(dispatch, credentials)
    }

  return (
    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card sx={{padding: '30px', width: '40%', boxShadow: '5'}}>
            <form action="submit">
            <TextField id="username" value={credentials.username} onChange={handleInputChange} label='Username' variant="outlined"  fullWidth sx={{marginBottom: '10px'}} />
            <TextField id="password" type='password' value={credentials.password} onChange={handleInputChange} label="Password" variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />

            <Box sx={{marginTop: '20px'}}>
              <Button onClick={handleSubmit} endIcon={<Send />} variant='contained'  sx={{color: 'white', backgroundColor: 'RGB(123, 45, 78)', width: '100%', '&:hover': {backgroundColor: 'RGB(123, 45, 78, 1)', }}}>Login</Button>
            </Box>
            {state?.error && (
                <Alert severity="error" sx={{margin: '10px'}}>
                  {state?.error}
                </Alert>
              )}
            
            <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                Don't have an account? <Button sx={{paddingBottom: '8px'}} onClick={() => {
                navigate('/signup')
            }}>Signup</Button>
            
            </Typography>
            </form>

            
        </Card>
    </Container>
  )
}

export default Login