import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem, Input } from "@mui/material";
import { Box } from "@mui/material";



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

  const [img, setImg]=useState('');


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

  const imgChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setImg(base64Image);

      setBookData((prevBookData) => ({
        ...prevBookData,
        photo: base64Image,
      }));
    };

    reader.onerror = (error) => {
      console.log(error);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  const bookSubmitHandle = (e) => {
    e.preventDefault();
    api.book
      .createNewBook({...bookData, photo: img})
      .then(() => {
        console.log("Sukces");
        setBookData({
          name: "",
          publishing: "",
          siteNumber: "",
          photo: null,
          author: null,
        });
        setImg('')
      })
      .catch((error) => {
        console.log(error);
      });
  };
console.log(bookData.author)
console.log(bookData)
  return (
    <Box className={styles.box}>
      <form className={styles.form} onSubmit={bookSubmitHandle} encType="multipart/form-data">
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
        <div className={styles.imageContainer}>
          {img && <img src={img} alt="Uploaded" className={styles.previewImage} />}
        </div>
        <input
          id="btn-upload"
          type="file"
          name="photo"
          className={styles.fileInput}
          onChange={imgChange}
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
