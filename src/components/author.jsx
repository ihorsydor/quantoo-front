import React, { useState } from "react";

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
          country: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.box}>
      <form className={styles.form} onSubmit={authorSubmitHandle}>
        <div className={styles.formElementWidth}>
          <input
            placeholder="Author name"
            name="name"
            value={authorData.name}
            className="form-control"
            style={{ width: "200px" }}
            onChange={handleChange}
          />
        </div>
        <div className={styles.formElementWidth}>
          <input
            placeholder="Country"
            name="country"
            value={authorData.country}
            className="form-control"
            style={{ width: "200px" }}
            onChange={handleChange}
          />
        </div>

        <button className="btn btn-primary" onClick={authorSubmitHandle}>
          Wyślij
        </button>
      </form>
    </div>
  );
};

export default Author;
