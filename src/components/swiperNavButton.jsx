import React from "react";
import { useSwiper } from "swiper/react";

const SwiperButtonComponent = () => {
  const swiper = useSwiper();

  return (
    <div>
        <hr />
        <div class="swiper-button-next"></div>
<div class="swiper-button-prev"></div>
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
};

export default SwiperButtonComponent;
