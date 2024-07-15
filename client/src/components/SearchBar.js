import { useContext, useState } from 'react';
import { 
    TextField, 
    Button, 
    Box, 
    Typography ,
    IconButton
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { SearchContext } from '../contexts/SearchContext';
import { searchUsers } from '../actions/search';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const {state: searchState, dispatch: searchDispatch} = useContext(SearchContext)
    const navigate = useNavigate();
    const users = searchState.users


    const handleSearch = async () => {
      console.log("here we go search", searchTerm)

      if (searchTerm){
        await searchUsers(searchDispatch, searchTerm)

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
