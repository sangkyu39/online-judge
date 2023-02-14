import { Routes, Route, Link, useNavigate, Outlet } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Navigation() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="/">Online Judge</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/problems">Problems</Nav.Link>
          <Nav.Link href="/add">Add problem</Nav.Link>
          <Nav.Link href="/user">User</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Navigation;
