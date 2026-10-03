// src/pages/Home/Home.jsx

import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Home.css";

function Home() {

  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="hero">

        <h1>
          SUA MELHOR VERSÃO
          <br />
          COMEÇA AQUI
        </h1>

        <p>
          Cortes modernos, barba,
          estética e atendimento premium.
        </p>

       <button
  className="hero-btn"
  onClick={() =>
    navigate("/agendamento")
  }
>
  AGENDAR HORÁRIO
</button>

      </section>

      <Footer />
    </>
  );
}

export default Home;