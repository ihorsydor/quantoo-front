import React, { useEffect, useState, useRef } from "react";
import api from "../api/index";
import styles from "./../styles/form.module.scss";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { register } from "swiper/element/bundle";
import { Swiper, Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/swiper-bundle.css";
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

    register();

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

  const swiperElRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    swiperRef.current = new Swiper(swiperElRef.current, {
      slidesPerView: 3,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination",
      },
    });

    swiperRef.current.on("progress", (swiper, progress) => {
      console.log(progress);
    });

    swiperRef.current.on("slideChange", () => {
      console.log("slide changed");
    });

    return () => {
      swiperRef.current.destroy();
    };
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div>
      <div>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchQuery}
            placeholder="Wyszukaj książkę"
          />
          {searchQuery.length > 1 && filteredBookList.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
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

        <div>
          <h2>Wybierz książkę</h2>
        </div>
        <div>
          <swiper-container
            ref={swiperElRef}
            slides-per-view="3"
            css-mode="true"
            navigation="true"
          >
            {bookList.map((book, index) => {
              if (!book.imagePath) {
                return null;
              }
              return (
                <swiper-slide key={index}>
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
                </swiper-slide>
              );
            })}
          </swiper-container>
        </div>
        <div class="row">
          <div class="col">
            <div className="swiper-button-prev" onClick={handlePrev}></div>
            <div class="col">
              <div className="swiper-button-next" onClick={handleNext}></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
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
