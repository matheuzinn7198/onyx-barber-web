import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./ForgotPasswordSuccess.css";

function ForgotPasswordSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <section className="email-sent-page">

        <div className="email-sent-container">

          <div className="success-icon">
            📧
          </div>

          <h1>E-mail Enviado</h1>

          <p>
            Se existir uma conta vinculada ao e-mail informado,
            você receberá um link para redefinir sua senha.
          </p>

          <p className="email-info">
            Verifique também sua caixa de spam.
          </p>

          <button
            className="back-login-btn"
            onClick={() => navigate("/login")}
          >
            Voltar para Login
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ForgotPasswordSuccess;