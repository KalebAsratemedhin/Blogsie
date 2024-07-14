import {
    Container,
    Card,
    Button,
    TextField, 
    Typography, 
    Box,
    styled
} from '@mui/material'
import { Send, SendAndArchive } from '@mui/icons-material'
import {  Link, useNavigate } from 'react-router-dom'
import { useContext, useState, useEffect} from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { login } from '../actions/auth'


const Login = () => {
    const navigate = useNavigate()
    const {state, dispatch} = useContext(AuthContext)
    const [credentials, setCredentials] = useState({username: '', password: ''})



    useEffect(() => {
      console.log("statey", state)
      if(state.isAuthenticated){
        console.log("state", state, state.user)
        navigate('/profile')

      }

    }, [state])

    const handleInputChange = (e) => {
      const {id, value} = e.target
      setCredentials({...credentials, [id]: value})
    }

    const handleSubmit = async () => {
      console.log("cred login", credentials)
      await login(dispatch, credentials)
    }

  return (
    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
}}>
        <Card sx={{padding: '30px', width: '40%', boxShadow: '5'}}>
            <form action="submit">
            <TextField id="username" value={credentials.username} onChange={handleInputChange} label='Username' variant="outlined"  fullWidth sx={{marginBottom: '10px'}} />
            <TextField id="password" type='password' value={credentials.password} onChange={handleInputChange} label="Password" variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />

            <Box sx={{marginTop: '20px'}}>
              <Button onClick={handleSubmit} endIcon={<Send />} variant='contained'  sx={{color: 'white', backgroundColor: 'RGB(123, 45, 78)', width: '100%', '&:hover': {backgroundColor: 'RGB(123, 45, 78, 1)', }}}>Login</Button>
            </Box>
            
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