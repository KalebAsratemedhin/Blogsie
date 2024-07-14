import { List, Typography, ListItemButton, ListItemAvatar, ListItemText, Avatar, TextField, Autocomplete, Stack, Box, styled, InputBase, alpha } from '@mui/material'
import React, { useState } from 'react'
import { SearchRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    // border: '1px solid black',
    width: '400px',
    marginLeft: 0,
   
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiAutocomplete-inputRoot': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      
    },
  }));

const People = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const users = [{
        fullName: "Alemu Haile",
        job: "senior developer",
        age: 21,
        sex: 'Male',
        phoneNumber: '09876543',
        email: 'alemu@gmail.com',
        bio: "love HOD",
        followers: '1B'
     },
     {
        fullName: "Kebede Haile",
        job: "hollywood star",
        age: 21,
        sex: 'Male',
        phoneNumber: '09876543',
        email: 'kebede@gmail.com',
        bio: "love GOT",
        followers: '1K'
     },
     {
        fullName: "Baba tolobeye",
        job: "painter",
        age: 21,
        sex: 'Male',
        phoneNumber: '09876543',
        email: 'baba@gmail.com',
        bio: "love",
        followers: '199K'
     },
    ]
  return (

    <Box>


        <Search>
            <SearchIconWrapper>
              <SearchRounded />
            </SearchIconWrapper>
            <StyledAutocomplete
                value={searchTerm}
                freeSolo
                onChange={(e) => {
                    alert('Hi')
                    setSearchTerm(e.target.value)
                }}
              inputProps={{ 'aria-label': 'search' }}
              options={users.map((option) => option.fullName)}
            renderInput={(params) => <TextField {...params}  />}
           
            
            
            />
          </Search>



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
                       {user.job} | {user.followers} followers
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

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },]
export default People