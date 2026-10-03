import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./ForgotPassword.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) return;

    navigate("/email-enviado");
  };

  return (
    <>
      <Navbar />

      <section className="forgot-page">

        <div className="forgot-container">

          <h1>Recuperar Senha</h1>

          <p>
            Digite o e-mail cadastrado para receber
            as instruções de recuperação.
          </p>

          <form
            className="forgot-form"
            onSubmit={handleSubmit}
          >

            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
            />

            <button type="submit">
              Enviar Link
            </button>

          </form>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ForgotPassword;