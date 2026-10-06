import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./BookingSuccess.css";

function BookingSuccess() {
  const navigate = useNavigate();

  const handleWhatsApp = () => {
    const message = `
Olá!

Acabei de realizar um agendamento na Onyx Barber.

Gostaria de confirmar meu horário.
    `;

    window.open(
      `https://wa.me/5519999999999?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <>
      <Navbar />

      <main className="booking-success-page">

        <div className="booking-success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Agendamento Confirmado!</h1>

          <p>
            Seu horário foi registrado com sucesso.
          </p>

          <p>
            Em breve você poderá acompanhar seus
            agendamentos diretamente pelo sistema.
          </p>

          <div className="success-buttons">

            <button
              className="whatsapp-btn"
              onClick={handleWhatsApp}
            >
              WhatsApp
            </button>

            <button
              className="home-btn"
              onClick={() => navigate("/")}
            >
              Voltar para Início
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default BookingSuccess;