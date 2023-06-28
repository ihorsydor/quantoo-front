import React from 'react';
import styles from './../styles/frontend.module.scss';

const Frontend = () => {
  return (
    <div className={`${styles['no-bootstrap-styling']} ${styles.container}`}>
      {/* Drugi rząd */}
      <div className={`${styles.containerRow3} ${styles.noGutters} ${styles.customRow}`}>
        <div className={`col-lg-3 ${styles.column}`}></div>
        <div className={`col-lg-6 ${styles.column}`}></div>
        <div className={`col-lg-3 ${styles.column}`}></div>
      </div>

      {/* Trzeci rząd */}
      <div className={`${styles.containerRow3} ${styles.noGutters} ${styles.customRow}`}>
        <div className={`col-lg-9 ${styles.column}`}>
          <div className={`row ${styles.innerRow} ${styles.noGutters} ${styles.customRow}`}>
            <div className={`col no-gutters ${styles.innerColumn} ${styles.customColumn}`} style={{ borderRight: '5px solid white' }}>
              {/* Pierwszy div */}
            </div>
            <div className={`col no-gutters ${styles.innerColumn} ${styles.customColumn}`} style={{ borderLeft: '5px solid white' }}>
              {/* Drugi div */}
            </div>
          </div>
        </div>
        <div className={`col-lg-3 no-gutters ${styles.column}`}></div>
      </div>

      {/* Czwarty rząd */}
      <div className={`row ${styles.noGutters} ${styles.containerRow4}`}>
        <div className={`col-lg-6 ${styles.columnRow4}`}>
          <div className={styles.subContainer}>
            <div className={styles.square}>{/* Kwadrat 1 */}</div>
            <div className={styles.square}>{/* Kwadrat 2 */}</div>
            <div className={styles.square}>{/* Kwadrat 1 */}</div>
          </div>
          <div className={styles.bottomLeftSqare}></div>
        </div>

        <div className={`col-lg-6 ${styles.noGutters} ${styles.columnRow4}`}>
          <div className={styles.rightColumn}>
            <div className={styles.rightColumn}></div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.rightColumn}></div>
          </div>
        </div>
      </div>
      <div className={"col-lg-9"}>
      <div className="col-lg-12">
  <div className="col-lg-6" style={{ border: "1px solid black", display: "inline-block" }}>
    <h3>Half Section</h3>
  </div>
  <div className="col-lg-6" style={{ border: "1px solid black", display: "inline-block" }}>
    <h3>Half Section</h3>
  </div>
</div>
</div>
</div>
   
  );
};

export default Frontend;
