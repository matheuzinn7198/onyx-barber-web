import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./History.css";

function History() {
  const appointments = [
    {
      id: 1,
      service: "Corte Masculino",
      date: "10/10/2026",
      time: "14:00",
      status: "Concluído",
    },
    {
      id: 2,
      service: "Barba",
      date: "20/10/2026",
      time: "16:00",
      status: "Agendado",
    },
    {
      id: 3,
      service: "Limpeza de Pele",
      date: "25/10/2026",
      time: "09:00",
      status: "Cancelado",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="history-page">
        <div className="history-container">

          <h1>Histórico de Agendamentos</h1>

          <p>
            Consulte seus serviços realizados e futuros agendamentos.
          </p>

          <div className="history-list">
            {appointments.map((appointment) => (
              <div
                className="history-card"
                key={appointment.id}
              >
                <h3>{appointment.service}</h3>

                <p>
                  📅 {appointment.date}
                </p>

                <p>
                  ⏰ {appointment.time}
                </p>

                <span
                  className={`status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default History;