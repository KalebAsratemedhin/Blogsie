import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";
import {
    List,
    ListItemText,
    ListItemButton,
    ListItemAvatar,
    Typography,
    Box,
    Avatar


} from '@mui/material'
import { selectUser } from "../actions/search";

const SearchResults = () => {
    const {state: searchState, dispatch: searchDispatch} = useContext(SearchContext)
    const navigate = useNavigate()
    const users = searchState.users

  return (

    <Box>
        {(!users.length ) && <Typography variant="h3" color="initial">No Results</Typography> }
      {(users.length >= 1) && 
      <List>
         
         {  
             users.map((user) => {
                 return <ListItemButton onClick={() =>{
                    selectUser(searchDispatch, user)
                    navigate(`/profile`)
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
                       sx={{ display: 'inline', fontStyle: 'italic'}}
                       component="span"
                       variant="body2"
                       color="text.primary"
                       
                     >
                      @ {user.username}
                     </Typography>
                 }
                   
                 />
                 
               </ListItemButton>
             })
         }
     </List>

      }
    </Box>
  );
}
 
export default SearchResults;