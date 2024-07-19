import {
    Container,
    Card,
    Button,
    TextField, 
    Typography, 
    Box
} from '@mui/material'
import { Password, Send, SendAndArchive } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { signup } from '../actions/auth'

const Signup = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({fullName: '', username: '', email: '', password: '', bio: ''})
    const {state, dispatch} = useContext(AuthContext)

    const handleInputChange = (e) => {
        const {id, value} = e.target
        setFormData({...formData, [id]: value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(dispatch, formData)
        
    }

    useEffect(() => {
      if(state && state.username){
        console.log("state", state, state.user)
        navigate('/profile')

      }

    }, [state])
  return (
    
    <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'
     }}>
        <Card sx={{padding: '30px', width: '40%', boxShadow: '5'}}>
            <form action="submit" >
              <TextField id="fullName" value={formData.fullName} onChange={handleInputChange} label="Full Name" variant="outlined" fullWidth sx={{marginBottom: '10px'}} />
              <TextField id="username" value={formData.username} onChange={handleInputChange} label='Username' variant="outlined"  fullWidth sx={{marginBottom: '10px'}} />
              <TextField id="email" type='email' value={formData.email} onChange={handleInputChange} label="Email" variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />
              <TextField id="password" type='password' value={formData.password} onChange={handleInputChange} label="Password" variant="outlined" fullWidth sx={{marginBottom: '10px'}}  />
              <TextField id="bio" value={formData.bio} onChange={handleInputChange} label="Bio" multiline rows={5}  variant="outlined" fullWidth sx={{marginBottom: '10px'}} />
          
              <Box sx={{marginTop: '20px'}}>
                <Button endIcon={<Send />} onClick={handleSubmit} variant='contained'  sx={{color: 'white', backgroundColor: 'RGB(123, 45, 78)', width: '100%', '&:hover': {backgroundColor: 'RGB(123, 45, 78, 1)', }}}>Signup</Button>
              </Box>
              <Typography sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                  Have an account? <Button sx={{paddingBottom: '8px'}} onClick={() => {
                  navigate('/login')
              }}>Login</Button>
              
              </Typography>
            
            </form>
        </Card>
    </Container>
  )
}

export default Signup