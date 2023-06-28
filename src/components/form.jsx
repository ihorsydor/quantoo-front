import React, { useState } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/material";

import api from "../api/index";
import styles from "../styles/form.module.scss";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    form2: "",
    selectValue: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const formSubmitHandle = (e) => {
    e.preventDefault();
    api.form
      .createNewForm(formData)
      .then(() => {
        console.log("Sukces");
        setFormData({
          name: "",
          form2: "",
          selectValue: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box className={styles.box}>
      <form className={styles.form} onSubmit={formSubmitHandle}>
    <div className={styles.formElementWidth}>
        <TextField
          label="Form"
          name="name"
          value={formData.name}
          className={styles.formElementWidth}
          onChange={handleChange}
        />
</div>
<div className={styles.formElementWidth}>
        <TextField
          label="TextField 2"
          name="form2"
          value={formData.form2}
          className={styles.formElementWidth}
          onChange={handleChange}
        />
</div>
        <Select
          value={formData.selectValue}
          onChange={handleChange}
          className={styles.formElementWidth}
          name="selectValue"
          label="Select"
        >
          <MenuItem value="option1">Option 1</MenuItem>
          <MenuItem value="option2">Option 2</MenuItem>
          <MenuItem value="option3">Option 3</MenuItem>
        </Select>

        <Button variant="contained" type="submit" className={styles.buttonSpacing}>
          Wyślij
        </Button>
      </form>
    </Box>
  );
};

export default Form;
