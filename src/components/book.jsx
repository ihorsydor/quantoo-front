import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Input } from "@mui/material";
import { Box } from "@mui/material";

import { useForm, Controller } from "react-hook-form";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import api from "../api/index";
import styles from "../styles/form.module.scss";

const Book = () => {
  const [bookData, setBookData] = useState({
    name: "",
    publishing: "",
    siteNumber: "",
    photo: null,
    author: null,
  });

  const [authors, setAuthors] = useState([]);

  const { control } = useForm();

  useEffect(() => {
    api.author
      .getAllAuthors()
      .then((response) => {
        setAuthors(response);
        console.log(response);
      })
      .then()
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
console.log(e)
    if (name === "author") {
      const selectedAuthor = authors.find((author) => author._id === value);
      console.log(selectedAuthor)
      console.log(authors[0]._id)
      console.log(value)
      setBookData((prevBookData) => ({
        ...prevBookData,
        author: selectedAuthor,
      }));
    } else {
      setBookData((prevBookData) => ({
        ...prevBookData,
        [name]: value,
      }));
    }
  };

  const bookSubmitHandle = (e) => {
    e.preventDefault();
    api.book
      .createNewBook(bookData)
      .then(() => {
        console.log("Sukces");
        setBookData({
          name: "",
          publishing: "",
          siteNumber: "",
          photo: "",
          author: null,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
console.log(bookData.author)
console.log(bookData)
  return (
    <Box className={styles.box}>
      <form className={styles.form} onSubmit={bookSubmitHandle}>
        <div className={styles.formElementWidth}>
          <TextField
            label="Book name"
            name="name"
            value={bookData.name}
            className={styles.formElementWidth}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formElementWidth}>
          <TextField
            label="Publishing"
            name="publishing"
            value={bookData.publishing}
            className={styles.formElementWidth}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formElementWidth}>
          <TextField
            label="Number of sites"
            name="siteNumber"
            value={bookData.siteNumber}
            className={styles.formElementWidth}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formElementWidth}>
          <label htmlFor="btn-upload">
            <input
              id="btn-upload"
              type="file"
              name="photo"
              value={bookData.photo}
              className={styles.formElementWidth}
              onChange={handleChange}
            />
          </label>
        </div>
{/* 
        <div style={{ width: "100%" }}>
          <label htmlFor="author-select">Author</label>
          <select
            id="author-select"
            name="author"
            value={bookData.author ? bookData.author.id : ""}
            onChange={handleChange}
            style={{ width: "100%" }}
          >
            <option value="" disabled>
              Wybierz autora
            </option>
            {authors.map((author) => (
              <option key={author.id} value={author.id}>
                {author.name}
              </option>
            ))}
          </select>
        </div> */}
        <div className={styles.formElementWidth}>
          <FormControl className={styles.formElementWidth}>
            <InputLabel id="author-label">Author</InputLabel>
            <Select
              labelId="author-label"
              id="author-select"
              name="author"
              value={bookData.author ? bookData.author._id : ""}
              onChange={handleChange}
            >
              <MenuItem value="" disabled>
                Wybierz autora
              </MenuItem>
              {authors.map((author) => (
                <MenuItem key={author._id} value={author._id}>
                  {author.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <Button
          variant="contained"
          type="submit"
          className={styles.buttonSpacing}
        >
          Wyślij
        </Button>
      </form>
    </Box>
  );
};

export default Book;
