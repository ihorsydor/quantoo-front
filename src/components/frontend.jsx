import React from "react";
import styles from "./../styles/frontend.module.scss";

const Frontend = () => {
  return (
    <div>
      {/* Row 2*/}

      <div className="col-lg-12">
        <div className="row">
          <div className={`col-lg-3 ${styles.innerRow}`}></div>
          <div className={`col-lg-6 ${styles.innerRow}`}></div>
          <div className={`col-lg-3 ${styles.innerRow}`}></div>
        </div>
      </div>
      {/* Row 3*/}

      <div className="col-lg-12">
        <div className="row">
          <div className={"col-lg-9"}>
            <div className="row ">
              <div className={`col ${styles.innerRow}`}></div>
              <div className={`col ${styles.innerRow}`}></div>
            </div>
          </div>
          <div className={`col-lg-3 ${styles.innerRow}`}></div>
        </div>
      </div>
      {/* Row 4*/}

      <div className="col-lg-12">
        <div className="row">
          <div className={`col-lg-6 ${styles.square}`}>
            <div className={`g-0 row ${styles.squareDevideCol}`}></div>
            <div className={`g-0 row ${styles.squareDevideCol}`}></div>
            {/* <div className={`row  ${styles.squareDevideCol}`}>
              <div className={`col ${styles.littleSquare}`}></div>
              <div className={`col ${styles.littleSquare}`}></div>
              <div className={`col ${styles.littleSquare}`}></div>
            </div> */}
            {/* <div className={styles.squareDevideCol}>
              <div className={`col-lg-6 ${styles.littleSquare}`}></div>
            </div>
            <div className={`col-lg-6 ${styles.square}`}></div> */}
          </div>
          <div className={`col-lg-6 ${styles.square}`}></div>
        </div>
      </div>
    </div>
  );
};

export default Frontend;
