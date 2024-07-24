import {Container, AppBar, Toolbar, Button, Typography, Box} from '@mui/material'
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { selectUser } from '../actions/search';
import { SearchContext } from '../contexts/SearchContext';


const Home = () => {
    const navigate = useNavigate()
    const {state: authState} = useContext(AuthContext)
    const {state: searchState, dispatch: searchDispatch} = useContext(SearchContext)

    useEffect(() => {
        if (authState.username){
            selectUser(searchDispatch, authState.user)
            navigate('/profile')

        }
    }, [authState]) 
    
    return (
        <Container sx={{marginTop: '20px'}}>
            <AppBar elevation={0} sx={{backgroundColor: 'white', borderBottom: '1px solid #b3b5b4'}}>

                <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant="h3" sx={{color: 'RGB(123, 45, 78)' }} noWrap>
                    Blogsie
                </Typography>
                <Box>
                    <Button onClick={() => {
                        navigate('/signup')
                    }}>Signup</Button>
                
                <Button onClick={() => {
                        navigate('/login')
                    }}>Login</Button>
                </Box>

                </Toolbar>
            </AppBar>
            <Toolbar></Toolbar>

            <Typography variant='h3'>Blogsie, your blogs hub!</Typography>
            <Typography sx={{marginTop: '20px'}}>
                    Do you have any ideas you want to share to your audience? You have come to 
                    the right place! Share your adventures, experiences, stories to people you don't even know.
                    Inspire people! Educate people! 
                </Typography>
            <Box sx={{marginTop: '20px'}}>
            
            <Typography sx={{marginTop: '20px'}}>Begin your journey with us.</Typography>
            </Box>
        </Container>
    );
}
 
export default Home;