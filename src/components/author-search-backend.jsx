import React, { useEffect, useState } from "react";
import api from "../api/index";
import styles from "./../styles/form.module.scss";
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
        
        setSearchResults(response)
       
        console.log(response)
      } catch (error) {
        console.log(error);
      }
    } else {
      setSearchResults([]);
    }
  };
  
  useEffect(() => {
    console.log(searchResults); 
  }, [searchResults]);

  return (
    <div>
      <input
        label="Search"
        value={searchText}
        onChange={handleSearchChange}
      />
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {searchResults.map((author, index) => (
            <tr key={index}>
              <td>{author.name}</td>
              
              <td>{searchResults[index].books.map((book, index)=>(
              <p key={index}>{book.name}</p>  
              ))}
              </td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AuthorSearchBackend;