import { useState } from "react";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./Profile.css";

function Profile() {
  const [formData, setFormData] = useState({
    name: "Matheus Büll",
    email: "matheus@email.com",
    phone: "(19) 99999-9999",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Dados salvos com sucesso!");
  };

  return (
    <>
      <Navbar />

      <main className="profile-page">
        <div className="profile-card">

          <div className="profile-avatar">
            MB
          </div>

          <h1>Meu Perfil</h1>

          <p>
            Gerencie suas informações pessoais.
          </p>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <label>Nome Completo</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>E-mail</label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Telefone</label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              Salvar Alterações
            </button>

          </form>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Profile;