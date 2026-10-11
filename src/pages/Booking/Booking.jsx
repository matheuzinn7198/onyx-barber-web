import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Calendar from "react-calendar";
import {
  getAvailableTimes,
  getDaySchedule,
  getBlocks,
} from "../../utils/availability";
import "react-calendar/dist/Calendar.css";
import "./Booking.css";

function Booking() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [showAccountModal, setShowAccountModal] = useState(false);

  const services = [
    {
      id: 1,
      name: "Corte Masculino",
      duration: 45,
      price: 0,
    },
    {
      id: 2,
      name: "Barba",
      duration: 30,
      price: 0,
    },
    {
      id: 3,
      name: "Limpeza de Pele",
      duration: 60,
      price: 0,
    },
    {
      id: 4,
      name: "Hidratação",
      duration: 40,
      price: 0,
    },
    {
      id: 5,
      name: "Tintura",
      duration: 90,
      price: 0,
    },
    {
      id: 6,
      name: "Depilação Nariz/Ouvido",
      duration: 20,
      price: 0,
    },
  ];

  const toggleService = (service) => {
  const exists = selectedServices.find(
    (item) => item.id === service.id
  );

  if (exists) {
    setSelectedServices(
      selectedServices.filter(
        (item) => item.id !== service.id
      )
    );
  } else {
    setSelectedServices([
      ...selectedServices,
      service,
    ]);
  }

  setSelectedTime("");
};

  const totalDuration = selectedServices.reduce(
    (total, service) => total + service.duration,
    0
  );

  const totalPrice =
  selectedServices.reduce(
    (total, service) =>
      total + service.price,
    0
  );

  
const isDateUnavailable = (date) => {
  const dateString = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, "0"),
    String(date.getDate()).padStart(2, "0"),
  ].join("-");

  return getBlocks().some(
    (block) => block.date === dateString && block.allDay
  );
};

  // Consulta os horários usando a data e a duração selecionadas.
  const availableTimes =
  selectedServices.length > 0 && selectedDate
    ? getAvailableTimes(selectedDate, totalDuration)
    : [];

  const formatDate = (date) => {
    if (!date) return "";

    return date.toLocaleDateString("pt-BR");
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleContinueToConfirmation = () => {
    // Confere novamente se o horário continua disponível.
    const currentAvailableTimes = getAvailableTimes(
      selectedDate,
      totalDuration
    );

    if (!currentAvailableTimes.includes(selectedTime)) {
      setSelectedTime("");
      return;
    }

    setStep(4);
  };

  return (
    <>
      <Navbar />

      <section className="booking-page">
        <h1>Agendamento</h1>

        <div className="steps">
          <span className={step === 1 ? "step active" : "step"}>
            Serviço
          </span>

          <span className={step === 2 ? "step active" : "step"}>
            Data
          </span>

          <span className={step === 3 ? "step active" : "step"}>
            Horário
          </span>

          <span className={step === 4 ? "step active" : "step"}>
            Confirmar
          </span>
        </div>

        {/* ETAPA 1: SERVIÇOS */}
        {step === 1 && (
          <div className="booking-content">
            <h2>Escolha um ou mais serviços</h2>

            <div className="services-list">
              {services.map((service) => (
                <button
                  key={service.id}
                  type="button"
                  className={
                    selectedServices.some(
                      (item) => item.id === service.id
                    )
                      ? "service-btn selected"
                      : "service-btn"
                  }
                  onClick={() => toggleService(service)}
                >
                  <h3>{service.name}</h3>
                  <p>Duração: {service.duration} min</p>
                  <p>Preço: R$ {service.price.toFixed(2)}</p>
                </button>
              ))}
            </div>

            {selectedServices.length > 0 && (
              <div className="selected-services">
                <h3>Serviços Selecionados</h3>

                <p>Tempo Total: {totalDuration} min</p>
                <p>Valor Total: R$ {totalPrice.toFixed(2)}</p>

                <ul>
                  {selectedServices.map((service) => (
                    <li key={service.id}>
                      {service.name} - {service.duration} min
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              type="button"
              className="next-btn"
              disabled={selectedServices.length === 0}
              onClick={() => setStep(2)}
            >
              Próximo
            </button>
          </div>
        )}

        {/* ETAPA 2: DATA */}
        {step === 2 && (
          <div className="booking-content">
            <h2>Escolha uma Data</h2>

            <Calendar
  minDate={new Date()}
  value={selectedDate}
  onChange={handleDateChange}
  tileDisabled={({ date, view }) =>
    view === "month" && isDateUnavailable(date)
  }
  tileClassName={({ date, view }) =>
    view === "month" && isDateUnavailable(date)
      ? "booking-date-unavailable"
      : null
  }
/>

            <div className="actions">
              <button
                type="button"
                onClick={() => setStep(1)}
              >
                Voltar
              </button>

              <button
                type="button"
                disabled={!selectedDate}
                onClick={() => {
                  setSelectedTime("");
                  setStep(3);
                }}
              >
                Próximo
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3: HORÁRIOS DINÂMICOS */}
        
{step === 3 && (
  <div className="booking-content">
    <h2>Escolha um Horário</h2>

    {availableTimes.length > 0 ? (
      <div className="times-grid">
        {availableTimes.map((time) => (
          <button
            key={time}
            type="button"
            className={
              selectedTime === time
                ? "time-btn selected"
                : "time-btn"
            }
            onClick={() => setSelectedTime(time)}
          >
            {time}
          </button>
        ))}
      </div>
    ) : (
      <p className="no-times-message">
        Não há horários disponíveis para esta data
        e para a duração dos serviços selecionados.
        Escolha outra data.
      </p>
    )}

    <div className="actions">
      <button
        type="button"
        onClick={() => setStep(2)}
      >
        Voltar
      </button>

      <button
        type="button"
        disabled={
          !selectedTime ||
          !availableTimes.includes(selectedTime)
        }
        onClick={handleContinueToConfirmation}
      >
        Próximo
      </button>
    </div>
  </div>
)}


        {/* ETAPA 4: CONFIRMAÇÃO */}
        {step === 4 && (
          <div className="booking-content">
            <h2>Confirmar Agendamento</h2>

            <div className="confirmation-box">
              <h3>
                Serviços Selecionados ({selectedServices.length})
              </h3>

              <ul>
                {selectedServices.map((service) => (
                  <li key={service.id}>
                    {service.name} - {service.duration} min
                  </li>
                ))}
              </ul>

              <hr />

              <p>
                <strong>Data:</strong> {formatDate(selectedDate)}
              </p>

              <p>
                <strong>Horário:</strong> {selectedTime}
              </p>

              <p>
                <strong>Tempo Total:</strong> {totalDuration} min
              </p>

              <p>
                <strong>Valor Total:</strong>{" "}
                R$ {totalPrice.toFixed(2)}
              </p>
            </div>

            <div className="actions">
              <button
                type="button"
                onClick={() => setStep(3)}
              >
                Voltar
              </button>

              <button
                type="button"
                className="confirm-btn"
                onClick={() => {
                  const currentAvailableTimes = getAvailableTimes(
                    selectedDate,
                    totalDuration
                  );

                  if (!currentAvailableTimes.includes(selectedTime)) {
                    setSelectedTime("");
                    setStep(3);
                    return;
                  }

                  setShowAccountModal(true);
                }}
              >
                Confirmar Agendamento
              </button>
            </div>
          </div>
        )}

        {/* MODAL: CONTA OU CONVIDADO */}
        {showAccountModal && (
          <div className="modal-overlay">
            <div className="account-modal">
              <div className="modal-logo">💈</div>

              <h2>Seu horário está quase confirmado</h2>

              <p>
                Crie uma conta gratuitamente para acompanhar seus
                agendamentos, acumular benefícios e reagendar com
                mais facilidade.
              </p>

              <div className="modal-benefits">
                <span>✓ Programa Fidelidade</span>
                <span>✓ Histórico de Serviços</span>
                <span>✓ Promoções Exclusivas</span>
                <span>✓ Reagendamento Rápido</span>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="create-account-btn"
                  onClick={() => navigate("/cadastro")}
                >
                  Criar Conta e Finalizar
                </button>

                <button
                  type="button"
                  className="guest-modal-btn"
                  onClick={() => {
                    setShowAccountModal(false);
                    navigate("/booking-success");
                  }}
                >
                  Finalizar como Convidado
                </button>
              </div>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Booking;
