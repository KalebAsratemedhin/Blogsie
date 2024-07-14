import React from 'react';
import { Autocomplete, TextField } from '@mui/material';

const AutocompleteSearchBar = ({ options, value, onChange }) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      value={value}
      onChange={(event, newValue) => {
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="outlined"
          placeholder="Search..."
          fullWidth
        />
      )}
    />
  );
};

export default AutocompleteSearchBar;
