import React from "react";
import styles from "./../styles/frontend.module.scss";

const Frontend = () => {
  return (
    <div className={`container ${styles.container}`}>
      {/* Pierwszy rząd */}
      <div className={`row ${styles.row}`}>
        <div className={`col-lg-12 ${styles.rowContent}`}>
          {/* Tu umieść zawartość pierwszego rzędu */}
        </div>
      </div>

      {/* Drugi rząd */}
      <div className={`row ${styles.row}`}>
        <div className={`col-lg-3 ${styles.column}`}>{/* Pierwszy div */}</div>
        <div className={`col-lg-6 ${styles.column}`}>{/* Drugi div */}</div>
        <div className={`col-lg-3 ${styles.column}`}>{/* Trzeci div */}</div>
      </div>

      {/* Trzeci rząd */}
      <div className={`row ${styles.row}`}>
        <div className={`col-lg-9 ${styles.column}`}>
          {/* Div na 9/12 szerokości */}
          <div className={`row ${styles.innerRow}`}>
            <div className={`col ${styles.innerColumn}`}>
              {/* Pierwszy div */}
            </div>
            <div className={`col ${styles.innerColumn}`}>{/* Drugi div */}</div>
          </div>
        </div>
        <div className={`col-lg-3 ${styles.column}`}>
          {/* Div na 3/12 szerokości */}
        </div>
      </div>

      {/* Czwarty rząd */}
      <div className={` ${styles.row2}`}>
        <div className={` ${styles.column2}`}>
          {/* Pierwszy kontener */}
          <div className={`${styles.subContainer}`}>
            <div className={` ${styles.square}`}>{/* Kwadrat 1 */}</div>
            <div className={` ${styles.square}`}>{/* Kwadrat 2 */}</div>
            <div className={` ${styles.square}`}>{/* Kwadrat 3 */}</div>
          </div>
          {/* Dolna sekcja */}

          {/* <div className={`${styles.bottomSquare}`}> */}
          <div className={`${styles.newbottomSquare}`}></div>
        </div>

        <div className={` ${styles.column}`}>
          {/* Drugi kontener */}
          <div className={`${styles.subContainer}`}>
            <div className={`row ${styles.subRow}`}>
              <div className={`col-lg-12 ${styles.rectangle}`}>
                {/* Prostokąt 1 */}
              </div>
            </div>
            <div className={`row ${styles.subRow}`}>
              <div className={`col-lg-12 ${styles.rectangle}`}>
                {/* Prostokąt 2 */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Ostatni rząd */}
      <div className={`row ${styles.row}`}>
        <div className={`col-lg-12 ${styles.slider}`}>
          {/* Slider */}
          <div className={`${styles.swiper}`}>
            {/* Zdjęcia */}
            <div className={`${styles.image}`}>{/* Zdjęcie 1 */}</div>
            <div className={`${styles.image}`}>{/* Zdjęcie 2 */}</div>
            <div className={`${styles.image}`}>{/* Zdjęcie 3 */}</div>
          </div>
        </div>
      </div>

      {/* Miejsce na tekst */}
      <div className={`${styles.text}`}>{/* Tekst */}</div>
      {/* Button "Czytaj" */}
      <button className={`${styles.button}`}>Czytaj</button>
      {/* Ikony do przewijania slidera */}
      <div className={`${styles.sliderIcons}`}>{/* Ikony */}</div>
      {/* Ikony do przewijania zdjęcia */}
      <div className={`${styles.imageIcons}`}>{/* Ikony */}</div>
    </div>
  );
};

export default Frontend;
