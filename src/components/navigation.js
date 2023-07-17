import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";


// Styles
import styles from "./../styles/navigation.module.scss";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";

const Navigation = () => {
  const [menuToggle, setMenuToggle] = useState(true);
  const [textChange, setTextChange] = useState("User");

  let navigate = useNavigate()

  const onMenuChange = () => {
    setMenuToggle(!menuToggle);

    const menuText = menuToggle ? "Back to site" : "User";
    setTextChange(menuText);

    if (menuToggle) {
      navigate("/book-list");
    } else {
      navigate("/");
    }
  };

  console.log(menuToggle)

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
  <button className="btn btn-link" onClick={onMenuChange}>{textChange}</button>
</div>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {menuToggle ?(
           <NavbarCollapse id="basic-navbar-nav">
          <div className="d-flex">
            <div className="p-2">
              <Nav.Link as={Link} to="/"  className={styles.darkText}>
                Main
              </Nav.Link>
            </div>
            <div className="p-2">
              <Nav.Link as={Link} to="/frontend"  className={styles.darkText}>
                Frontend
              </Nav.Link>
            </div>
          </div>
        </NavbarCollapse>
        ):(
          <Navbar.Collapse id="basic-navbar-nav">
          
            <div className="d-flex">
              <div className="p-2">
                <Nav.Link 
                as={Link} 
                to="/author" 
                className={styles.darkText}
                // onMouseEnter={(e) => {
                //   e.target.classList.add(styles.hovered);
                // }}
                // onMouseLeave={(e) => {
                //   e.target.classList.remove(styles.hovered);
                // }}
                >
                  Author add
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link as={Link} to="/author-list" className={styles.darkText}>
                  Author list
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link as={Link} to="/book" className={styles.darkText}>
                  Book Add
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link as={Link} to="/book-list" className={styles.darkText}>
                  Book list
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link as={Link} to="/author-search" className={styles.darkText}>
                  Author search
                </Nav.Link>
              </div>
              <div className="p-2">
                <Nav.Link
                as={Link}
                  to="/author-search-backend"
                  className={styles.darkText}
                >
                  Author search backend
                </Nav.Link>
              </div>
            </div>
         
        </Navbar.Collapse>
        )
      }
       
      
      </Navbar>
    </div>
  );
};

export default Navigation;
