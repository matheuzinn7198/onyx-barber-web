import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("A senha deve possuir pelo menos 6 caracteres.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem.");
      return;
    }

    navigate("/password-success");
  };

  return (
    <>
      <Navbar />

      <main className="reset-page">
        <div className="reset-card">
          <h1>Redefinir Senha</h1>

          <p>
            Digite sua nova senha para concluir a recuperação da conta.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nova Senha</label>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua nova senha"
                required
              />
            </div>

            <div className="input-group">
              <label>Confirmar Senha</label>

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua nova senha"
                required
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                id="showPassword"
                onChange={() =>
                  setShowPassword(!showPassword)
                }
              />

              <label htmlFor="showPassword">
                Mostrar senha
              </label>
            </div>

            <button type="submit">
              Alterar Senha
            </button>
          </form>

          <Link to="/login" className="back-link">
            Voltar para Login
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default ResetPassword;