import React, { useEffect, useState, useRef } from "react";
import api from "../api/index";
import styles from "./../styles/form.module.scss";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Controller,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";



const Main = () => {
  const [bookList, setBookList] = useState([
    {
      imagePath: "",
    },
  ]);
  const [authors, setAuthors] = useState([]);
  const [chosenBook, setChosenBook] = useState({
    name: "",
    publishing: "",
    siteNumber: "",
    photo: null,
    author: "",
    photoUrl: "",
    photoName: "",
  });

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.book.getAllBooks();
        setBookList(response);

        const firstBook = response[0];
        const photoUrl = firstBook.imagePath ? firstBook.imagePath : null;

        setChosenBook((prevState) => ({
          ...prevState,
          photoUrl: photoUrl,
          name: firstBook.name,
          publishing: firstBook.publishing,
          siteNumber: firstBook.siteNumber,
          author: firstBook.author.name,
        }));
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

  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredBookList = bookList.filter(
    (book) =>
      (book.name &&
        book.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (book.author &&
        book.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  console.log(filteredBookList);

  console.log(chosenBook.photoUrl);
  const previewChosenBook = (book) => {
    setChosenBook({
      name: book.name,
      publishing: book.publishing,
      siteNumber: book.siteNumber,
      photo: book.file,
      photoUrl: book.imagePath,
      currantName: book.filename,
      author: book.author.name,
    });
    setSearchQuery("");
  };
  console.log(bookList);

  

  const [swiper, setSwiper] = useState();

  return (
    <div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchQuery}
          placeholder="Wyszukaj książkę"
          style={{ marginTop: "15px", marginBottom: "15px" }}
        />
        {searchQuery.length > 1 && filteredBookList.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              width: "25%",
              background: "#fff",
              border: "1px solid #ccc",
              borderRadius: "4px",
              padding: "10px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              zIndex: 9999,
            }}
          >
            {filteredBookList.map((book) => (
              <p
                onClick={() => previewChosenBook(book)}
                key={book.id}
                style={{ cursor: "pointer" }}
              >
                {book.name} {book.author.name}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y, Controller]}
          spaceBetween={24}
          slidesPerView={3}
          navigation
          updateOnWindowResize
          observer
          observeParents
          initialSlide={2}
          onSwiper={setSwiper}
        >
          {bookList.map((book, index) => {
            console.log(book)
            if (!book.imagePath) {
              return null;
            }
            return (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={book.imagePath}
                    alt={book.name}
                    id="photo-current"
                    display="block"
                    width="100%"
                    height="250px"
                    object-fit="cover"
                    onClick={() => previewChosenBook(book)}
                  />
                  
                  <div className="text-center">
                  <h2> {book.name}</h2>
                  <h4> {book.author.name}</h4> 
                    <button
                      className="btn btn-primary"
                      onClick={() => previewChosenBook(book)}
                    >
                      Pokaż
                    </button>
                  </div>
                 
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <div
          style={{
            display: "flex",
            marginTop: "35px",
            justifyContent: "center",
          }}
        >
          <div
            className="swiper-button-prev"
            style={{ position: "unset", marginRight: "15px" }}
            onClick={() => swiper.slidePrev()}
          ></div>
          <div
            className="swiper-button-next"
            style={{ position: "unset", marginLeft: "15px" }}
            onClick={() => swiper.slideNext()}
          ></div>
        </div>
        <hr />
      </div>
      <div
        class="row"
        style={{
          marginTop: "35px",
          marginBottom: "35px",
        }}
      >
        <div class="col">
          {chosenBook.photoUrl && chosenBook.photoUrl !== "" && (
            <img
              src={chosenBook.photoUrl}
              style={{
                width: "385px",
                height: "325px",
                objectFit: "cover",
              }}
              alt="Zdjęcie książki"
            />
          )}
        </div>
        <div
          className="col"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="row" style={{ flex: "1 1 25%" }}>
          <h2><b>Tytuł:</b> {chosenBook.name}</h2>
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
           <h3><b>Autor:</b> {chosenBook.author}</h3> 
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
            <h4><b>Wydawnictwo:</b> {chosenBook.publishing}</h4>
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
           <h4><b>Ilość stron:</b> {chosenBook.siteNumber}</h4> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
