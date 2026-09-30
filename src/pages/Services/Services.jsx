import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Services.css";

function Services() {
  const services = [
    {
      id: 1,
      name: "Corte Masculino",
      duration: "45 min",
    },
    {
      id: 2,
      name: "Barba",
      duration: "30 min",
    },
    {
      id: 3,
      name: "Limpeza de Pele",
      duration: "60 min",
    },
    {
      id: 4,
      name: "Hidratação",
      duration: "40 min",
    },
    {
      id: 5,
      name: "Tintura",
      duration: "90 min",
    },
    {
      id: 6,
      name: "Depilação Nariz/Ouvido",
      duration: "20 min",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="services-page">

        <div className="services-header">
          <h1>Nossos Serviços</h1>

          <p>
            Escolha o serviço ideal para você.
          </p>
        </div>

        <div className="services-grid">

          {services.map((service) => (
            <div
              key={service.id}
              className="service-card"
            >
              <h3>{service.name}</h3>

              <span>
                Duração: {service.duration}
              </span>

              <button>
                Agendar
              </button>
            </div>
          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Services; 