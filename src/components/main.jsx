import React, { useEffect, useState } from "react";
import api from "../api/index";
import styles from "./../styles/form.module.scss";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import SwiperButtonComponent from "./swiperNavButton";

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
    photoUrl: '',
    photoName: "",
  });
  
  const[searchQuery, setSearchQuery]=useState('')
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.book.getAllBooks();
        setBookList(response);
        setChosenBook((prevState) => ({
          ...prevState,
          photoUrl: response[0].imagePath,
          name: response[0].name,
          publishing: response[0].publishing,
          siteNumber: response[0].siteNumber,
          author: response[0].author.name,
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

  const handleSearchQuery = (e)=>{
    setSearchQuery(e.target.value)
  }

  const filteredBookList = bookList.filter((book) =>
  (book.name && book.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
  (book.author && book.author.name.toLowerCase().includes(searchQuery.toLowerCase()))
);
console.log(filteredBookList)

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
    setSearchQuery('')
  };
  console.log(bookList);

  const swiper = useSwiper();
  const SwiperButtonNext = ({ children }) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slideNext()}>{children}</button>;
  };
  const SwiperButtonPrev = ({ children }) => {
    const swiper = useSwiper();
    return <button onClick={() => swiper.slidePrev()}>{children}</button>;
  };

  return (
    <div>
      <div>
      <div style={{ position: 'relative' }}>
  <input
    type="text"
    value={searchQuery}
    onChange={handleSearchQuery}
    placeholder="Wyszukaj książkę"
  />
  {searchQuery.length > 1 && filteredBookList.length > 0 && (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        left: 0,
        width: '100%',
        background: '#fff',
        border: '1px solid #ccc',
        borderRadius: '4px',
        padding: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
      }}
    >
      {filteredBookList.map((book) => (
        <p
          onClick={() => previewChosenBook(book)}
          key={book.id}
          style={{ cursor: 'pointer' }}
        >
          {book.name} {book.author.name}
        </p>
      ))}
    </div>
  )}
</div>

        <div>
          <h2>Wybierz książkę</h2>
        </div>
<div class="row">
  <div class='col-1'></div>
        <div class="col-10">
          <Swiper
            // install Swiper modules
            // modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={30}
            slidesPerView={4}
            // navigation
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            <div class="row">
              <div class="col-1">
                coś tam
              </div>
              <div class="col-10">
                {bookList.map((book, index) => (
                  <SwiperSlide key={index}>
                    <div>
                      <img
                        src={book.imagePath}
                        alt={book.name}
                        id="photo-current"
                        width="200"
                        height="200"
                        onClick={() => previewChosenBook(book)}
                      />
                      <hr />
                      <button onClick={() => previewChosenBook(book)}>
                        pokaż
                      </button>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
              <div class="col-1"></div>
              <SwiperButtonNext>Next</SwiperButtonNext>
            </div>
            <SwiperButtonComponent  />
          </Swiper>
          {/* <div class='col-1'></div> */}
        </div></div>
      </div>
      <div class="row">
        <div class="col">
          <img
            src={chosenBook.photoUrl}
            style={{
              width: "385px",
              height: "325px",
              objectFit: "cover",
            }}
            alt="Zdjęcie książki"
          />
        </div>
        <div
          className="col"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="row" style={{ flex: "1 1 25%" }}>
            Tytuł: {chosenBook.name}
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
            Autor: {chosenBook.author}{" "}
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
            Wydawnictwo: {chosenBook.publishing}{" "}
          </div>
          <div className="row" style={{ flex: "1 1 25%" }}>
            Ilość stron: {chosenBook.siteNumber}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
