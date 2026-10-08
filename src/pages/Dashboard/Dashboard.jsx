import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const appointments = [
    {
      id: 1,
      client: "João Silva",
      service: "Corte Masculino",
      time: "14:00",
      status: "Pendente",
    },
    {
      id: 2,
      client: "Pedro Santos",
      service: "Barba",
      time: "15:00",
      status: "Confirmado",
    },
    {
      id: 3,
      client: "Carlos Lima",
      service: "Corte + Barba",
      time: "16:00",
      status: "Concluído",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="dashboard-page">

        <div className="dashboard-container">

          <div className="dashboard-header">

            <h1>Olá, Onyx Barber!!! 👋</h1>

            <p>
              Aqui está o resumo do seu dia.
            </p>

          </div>

          <div className="stats-grid">

            <div
              className="stat-card clickable"
              onClick={() =>
                navigate("/admin-appointments")
              }
            >
              <h2>8</h2>
              <p>Agendamentos Hoje</p>
            </div>

            <div className="stat-card">
              <h2>57</h2>
              <p>Clientes</p>
            </div>

            <div className="stat-card">
              <h2>12</h2>
              <p>Serviços</p>
            </div>

            <div className="stat-card">
              <h2>R$ 580</h2>
              <p>Faturamento</p>
            </div>

          </div>

          <div className="quick-actions">

            <h2>Ações Rápidas</h2>

            <div className="actions-grid">

              <button
                onClick={() =>
                  navigate("/admin-appointments")
                }
              >
                Agendamentos
              </button>

              <button>
                Horários
              </button>

              <button>
                Serviços
              </button>

            </div>

          </div>

          <div className="appointments-section">

            <h2>Próximos Agendamentos</h2>

            {appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="appointment-card"
              >
                <div className="appointment-time">
                  {appointment.time}
                </div>

                <div className="appointment-info">

                  <h3>
                    {appointment.client}
                  </h3>

                  <p>
                    {appointment.service}
                  </p>

                  <span
                    className={`status ${appointment.status.toLowerCase()}`}
                  >
                    {appointment.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default Dashboard;