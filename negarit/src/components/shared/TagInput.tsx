import { TextField, Button, Chip, Box } from '@mui/material'; 
import React from 'react';

const TagInput: React.FC<{
    tags: string[];
    setTags: React.Dispatch<React.SetStateAction<string[]>>;
  }> = ({ tags, setTags }) => {
    const [tagInput, setTagInput] = React.useState<string>('');
  
    const addTag = () => {
      if (tagInput && !tags.includes(tagInput)) {
        setTags((prevTags) => [...prevTags, tagInput]);
        setTagInput('');
      }
    };
  
    const removeTag = (tagToRemove: string) => {
      setTags((prevTags) => prevTags.filter(tag => tag !== tagToRemove));
    };
  
    return (
      <Box>
        <TextField
          label="Tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
          variant="outlined"
          fullWidth
          margin="normal"
        />
        <Button onClick={addTag} variant="contained" sx={{ mt: 1 }}>
          Add
        </Button>
        <Box display="flex" flexWrap="wrap" mt={1}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => removeTag(tag)}
              className="mr-1 mb-1"
            />
          ))}
        </Box>
      </Box>
    );
  };

  export default TagInput