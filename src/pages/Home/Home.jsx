// src/pages/Home/Home.jsx

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Home.css";

function Home() {
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

        <button>
          AGENDAR HORÁRIO
        </button>

      </section>

      <Footer />
    </>
  );
}

export default Home;