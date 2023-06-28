import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/material";

import api from "../api/index";
import styles from "../styles/form.module.scss";

const Author = () => {
  const [authorData, setAuthorData] = useState({
    name: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorData((prevAuthorData) => ({
      ...prevAuthorData,
      [name]: value,
    }));
  };

  const authorSubmitHandle = (e) => {
    e.preventDefault();
    api.author
      .createNewAuthor(authorData)
      .then(() => {
        console.log("Sukces");
        setAuthorData({
          name: "",
          author: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={styles.box}>
      <form className={styles.form} onSubmit={authorSubmitHandle}>
    <div className={styles.formElementWidth}>
        <TextField
          label="Author name"
          name="name"
          value={authorData.name}
          className={styles.formElementWidth}
          onChange={handleChange}
        />
</div>
<div className={styles.formElementWidth}>
        <TextField
          label="Country"
          name="country"
          value={authorData.country}
          className={styles.formElementWidth}
          onChange={handleChange}
        />
</div>
        

        <Button variant="contained" type="submit" className={styles.buttonSpacing}>
          Wyślij
        </Button>
      </form>
    </Box>
  );
};

export default Author;
