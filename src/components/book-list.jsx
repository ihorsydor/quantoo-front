import React, { useEffect, useState } from "react";
import api from "../api/index";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import styles from "./../styles/form.module.scss";

const BookList = () => {
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editBookData, setEditBookData] = useState({
    name: "",
    publishing: "",
    siteNumber: "",
    photo: null,
    author: "",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.book.getAllBooks();
        setBookList(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAuthors = async () => {
      try {
        const response = await api.author.getAllAuthors();
        setAuthors(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBooks();
    fetchAuthors();
  }, []);

  const handleDelete = async (bookId) => {
    try {
      await api.book.deleteBook(bookId);
      setBookList((prevBookList) =>
        prevBookList.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModalOpen = (book) => {
    setSelectedBook(book);
    setEditBookData({
      name: book.name,
      publishing: book.publishing,
      siteNumber: book.siteNumber,
      photo: book.photo,
      author: book.author.name,
    });
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
  };

  const handleEditBookChange = (e) => {
    const { name, value } = e.target;
    setEditBookData((prevBookData) => ({
      ...prevBookData,
      [name]: value,
    }));
  };

  const handleEditBookSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.book.editBook(editBookData, selectedBook.id);
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
            <TableCell>Publishing</TableCell>
            <TableCell>Site Number</TableCell>
            <TableCell>Photo</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bookList.map((book, index) => (
            <TableRow key={index}>
              <TableCell>{book.name}</TableCell>
              <TableCell>{book.publishing}</TableCell>
              <TableCell>{book.siteNumber}</TableCell>
              <TableCell>
                <img src={book.photo.url} alt="Book Cover" />
              </TableCell>
              <TableCell>{book.author.name}</TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleEditModalOpen(book)}
                >
                  Edit
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
          <h2>Edit Book</h2>
          <form className={styles.form} onSubmit={handleEditBookSubmit}>
            <div className={styles.modalContent}>
              <TextField
                label="Book name"
                name="name"
                value={editBookData.name}
                className={styles.formElementWidth}
                onChange={handleEditBookChange}
              />
            </div>
            <div className={styles.formElementWidth}>
              <TextField
                label="Publishing"
                name="publishing"
                value={editBookData.publishing}
                className={styles.formElementWidth}
                onChange={handleEditBookChange}
              />
            </div>
            <div className={styles.formElementWidth}>
              <TextField
                label="Number of sites"
                name="siteNumber"
                value={editBookData.siteNumber}
                className={styles.formElementWidth}
                onChange={handleEditBookChange}
              />
            </div>
            <div className={styles.formElementWidth}>
              <label htmlFor="photo-upload">
                <input
                  id="photo-upload"
                  type="file"
                  name="photo"
                  className={styles.formElementWidth}
                  onChange={handleEditBookChange}
                />
              </label>
            </div>
            <div className={styles.formElementWidth}>
              <FormControl className={styles.formElementWidth}>
                <InputLabel id="author-label">Author</InputLabel>
                <Select
                  labelId="author-label"
                  id="author-select"
                  name="author"
                  value={editBookData.author}
                  onChange={handleEditBookChange}
                >
                  <MenuItem value="" disabled>
                    Select an author
                  </MenuItem>
                  {authors.map((author) => (
                    <MenuItem key={author._id} value={author._id}>
                      {author.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className={styles.formElementWidth}>
              <Button
                variant="contained"
                type="submit"
                className={styles.modalElementWidth}
              >
                Save
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </TableContainer>
  );
};

export default BookList;
