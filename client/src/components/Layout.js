// import { useLocation } from 'react-router-dom';
// import Sidebar from './SideBar';
// import { Container } from '@mui/material';

// const Layout = ({ children }) => {
//   const location = useLocation()
                
//     return (
//         <Container>
//             {location.pathname != "/" ?
//                <Sidebar />

//                 : ""}
//             {children}
//         </Container>
//     );
// };

// export default Layout;

import  { useContext, useState } from 'react';
import { CssBaseline, Card, Box, Container, AppBar, Toolbar, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from './SideBar';
import { Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const Layout = ({children}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const {state} = useContext(AuthContext)


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if(!state || !state.isAuthenticated ){
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
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <SideBar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet></Outlet>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
