import { useContext, useState } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    Typography ,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { UserContext } from '../contexts/UserContext';
import { searchUsers } from '../actions/user';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {state: userState, dispatch: userDispatch} = useContext(UserContext)
    const navigate = useNavigate();
    const users = userState.users


    const handleSearch = async () => {

      if (searchTerm){
        await searchUsers(userDispatch, searchTerm)

      }
    }


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 2,
        p: 1,
        width: '45%'
      }}
    >
      <TextField
        label="Search for users"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ flex: 1 }}
      />
      <IconButton onClick={handleSearch}>
      <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
