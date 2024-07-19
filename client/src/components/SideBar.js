import React, { useContext } from 'react';
import { Drawer, Box, List, ListItemButton, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import { Inbox as InboxIcon, Mail as MailIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import Home from '../pages/Home';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import { Person } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext';
import { logout } from '../actions/auth';

const SideBar = ({ mobileOpen, handleDrawerToggle }) => {
  const drawerWidth = 240;
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate()
  const menu = {
    'Create Blog': ['/create-blog',  <ArticleIcon /> ],
    'Blogs': ['/blogs', <NewspaperIcon /> ],
    'Home': ['/', <HomeIcon />]
  }
  const {state: authState, dispatch: authDispatch} = useContext(AuthContext)

  const handleLogout = async (e) => {
    await logout(authDispatch)
    navigate('/')

  }

  const handleClick = (entry) => {
    navigate(entry[0])
  }
  const drawer = (
    <Box sx={{paddingTop: '25%'}}>
      <List>
        {
            Object.keys(menu).map((key) => {
                return <ListItemButton key={key} component="a" onClick={() => handleClick(menu[key])}

                sx={{ '&:hover': {  color: 'RGB(123, 45, 78)'  }, '&:hover .MuiListItemIcon-root': { color: 'RGB(123, 45, 78)'  }, color: 'white'}}>
                            <ListItemIcon sx={{color: 'white'}}>
                                {[menu[key][1]]}
                            </ListItemIcon>
                            <ListItemText   primary={key} />
                        </ListItemButton>
              
            })
        }
        <ListItemButton onClick={handleLogout}  component="a" 
                sx={{ '&:hover': {  color: 'RGB(123, 45, 78)'  }, '&:hover .MuiListItemIcon-root': { color: 'RGB(123, 45, 78)'  }, color: 'white'}}>
                            <ListItemIcon sx={{color: 'white'}}>
                               <Logout />
                            </ListItemIcon>
                            <ListItemText   primary='Logout' />
                        </ListItemButton>
        
      </List>
    </Box >
  );

  return (
    <nav>
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            backgroundColor: '#242424',
              zIndex: theme.zIndex.appBar + 1
          
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
                backgroundColor: '#1e1f1e',

                marginTop: '64px'
                },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </nav>
  );
};

export default SideBar;
