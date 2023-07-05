import React, { useEffect, useState } from "react";
import api from "../api/index";
import styles from "./../styles/form.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
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
    photoUrl: bookList[0].imagePath,
    photoName: "",
  });

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
          author: response[0].author.name
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
    console.log(book.author.name);
  };
  console.log(bookList);

  return (
    <div>  
       <div>
        <div>
        <h2>Wybierz książkę</h2>
        </div>
        <div>
        <Swiper
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={30}
          slidesPerView={3}
          navigation
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
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
                <button onClick={() => previewChosenBook(book)}>pokaż</button>
              </div>
            </SwiperSlide>
          ))}
          <SwiperButtonComponent />
        </Swiper>
      </div></div>
      <div class="row">
        <div class='col'>
          <img
            src={chosenBook.photoUrl}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
            }}
            alt="Zdjęcie książki"
          />
        </div>
        <div className="col" style={{ display: 'flex', flexDirection: 'column' }}>
  <div className="row" style={{ flex: '1 1 25%' }}>Tytuł: {chosenBook.name}</div>
  <div className="row" style={{ flex: '1 1 25%' }}>Autor: {chosenBook.author} </div>
  <div className="row" style={{ flex: '1 1 25%' }}>Wydawnictwo: {chosenBook.publishing} </div>
  <div className="row" style={{ flex: '1 1 25%' }}>Ilość stron: {chosenBook.siteNumber}</div>
</div>

      </div>
   
    </div>
  );
};

export default Main;
