// src/components/layout/Navbar.jsx

import "./Navbar.css";
import { FaUser } from "react-icons/fa";
import Container from "./Container";

function Navbar() {
  return (
    <header className="navbar">
      <Container>
        <nav className="navbar-content">

          <a href="/" className="logo">
  ONYX
  <span>BARBER</span>
</a>

          <ul className="menu">
            <li>Início</li>
            <li>Serviços</li>
            <li>Galeria</li>
            <li>Avaliações</li>
            <li>Contato</li>
          </ul>

          <button className="login-btn">
            <FaUser />
          </button>

        </nav>
      </Container>
    </header>
  );
}

export default Navbar;