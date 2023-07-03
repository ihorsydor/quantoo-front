import React from "react";
import styles from "./../styles/frontend.module.scss";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Frontend = () => {
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
                class=" bg-light g-0  text-light"
                style={{
                  width: "calc(50%)",
                  height: 0,
                  paddingBottom: "calc(50%)",
                }}
              ></div>
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
      <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      <SwiperSlide><div className="bg-dark" style={{ height: "200px", width:'200px' }}></div></SwiperSlide>
      
    </Swiper>
    </div>
  );
};

export default Frontend;
