import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import googleIcon from "../../assets/icons/google-icon.png";
import "./Login.css";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <>
      <Navbar />

      <section className="login-page">

        <div className="login-container">

          <div className="login-header">

            <h1>Entrar</h1>

            <p>
              Acesse sua conta para
              acompanhar seus
              agendamentos e benefícios.
            </p>

          </div>

          <form className="login-form">

            <div className="input-group">

              <label>E-mail</label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
              />

            </div>

            <div className="input-group">

              <label>Senha</label>

              <div className="password-field">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Digite sua senha"
                />

                <button
                  type="button"
                  className="show-password-btn"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "Ocultar"
                    : "Mostrar"}
                </button>

              </div>

            </div>

            <div className="login-options">

              <label>

                <input type="checkbox" />

                Lembrar-me

              </label>

              <button
  type="button"
  className="forgot-password"
  onClick={() => {
    console.log("Cliquei");
    navigate("/recuperar-senha");
  }}
>
  Esqueci minha senha
</button>

            </div>

            <button
              type="submit"
              className="login-btn"
            >
              Entrar
            </button>

            <div className="separator">

  <span>OU</span>

</div>

<button
  type="button"
  className="google-btn"
  onClick={() => {
    console.log("Google clicado");
    navigate("/cadastro");
  }}
>
  <img
    src={googleIcon}
    alt="Google"
    className="google-icon"
  />

  Continuar com Google
</button>

          </form>

          <div className="register-link">

            <p>
              Ainda não possui conta?
            </p>

            <button
  onClick={() =>
    navigate("/cadastro")
  }
>
  Criar Conta
</button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Login;