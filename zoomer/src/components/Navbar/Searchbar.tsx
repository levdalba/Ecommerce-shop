import React, { useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from '@mui/material';

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event: any) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
    console.log('Selected category:', selectedCategory);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <TextField
        sx={{ minWidth: 300, maxHeight: 40 }}
        id="search"
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FormControl>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          sx={{ minWidth: 60, maxHeight: 40 }}
          labelId="category-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          <MenuItem value="category3">Category 3</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit">
        Search
      </Button>
    </form>
  );
};
