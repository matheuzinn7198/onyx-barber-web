// src/components/layout/Navbar.jsx

import "./Navbar.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import Container from "./Container";

function Navbar() {
  return (
    <header className="navbar">
      <Container>
        <nav className="navbar-content">

          <Link to="/" className="logo">
            ONYX
            <span>BARBER</span>
          </Link>

          <ul className="menu">

            <li>
              <Link to="/">Início</Link>
            </li>

            <li>
              <Link to="/agendamento">
                Agendar
              </Link>
            </li>

            <li>
              <Link to="/servicos">
              Serviços
              </Link>
            </li>

            <li>
              <Link to="/cadastro">
                Cadastro
              </Link>
            </li>

            <li>
              <Link to="/login">
                Login
              </Link>
            </li>

          </ul>

          <Link to="/login" className="login-btn">
            <FaUser />
          </Link>

        </nav>
      </Container>
    </header>
  );
}

export default Navbar;