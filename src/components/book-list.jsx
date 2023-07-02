import React, { useEffect, useState } from "react";
import api from "../api/index";

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
    photoUrl: "",
    photoName: "",
  });
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.book.getAllBooks();
        setBookList(response);
        // console.log(response);
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
      // console.log(bookId);
      const bookToDelete = bookList.find((book) => book._id === bookId);
      await api.book.deleteBook(bookId, bookToDelete.filename);
      setBookList((prevBookList) =>
        prevBookList.filter((book) => book._id !== bookId)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditModalOpen = (book) => {
    setSelectedBook(book);
    // console.log(selectedBook);
    setEditBookData({
      name: book.name,
      publishing: book.publishing,
      siteNumber: book.siteNumber,
      photo: book.file,
      photoUrl: book.imagePath,
      currantName: book.filename,
      author: book.author._id,
    });
    // console.log(editBookData);
    setEditModalOpen(true);
  };
  // useEffect(() => {
  //   console.log(selectedBook);
  // }, [selectedBook]);

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // console.log(editModalOpen);
  };

  const handleEditBookChange = (e) => {
    const { name, value } = e.target;
    if (name === "photo") {
      const file = e.target.files[0];
      const photoUrl = URL.createObjectURL(file);
      setEditBookData((prevBookData) => ({
        ...prevBookData,
        photo: file,
        photoUrl: photoUrl,
      }));
    } else {
      setEditBookData((prevBookData) => ({
        ...prevBookData,
        [name]: value,
      }));
    }
    // console.log(editBookData);
  };

  const handleEditBookSubmit = async (e) => {
    e.preventDefault();
    // console.log(editBookData.author);
    // console.log(editBookData);
    const formData = new FormData();
    formData.append("image", editBookData.photo);
    formData.append("name", editBookData.name);
    formData.append("publishing", editBookData.publishing);
    formData.append("siteNumber", editBookData.siteNumber);
    formData.append("author", editBookData.author);
    formData.append("currantName", editBookData.currantName);

    await api.book.editBook(selectedBook._id, formData);
    const updatedBookList = await api.book.getAllBooks();
    setBookList(updatedBookList);
    setEditModalOpen(false);
  };

  console.log(bookList)

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Publishing</th>
            <th>Site Number</th>
            <th>Photo</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {console.log(bookList[0])}
          {bookList ? (bookList.map((book, index) => (
            <tr key={index}>
              <td>{book.name}</td>
              <td>{book.publishing}</td>
              <td>{book.siteNumber}</td>
              <td>
                <img
                  src={book.imagePath}
                  className={styles.imageList}
                  alt={book.name}
                />
              </td>
              <td>{book.author.name}</td>
              <td>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => handleDelete(book._id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => handleEditModalOpen(book)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))
        ):(
          <tr>
          <td colSpan={6}>Loading...</td>
        </tr>
        )}
        </tbody>
      </table>
      <hr />

      {selectedBook && editModalOpen && (
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
                  onSubmit={(e) => handleEditBookSubmit(e)}
                >
                  <div className="form-group">
                    <label htmlFor="bookName">Book name</label>
                    <input
                      type="text"
                      className={`form-control ${styles.formElementWidth}`}
                      id="bookName"
                      name="name"
                      value={editBookData.name}
                      onChange={handleEditBookChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="publishing">Publishing</label>
                    <input
                      type="text"
                      className={`form-control ${styles.formElementWidth}`}
                      id="publishing"
                      name="publishing"
                      value={editBookData.publishing}
                      onChange={handleEditBookChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="siteNumber">Number of sites</label>
                    <input
                      type="number"
                      className={`form-control ${styles.formElementWidth}`}
                      id="siteNumber"
                      name="siteNumber"
                      value={editBookData.siteNumber}
                      onChange={handleEditBookChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photo-current">Current photo:</label>
                    {editBookData && (
                      <div>
                        {console.log(editBookData)}
                        <img
                          src={editBookData.photoUrl}
                          // src={editBookData.photoUrl ? URL.createObjectURL(editBookData.photo) : ""}
                          id="photo-current"
                          width="100"
                          height="100"
                          alt="Book Cover"
                        />
                      </div>
                    )}
                    <label htmlFor="photo-upload">Photo</label>
                    <input
                      type="file"
                      id="photo-upload"
                      name="photo"
                      className={`form-control ${styles.formElementWidth}`}
                      onChange={handleEditBookChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="author-select">Author</label>
                    <select
                      className={`form-control ${styles.formElementWidth}`}
                      id="author-select"
                      name="author"
                      value={editBookData.author}
                      onChange={handleEditBookChange}
                    >
                      <option value="" disabled>
                        Select an author
                      </option>
                      {authors.map((author) => (
                        <option key={author._id} value={author._id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
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

export default BookList;
