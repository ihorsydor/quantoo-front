import React, { useState, useEffect } from "react";

import api from "../api/index";
import styles from "../styles/form.module.scss";

const Form = () => {
  const [img, setImg] = useState(null);
  const [input, setInput] = useState({
    name: "",
    publishing: "",
    siteNumber: "",
    author: "",
  });

  const [authors, setAuthors] = useState([]);

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
    console.log(event.target.files)
    setImg(event.target.files[0]);
    
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
  const formSubmitHandle = (e) => {
    e.preventDefault();
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("name", input.name);
      formData.append("publishing", input.publishing);
      formData.append("siteNumber", input.siteNumber);
      formData.append("author", input.author._id);

      api.book.createNewBook(formData);
      setImg(null);
      setInput({
        name: "",
        publishing: "",
        siteNumber: "",
        author: "",
      })
    }
  };

  return (
    <div className={styles.box}>
      <form className={styles.form}>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            name="name"
            placeholder="Name"
            style={{ width: "200px" }}
            value={input.name}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <input
            className="form-control"
            name="publishing"
            placeholder="Publishing"
            style={{ width: "200px" }}
            value={input.publishing}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <input
            className="form-control"
            type="number"
            name="siteNumber"
            placeholder="Site Number"
            value={input.siteNumber}
            style={{ width: "200px" }}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <input
            className="form-control"
            name="image"
            type="file"
            style={{ width: "280px" }}
            onChange={handleImgSelect}
          />
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
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <select
            className="form-select"
            name="author"
            value={input.author && input.author._id ? input.author._id : ""}
            style={{ width: "200px" }}
            onChange={handleInputChange}
          >
            <option value="">Select an author</option>
            {authors.map((author) => (
              <option key={author._id} value={author._id}>
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mt-4 justify-content-center">
        <div className="col">
          <button className="btn btn-primary" onClick={formSubmitHandle}>
            Upload
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Form;
