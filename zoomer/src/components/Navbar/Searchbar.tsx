import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Box,
} from '@mui/material';
import { Height } from '@mui/icons-material';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    console.log('Selected category:', selectedCategory);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <form className="search" onSubmit={handleSubmit}>
        <TextField
          sx={{ minWidth: 300, height: 50 }}
          id="search"
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Button
          sx={{ height: 55 }}
          color="primary"
          variant="outlined"
          type="submit"
        >
          Search{' '}
        </Button>
      </form>
    </Box>
  );
};
