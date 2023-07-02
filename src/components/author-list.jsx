import React, { useEffect, useState } from "react";
import api from "../api/index";
import Author from "./author";
import {
  Table,
  TableBody,
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
      const response = await api.author.editAuthor(
        editAuthorData,
        selectedAuthor._id
      );
      

      const updatedAuthorList = await api.author.getAllAuthors();
      setAuthorList(updatedAuthorList)
      console.log(response)
      setEditModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Country</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authorList.map((author, index) => (
            <tr key={index}>
              <td>{author.name}</td>
              <td>{author.country}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleDelete(author._id)}
                >
                  Kasuj
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleEditModalOpen(author)}
                >
                  Edytuj
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
      {selectedAuthor && editModalOpen && (
        <div className={styles.darkOverlay}>
          <div
            className={`${styles.modal}  ${editModalOpen ? "show" : ""}`}
            tabIndex="-1"
            role="dialog"
          >
            <div
              className={`${styles.modalContent} modal-dialog`}
              role="document"
            >
              <div className="modal-content">
                <div className="modal-header">
                  <h2 className="modal-title">Edit Book</h2>
                  <button
                    type="button"
                    className={`${styles.closeButton} ${styles.closeButtonRound}`}
                    onClick={handleEditModalClose}
                  >
                    <span aria-hidden="true" className={styles.closeIcon}>
                      &times;
                    </span>
                  </button>
                </div>
                <form
                  className={`${styles.form} modal-body`}
                  onSubmit={(e) => handleEditAuthorSubmit(e)}
                >
                  <div className="form-group">
                    <label htmlFor="authorName">Author name</label>
                    <input
                      type="text"
                      className={`form-control ${styles.formElementWidth}`}
                      id="authorName"
                      name="name"
                      value={editAuthorData.name}
                      onChange={handleEditAuthorChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Author name</label>
                    <input
                      type="text"
                      className={`form-control ${styles.formElementWidth}`}
                      id="country"
                      name="country"
                      value={editAuthorData.country}
                      onChange={handleEditAuthorChange}
                    />
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className={`btn btn-primary ${styles.modalElementWidth}`}
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthorList;
