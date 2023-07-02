import React, { useState, useEffect } from "react";
import { Button, TextField, Select, MenuItem } from "@mui/material";
import { Box } from "@mui/material";

import api from "../api/index";
import styles from "../styles/form.module.scss";

const Form = () => {
  
  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    input:'',
    input2:'',
    input3:'',
    author: null
  });

  const [authors, setAuthors] = useState([]);
  const [selectAuthor, setSelectAuthor] = useState('')

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
  
  const handleImgSelect = (event) => {
    setImg(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    if (name === "author") {
      const selectedAuthor = authors.find((author) => author._id === value);
     
      setInput((prevState) => ({
        ...prevState,
        author: selectedAuthor,
      }));
    } else {
      setInput((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  const formSubmitHandle = () => {
    if (img) {
      const formData = new FormData();
      formData.append('image', img);
      formData.append('input', input.input);
      formData.append('input2', input.input2);
      formData.append('input3', input.input3);
      formData.append('author', input.author._id);
    
api.form.createNewForm(formData)

     
  }};
 
  return (
  
    <div>
      <input name="input" onChange={handleInputChange}/>
      <input name="input2" onChange={handleInputChange}/>
      <input name="input3" onChange={handleInputChange}/>
      <input name= "obrazek" type="file" onChange={handleImgSelect} />
      {img && (
        <div>
          <img
            src={URL.createObjectURL(img)}
            alt="Uploaded Image"
            width="100"
            height="100"
          />
        </div>
      )}
        <select name='author' value={input.author} onChange={handleInputChange}>
        <option >Select an author</option>
        {authors.map((author) => (
          <option key={author._id} value={author._id}>
            {author.name}
          </option>
        ))}
      </select>
      <button onClick={formSubmitHandle}>Upload</button>
    </div>
 
  );
};

export default Form;
