import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";


// Styles
import styles from "./../styles/navigation.module.scss";

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className={styles.navContainer}>
          <div className="d-flex">
            <div className="p-2">
              <Nav.Link href="/" className={styles.darkText}>
                Main
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/author" className={styles.darkText}>
                Author add
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/author-list" className={styles.darkText}>
                Author list
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/book" className={styles.darkText}>
                Book Add
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/book-list" className={styles.darkText}>
                Book list
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/author-search" className={styles.darkText}>
                Author search
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/author-search-backend" className={styles.darkText}>
                Author search backend
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link href="/frontend" className={styles.darkText}>
                Frontend
              </Nav.Link>
            </div>
          </div>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
