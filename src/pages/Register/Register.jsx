import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Register.css";

function Register() {

  const navigate = useNavigate();

  const [phone, setPhone] =
  useState("");

  const formatPhone = (value) => {

  const numbers =
    value.replace(/\D/g, "");

  if (numbers.length <= 2) {
    return `(${numbers}`;
  }

  if (numbers.length <= 7) {
    return `(${numbers.slice(
      0,
      2
    )}) ${numbers.slice(2)}`;
  }

  return `(${numbers.slice(
    0,
    2
  )}) ${numbers.slice(
    2,
    7
  )}-${numbers.slice(7, 11)}`;
};

  return (
    <>
      <Navbar />

      <section className="register-page">

        <div className="register-container">

          <div className="register-header">

            <h1>Criar Conta</h1>

            <p>
              Cadastre-se gratuitamente e
              aproveite todos os benefícios
              da Onyx Barber.
            </p>

          </div>

          <form className="register-form">

            <div className="input-group">
              <label>Nome Completo</label>

              <input
                type="text"
                placeholder="Digite seu nome"
              />
            </div>

            <div className="input-group">
              <label>Telefone</label>

              <input
  type="tel"
  value={phone}
  placeholder="(00) 00000-0000"
  onChange={(e) =>
    setPhone(
      formatPhone(
        e.target.value
      )
    )
  }
/>
            </div>

            <div className="input-group">
              <label>E-mail</label>

              <input
                type="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="input-group">
              <label>Senha</label>

              <input
                type="password"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="input-group">
              <label>Confirmar Senha</label>

              <input
                type="password"
                placeholder="Confirme sua senha"
              />
            </div>

            <div className="checkbox-group">

              <input
                type="checkbox"
                id="offers"
              />

              <label htmlFor="offers">
                Desejo receber promoções
                e novidades da Onyx Barber
              </label>

            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Criar Conta
            </button>

          </form>

          <div className="register-footer">

            <p>
              Já possui uma conta?
            </p>

            <button
  className="login-link"
  onClick={() =>
    navigate("/login")
  }
>
  Entrar
</button>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Register;