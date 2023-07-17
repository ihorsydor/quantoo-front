import React, { useEffect, useState } from "react";
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

const Frontend = () => {
  const [bookList, setBookList] = useState([{
    imagePath: ''
  }]);
  const [authors, setAuthors] = useState([]);
  const [chosenBook, setChosenBook] = useState({
    name: "",
    publishing: "",
    siteNumber: "",
    photo: null,
    author: "",
    photoUrl: null,
    photoName: "",
  });

  const [swiper, setSwiper] = useState();
  


  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.book.getAllBooks();
        setBookList(response);
        const firstBook = response[0];
        const photoUrl = firstBook.imagePath ? firstBook.imagePath : '';

        setChosenBook((prevState)=>({
          ...prevState,
          photoUrl: photoUrl,
        }))
        
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

 
console.log(chosenBook.photoUrl)
  const previewChosenBook = (book) => {
    setChosenBook({
      name: book.name,
      publishing: book.publishing,
      siteNumber: book.siteNumber,
      photo: book.file,
      photoUrl: book.imagePath,
      currantName: book.filename,
      author: book.author._id,
    });
    console.log(chosenBook);
  };
  console.log(bookList);

  return (
    <div>
      <div class="container"></div>
      <div class="container">
        <div class="row">
          <div class="col-md-3 bg-dark text-light">
            <h2>1</h2>
          </div>
          <div class="col-md-6 ">
            <h2>2</h2>
          </div>
          <div class="col-md-3 bg-dark text-light">
            <h2>3</h2>
          </div>
        </div>
        <div class="row">
          <div class="col bg-dark  text-light ">
            <h2>4</h2>
          </div>
          <div className="custom-col" style={{ width: "37.5%" }}>
            <h2>5</h2>
          </div>
          <div class="col-md-3 bg-dark  text-light">
            <h2>6</h2>
          </div>
        </div>
        <div class="row">
          <div
            class="col  bg-dark g-0  text-light"
            style={{ aspectRatio: "1/1" }}
          >
            <div className="row g-0" style={{ height: "50%", display: "flex" }}>
              <div
                className="col bg-light g-0 text-dark"
                style={{
                  width: "calc(33.33%)",
                  height: 0,
                  paddingBottom: "calc(33.33%)",
                }}
              >
                {" "}
                <h2>1</h2>
              </div>
              <div
                className="col bg-white g-0 text-dark"
                style={{
                  width: "calc(33.33%)",
                  height: 0,
                  paddingBottom: "calc(33.33%)",
                }}
              >
                <h2>2</h2>{" "}
              </div>
              <div
                className="col bg-light g-0 text-dark"
                style={{
                  width: "calc(33.33%)",
                  height: 0,
                  paddingBottom: "calc(33.33%)",
                }}
              >
                <h2>3</h2>{" "}
              </div>
            </div>
            <div class="row g-0" style={{ height: "50%" }}>
              <div
                className="bg-light g-0 text-light"
                style={{
                  width: "calc(50%)",
                  height: 0,
                  paddingBottom: "calc(50%)",
                  position: "relative",
                }}
              >
                <img
                  src={chosenBook.photoUrl}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="Zdjęcie książki"
                />
              </div>
            </div>
          </div>
          <div class="col-md-6 ">
            <div
              className="bg-dark row g-0"
              style={{ height: "50%", display: "flex" }}
            >
              <div class="row bg-light  g-0" style={{ height: "50%" }}></div>
            </div>
            <div
              className="bg-dark row g-0"
              style={{ height: "50%", display: "flex" }}
            >
              <div class="row bg-light  g-0" style={{ height: "50%" }}></div>
            </div>
          </div>
        </div>
      </div>
      <div className="carousel-container"
      style={{ marginTop: "20px" }}
      >
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
                  <hr />
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
      </div>
      
    </div>
  );
};

export default Frontend;
