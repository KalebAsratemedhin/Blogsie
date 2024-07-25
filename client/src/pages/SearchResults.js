import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import {
    List,
    ListItemText,
    ListItemButton,
    ListItemAvatar,
    Typography,
    Box,
    Avatar


} from '@mui/material'
import { selectUser } from "../actions/user";
import { AuthContext } from "../contexts/AuthContext";

const SearchResults = () => {
    const {state: userState, dispatch: userDispatch} = useContext(UserContext)
    const navigate = useNavigate()
    const users = userState.searchResult
    const {state: authState, dispatch: authDispatch} = useContext(AuthContext)

  return (

    <Box>
        {(!users.length ) && <Typography variant="h3" color="initial">No Results</Typography> }
      {(users.length >= 1) && 
      <List>
         
         {  
             users.map((user) => {
                 return <ListItemButton onClick={() =>{
                    selectUser(userDispatch, user, authState.user)
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