import React, { useEffect, useState } from "react";
import api from "../api/index";
import Author from "./author";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import styles from "./../styles/form.module.scss";

const AuthorList = () => {
  const [authorList, setAuthorList] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editAuthorData, setEditAuthorData] = useState(selectedAuthor || {});

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

  const handleDelete = async (authorId) => {
    try {
      await api.author.deleteAuthor(authorId);
      setAuthorList((prevAuthorList) =>
        prevAuthorList.filter((author) => author._id !== authorId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModalOpen = (author) => {
    setSelectedAuthor(author);
    setEditAuthorData({
      name: author.name,
      country: author.country,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditAuthorChange = (e) => {
    const { name, value } = e.target;
    setEditAuthorData((prevAuthorData) => ({
      ...prevAuthorData,
      [name]: value,
    }));
  };
  const handleEditAuthorSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.author.editAuthor(editAuthorData, selectedAuthor._id);
      console.log(response);
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authorList.map((author, index) => (
            <TableRow key={index}>
              <TableCell>{author.name}</TableCell>
              <TableCell>{author.country}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(author._id)}
                >
                  Kasuj
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditModalOpen(author)}
                >
                  Edytuj
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <hr />
      <Modal
        className={styles.modal}
        open={editModalOpen}
        onClose={handleEditModalClose}
      >
        <div className={styles.modalContent}>
          <h2>Edit Author</h2>
          <form className={styles.form} onSubmit={handleEditAuthorSubmit}>
            <div className={styles.modalContent}>
            <TextField
              label="Author"
              name="name"
              value={editAuthorData.name}
              onChange={handleEditAuthorChange}
              className={styles.modalElementWidth}
            />

            <TextField
              label="Country"
              name="country"
              value={editAuthorData.country}
              onChange={handleEditAuthorChange}
              className={styles.modalElementWidth}
            />

            <Button 
            variant="contained" 
            type="submit"
            className={styles.modalElementWidth}>
              Save
            </Button>
            </div>
          </form>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default AuthorList;
