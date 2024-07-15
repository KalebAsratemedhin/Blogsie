import { 
  List,
  Typography, 
  ListItemButton, 
  ListItemAvatar, 
  ListItemText, 
  Avatar, 
  TextField, 
  Autocomplete, 
  Stack, 
  Box, 
  styled, 
  InputBase, 
  alpha,
  IconButton
} from '@mui/material'
import React, { useContext, useState } from 'react'
import { SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SearchContext } from '../contexts/SearchContext';
import SearchBar from '../components/SearchBar';



const People = () => {
  const {state: searchState, dispatch: searchDispatch} = useContext(SearchContext)
    const navigate = useNavigate();
    const users = searchState.users

  return (

    <Box>
      <SearchBar></SearchBar>




      <List>
         
         {  
             users.map((user) => {
                 return <ListItemButton onClick={() =>{
                    navigate(`/public/${user.fullName}`)
                 }} alignItems="flex-start" >
                 <ListItemAvatar>
                   <Avatar alt="Remy Sharp">
                     {user.fullName[0].toUpperCase()}
                   </Avatar>  
                 </ListItemAvatar>
                 <ListItemText
                   primary={user.fullName}
                   secondary={
                     <Typography
                       sx={{ display: 'inline'}}
                       component="span"
                       variant="body2"
                       color="text.primary"
                     >
                      | {user.username}
                     </Typography>
                 }
                   
                 />
                 
               </ListItemButton>
             })
         }
     </List>
    </Box>
  );
}

export default People