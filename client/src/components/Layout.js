import  { useContext, useState } from 'react';
import { 
  CssBaseline, 
  Card, 
  Box, 
  Container, 
  AppBar, 
  Toolbar, 
  IconButton, 
  Typography, 
  useTheme, 
  useMediaQuery,
  styled,
  alpha,
  InputBase,

} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import SideBar from './SideBar';
import { Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { NotificationAdd, Person, Person2Rounded, Person2Sharp, PersonOutline, PersonOutlineRounded, PersonPinCircle, PersonSearchOutlined } from '@mui/icons-material';
import { searchUsers } from '../actions/user';
import { UserContext } from '../contexts/UserContext';

import { selectUser } from '../actions/user'




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



const Layout = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {state} = useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState()
  const navigate = useNavigate()
  const location = useLocation()
  const {state: userState, dispatch: userDispatch} = useContext(UserContext)
  

  const handleSearch = () => {
    if (location.pathname != '/search'){
      navigate('/search')
    }
    searchUsers(userDispatch, searchQuery)

  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if(!state?.username ){
    console.log(state)
    return ( 
      
      <Container sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <Card sx={{padding: '30%'}}>
        <Typography>You are not authorized!</Typography>
        <Link to='/'>Get started</Link>
        </Card>

      </Container>
    );
  }




  return (
    <div>
      {state?.username &&     <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <CssBaseline />
      <AppBar elevation={'0'} sx={
        {
          backgroundColor: 'RGB(123, 45, 78)' 
        }
      } >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h3" noWrap>
            Blogsie
          </Typography>
          <Box sx={{flexGrow: '1'}}></Box>
          <Search>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
            />

            <IconButton aria-label="search" onClick={handleSearch} sx={{ color: '#1c1c1c1' }}>
              <SearchIcon />
            </IconButton>
          </Search>
          <Box sx={{flexGrow: '1'}}></Box>

          {state?.username && <Typography variant="h5" color="initial">{state.username}</Typography> }

          <IconButton  onClick={() => {
              selectUser(userDispatch, state.user, state.user)
              navigate('/profile')
            } } sx={{ color: 'white' }}>
              <Person2Rounded />
            </IconButton>
          <IconButton  onClick={handleSearch} sx={{ color: 'white' }}>
              <NotificationAdd />
            </IconButton>

          
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>}
    </div>
  );
};

export default Layout;
