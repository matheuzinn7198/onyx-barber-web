import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./PasswordSuccess.css";

function PasswordSuccess() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="success-page">
        <div className="success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Senha Alterada!</h1>

          <p>
            Sua senha foi redefinida com sucesso.
            Agora você já pode acessar sua conta.
          </p>

          <button
            onClick={() => navigate("/login")}
          >
            Entrar
          </button>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default PasswordSuccess;