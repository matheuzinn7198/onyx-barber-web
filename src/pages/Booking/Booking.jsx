import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Booking.css";

function Booking() {
  const [step, setStep] = useState(1);

  const [selectedServices, setSelectedServices] =
    useState([]);

  const [selectedDate, setSelectedDate] =
  useState("");

  const [selectedTime, setSelectedTime] =
  useState("");

  const [showAccountModal, setShowAccountModal] =
  useState(false);

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

  const availableTimes = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
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
};

const totalDuration =
  selectedServices.reduce(
    (total, service) =>
      total + service.duration,
    0
  );

const totalPrice =
  selectedServices.reduce(
    (total, service) =>
      total + service.price,
    0
  );

  console.log(selectedServices);

  const formatDate = (date) => {
  if (!date) return "";

  const [year, month, day] = date.split("-");

  return `${day}/${month}/${year}`;
};

  return (
    <>
      <Navbar />

      <section className="booking-page">

        <h1>Agendamento</h1>

        <div className="steps">

          <span
            className={
              step === 1
                ? "step active"
                : "step"
            }
          >
            Serviço
          </span>

          <span
            className={
              step === 2
                ? "step active"
                : "step"
            }
          >
            Data
          </span>

          <span
            className={
              step === 3
                ? "step active"
                : "step"
            }
          >
            Horário
          </span>

          <span
            className={
              step === 4
                ? "step active"
                : "step"
            }
          >
            Confirmar
          </span>

        </div>

        {step === 1 && (

          <div className="booking-content">

            <h2>
              Escolha um ou mais serviços
            </h2>

            <div className="services-list">

              {services.map((service) => (

                <button
  key={service.id}
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

                <h3>
                  Serviços Selecionados
                </h3>

                  <p>
  Tempo Total: {totalDuration} min
</p>

<p>
  Valor Total: R$ {totalPrice.toFixed(2)}
</p>

                <ul>

                  {selectedServices.map(
                    (service) => (

                      <li key={service.id}>
                        {service.name} - {service.duration} min                      </li>

                    )
                  )}

                </ul>

              </div>

            )}

            <button
              className="next-btn"
              disabled={
                selectedServices.length === 0
              }
              onClick={() =>
                setStep(2)
              }
            >
              Próximo
            </button>

          </div>

        )}

        {step === 2 && (

  <div className="booking-content">

    <h2>Escolha uma Data</h2>

    <input
      type="date"
      className="date-input"
      value={selectedDate}
      onChange={(e) =>
        setSelectedDate(e.target.value)
      }
    />

    <div className="actions">

      <button
        onClick={() => setStep(1)}
      >
        Voltar
      </button>

      <button
        disabled={!selectedDate}
        onClick={() => setStep(3)}
      >
        Próximo
      </button>

    </div>

  </div>

)}

  {step === 3 && (

  <div className="booking-content">

    <h2>Escolha um Horário</h2>

    <div className="times-grid">

      {availableTimes.map((time) => (

        <button
          key={time}
          className={
            selectedTime === time
              ? "time-btn selected"
              : "time-btn"
          }
          onClick={() =>
            setSelectedTime(time)
          }
        >
          {time}
        </button>

      ))}

    </div>

    <div className="actions">

      <button
        onClick={() =>
          setStep(2)
        }
      >
        Voltar
      </button>

      <button
        disabled={!selectedTime}
        onClick={() =>
          setStep(4)
        }
      >
        Próximo
      </button>

    </div>

  </div>

)}

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
            {service.name}
            {" - "}
            {service.duration} min
          </li>

        ))}

      </ul>

      <hr />

      <p>
        <strong>Data:</strong>
        {" "}
        {formatDate(selectedDate)}
      </p>

      <p>
        <strong>Horário:</strong>
        {" "}
        {selectedTime}
      </p>

      <p>
        <strong>Tempo Total:</strong>
        {" "}
        {totalDuration} min
      </p>

      <p>
        <strong>Valor Total:</strong>
        {" "}
        R$ {totalPrice.toFixed(2)}
      </p>

    </div>

    <div className="actions">

      <button
        onClick={() =>
          setStep(3)
        }
      >
        Voltar
      </button>

      <button
  className="confirm-btn"
  onClick={() => {
    console.log("Modal aberto");
    setShowAccountModal(true);
  }}
>
  Confirmar Agendamento
</button>

    </div>

  </div>

)}

  {showAccountModal && (

  <div className="modal-overlay">

    <div className="account-modal">

      <div className="modal-logo">
  💈
</div>

<h2>
  Seu horário está quase confirmado
</h2>

<p>
  Crie uma conta gratuitamente
  para acompanhar seus agendamentos,
  acumular benefícios e reagendar
  com mais facilidade.
</p>

      <div className="modal-benefits">

        <span>✓ Programa Fidelidade</span>
        <span>✓ Histórico de Serviços</span>
        <span>✓ Promoções Exclusivas</span>
        <span>✓ Reagendamento Rápido</span>

      </div>

      <div className="modal-actions">

  <button
    className="create-account-btn"
  >
    Criar Conta e Finalizar
  </button>

  <button
    className="guest-modal-btn"
    onClick={() =>
      setShowAccountModal(false)
    }
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