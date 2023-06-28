import React, { useEffect, useState } from "react";
import api from "../api/index";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

import styles from "./../styles/form.module.scss";

const AuthorSearch = () => {
  const [authorList, setAuthorList] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await api.author.getAllAuthors();
        setAuthorList(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthors();
  }, []);

  const handleSearchQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAuthorList = authorList.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <TableContainer>
      <TextField
        label="Search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className={styles.searchInput}
      />

      {searchQuery.length >= 3 ? (
        filteredAuthorList.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAuthorList.map((author, index) => (
                <TableRow key={index}>
                  <TableCell>{author.name}</TableCell>
                  <TableCell>{author.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )
      ) : null}
    </TableContainer>
  );
};

export default AuthorSearch;
