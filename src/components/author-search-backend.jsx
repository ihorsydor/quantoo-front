import React, { useEffect, useState } from "react";
import api from "../api/index";
import {
  TextField,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const AuthorSearchBackend = () => {
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchChange = async (event) => {
    const { value } = event.target;
    setSearchText(value);
    if (value.length >= 3) {
      try {
        const response = await api.author.searchAuthors(value);
        setSearchResults(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div>
      <TextField
        label="Search"
        value={searchText}
        onChange={handleSearchChange}
      />
      <List>
        {searchResults.map((author) => (
          <ListItem key={author._id}>
            <ListItemText primary={author.name} />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default AuthorSearchBackend;