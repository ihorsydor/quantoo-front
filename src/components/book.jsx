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
  const formSubmitHandle = () => {
    if (img) {
      const formData = new FormData();
      formData.append("image", img);
      formData.append("name", input.name);
      formData.append("publishing", input.publishing);
      formData.append("siteNumber", input.siteNumber);
      formData.append("author", input.author._id);

      api.book.createNewBook(formData);
    }
  };

  return (
    <div className={`${styles.formContainer} mt-4`}>
      <div className="row">
        <div className="col">
          <input
            className="form-control"
            name="name"
            placeholder="Name"
            style={{ width: "200px" }}
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
            value={input.author._id}
            onChange={handleInputChange}
          >
            <option>Select an author</option>
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
    </div>
  );
};

export default Form;
