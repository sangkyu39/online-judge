import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import Login from "../routes/Login";
import "./Navigation.css";
import { getAuth, signOut } from "firebase/auth";

function Navigation(props) {
  const [modalShow, setModalShow] = useState(false);
  const auth = getAuth();
  const navigate = useNavigate();
  function onLogOut() {
    signOut(auth);
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Online Judge</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/problems" className="menu">
            문제
          </Nav.Link>
          <Nav.Link href="/add" className="menu">
            출제
          </Nav.Link>
          {props.isLoggedIn ? (
            <Nav.Link onClick={onLogOut} className="menu">
              로그 아웃
            </Nav.Link>
          ) : (
            <div>
              <Nav.Link onClick={() => setModalShow(true)} className="menu">
                로그인
              </Nav.Link>

              <Login show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
