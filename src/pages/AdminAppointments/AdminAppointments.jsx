import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./AdminAppointments.css";

function AdminAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      client: "João Silva",
      service: "Corte Masculino",
      date: "06/10/2026",
      time: "14:00",
      price: 45,
      status: "Pendente",
    },
    {
      id: 2,
      client: "Pedro Santos",
      service: "Barba",
      date: "06/10/2026",
      time: "15:00",
      price: 30,
      status: "Confirmado",
    },
    {
      id: 3,
      client: "Carlos Lima",
      service: "Corte + Barba",
      date: "06/10/2026",
      time: "16:00",
      price: 70,
      status: "Concluído",
    },
    {
      id: 4,
      client: "Lucas Oliveira",
      service: "Limpeza de Pele",
      date: "07/10/2026",
      time: "10:00",
      price: 60,
      status: "Pendente",
    },
    {
      id: 5,
      client: "Gabriel Souza",
      service: "Hidratação",
      date: "07/10/2026",
      time: "11:00",
      price: 40,
      status: "Cancelado",
    },
  ]);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("Todos");

  // Agendamento selecionado para a ação
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Tipo de ação que será confirmada
  const [pendingAction, setPendingAction] = useState(null);

  /*
   * Abre o modal de confirmação
   */
  const openConfirmationModal = (appointment, action) => {
    setSelectedAppointment(appointment);
    setPendingAction(action);
  };

  /*
   * Fecha o modal
   */
  const closeConfirmationModal = () => {
    setSelectedAppointment(null);
    setPendingAction(null);
  };

  /*
   * Executa a alteração de status
   */
  const confirmAction = () => {
    if (!selectedAppointment || !pendingAction) {
      return;
    }

    let newStatus = selectedAppointment.status;

    if (pendingAction === "confirmar") {
      newStatus = "Confirmado";
    }

    if (pendingAction === "cancelar") {
      newStatus = "Cancelado";
    }

    if (pendingAction === "concluir") {
      newStatus = "Concluído";
    }

    if (pendingAction === "desfazer") {
      newStatus = "Pendente";
    }

    setAppointments((currentAppointments) =>
      currentAppointments.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? {
              ...appointment,
              status: newStatus,
            }
          : appointment
      )
    );

    closeConfirmationModal();
  };

  /*
   * Textos do modal de acordo com a ação
   */
  const getModalContent = () => {
    switch (pendingAction) {
      case "confirmar":
        return {
          icon: "✓",
          title: "Confirmar Agendamento",
          message:
            "Deseja realmente confirmar este agendamento?",
          button: "Confirmar Agendamento",
          buttonClass: "modal-confirm-button",
        };

      case "cancelar":
        return {
          icon: "!",
          title: "Cancelar Agendamento",
          message:
            "Deseja realmente cancelar este agendamento?",
          button: "Cancelar Agendamento",
          buttonClass: "modal-cancel-button",
        };

      case "concluir":
        return {
          icon: "✓",
          title: "Concluir Agendamento",
          message:
            "Deseja marcar este atendimento como concluído?",
          button: "Concluir Atendimento",
          buttonClass: "modal-complete-button",
        };

      case "desfazer":
        return {
          icon: "↩",
          title: "Desfazer Cancelamento",
          message:
            "Deseja realmente reativar este agendamento?",
          button: "Reativar Agendamento",
          buttonClass: "modal-undo-button",
        };

      default:
        return null;
    }
  };

  const modalContent = getModalContent();

  /*
   * Filtros
   */

  const normalizeText = (text) => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

  const filteredAppointments = appointments.filter(
  (appointment) => {
    const clientName = normalizeText(
      appointment.client
    );

    const searchName = normalizeText(search);

    const matchesSearch = clientName.includes(
      searchName
    );

    const matchesStatus =
      filterStatus === "Todos" ||
      appointment.status === filterStatus;

    return matchesSearch && matchesStatus;
  }
);

  return (
    <>
      <Navbar />

      <main className="admin-appointments-page">

        <div className="admin-appointments-container">

          {/* HEADER */}

          <div className="admin-appointments-header">

            <div>
              <h1>Gerenciamento de Agendamentos</h1>

              <p>
                Visualize e gerencie os agendamentos da Onyx Barber.
              </p>
            </div>

            <button
              className="back-dashboard-button"
              onClick={() => navigate("/dashboard")}
            >
              ← Dashboard
            </button>

          </div>

          {/* FILTROS */}

          <div className="appointments-filters">

            <div className="search-box">

              <input
                type="text"
                placeholder="Buscar cliente..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
              />

            </div>

            <div className="status-filter">

              <select
                value={filterStatus}
                onChange={(event) =>
                  setFilterStatus(event.target.value)
                }
              >
                <option value="Todos">
                  Todos os status
                </option>

                <option value="Pendente">
                  Pendente
                </option>

                <option value="Confirmado">
                  Confirmado
                </option>

                <option value="Concluído">
                  Concluído
                </option>

                <option value="Cancelado">
                  Cancelado
                </option>
              </select>

            </div>

          </div>

          {/* LISTA DE AGENDAMENTOS */}

          <div className="appointments-list">

            {filteredAppointments.length === 0 ? (

              <div className="empty-appointments">

                <h2>
                  Nenhum agendamento encontrado
                </h2>

                <p>
                  Tente alterar sua busca ou filtro.
                </p>

              </div>

            ) : (

              filteredAppointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className="admin-appointment-card"
                >

                  {/* DATA / CLIENTE */}

                  <div className="appointment-main-info">

                    <div className="appointment-date">

                      <strong>
                        {appointment.date}
                      </strong>

                      <span>
                        {appointment.time}
                      </span>

                    </div>

                    <div className="appointment-client">

                      <h3>
                        {appointment.client}
                      </h3>

                      <p>
                        {appointment.service}
                      </p>

                    </div>

                  </div>

                  {/* PREÇO */}

                  <div className="appointment-price">

                    <strong>
                      R$ {appointment.price.toFixed(2)}
                    </strong>

                  </div>

                  {/* STATUS */}

                  <div className="appointment-status">

                    <span
                      className={`admin-status ${appointment.status
                        .toLowerCase()
                        .replace("í", "i")}`}
                    >
                      {appointment.status}
                    </span>

                  </div>

                  {/* AÇÕES */}

                  <div className="appointment-actions">

                    {appointment.status === "Pendente" && (

                      <button
                        className="confirm-button"
                        onClick={() =>
                          openConfirmationModal(
                            appointment,
                            "confirmar"
                          )
                        }
                      >
                        Confirmar
                      </button>

                    )}

                    {appointment.status === "Confirmado" && (

                      <button
                        className="complete-button"
                        onClick={() =>
                          openConfirmationModal(
                            appointment,
                            "concluir"
                          )
                        }
                      >
                        Concluir
                      </button>

                    )}

                    {(appointment.status === "Pendente" ||
                      appointment.status === "Confirmado") && (

                      <button
                        className="cancel-button"
                        onClick={() =>
                          openConfirmationModal(
                            appointment,
                            "cancelar"
                          )
                        }
                      >
                        Cancelar
                      </button>

                    )}

                    {appointment.status === "Cancelado" && (

                      <button
                        className="undo-button"
                        onClick={() =>
                          openConfirmationModal(
                            appointment,
                            "desfazer"
                          )
                        }
                      >
                        ↩ Desfazer
                      </button>

                    )}

                  </div>

                </div>

              ))

            )}

          </div>

        </div>

      </main>

      <Footer />

      {/* MODAL DE CONFIRMAÇÃO */}

      {selectedAppointment && modalContent && (

        <div
          className="confirmation-overlay"
          onClick={closeConfirmationModal}
        >

          <div
            className="confirmation-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="confirmation-icon">
              {modalContent.icon}
            </div>

            <h2>
              {modalContent.title}
            </h2>

            <p className="confirmation-message">
              {modalContent.message}
            </p>

            {/* DADOS DO AGENDAMENTO */}

            <div className="confirmation-appointment">

              <div>
                <span>Cliente</span>
                <strong>
                  {selectedAppointment.client}
                </strong>
              </div>

              <div>
                <span>Serviço</span>
                <strong>
                  {selectedAppointment.service}
                </strong>
              </div>

              <div>
                <span>Data</span>
                <strong>
                  {selectedAppointment.date}
                </strong>
              </div>

              <div>
                <span>Horário</span>
                <strong>
                  {selectedAppointment.time}
                </strong>
              </div>

            </div>

            {/* BOTÕES */}

            <div className="confirmation-actions">

              <button
                className="modal-back-button"
                onClick={closeConfirmationModal}
              >
                Voltar
              </button>

              <button
                className={modalContent.buttonClass}
                onClick={confirmAction}
              >
                {modalContent.button}
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default AdminAppointments;