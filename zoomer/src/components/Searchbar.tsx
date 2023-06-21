import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform search or filtering based on searchQuery and selectedCategory
    console.log("Search query:", searchQuery);
    console.log("Selected category:", selectedCategory);
  };

  return (
    <form className="search" onSubmit={handleSubmit}>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <FormControl>
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="category1">Category 1</MenuItem>
          <MenuItem value="category2">Category 2</MenuItem>
          {/* Add more MenuItem components for additional categories */}
        </Select>
      </FormControl>
      <button type="submit">Search</button>
    </form>
  );
};
