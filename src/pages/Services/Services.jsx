import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Services.css";

function Services() {
  return (
    <>
      <Navbar />

      <section className="services">
        <h1>Nossos Serviços</h1>

        <div className="services-grid">

          <div className="service-card">
            <h3>Corte Masculino</h3>
            <p>Corte moderno e personalizado.</p>
          </div>

          <div className="service-card">
            <h3>Barba</h3>
            <p>Acabamento profissional.</p>
          </div>

          <div className="service-card">
            <h3>Limpeza de Pele</h3>
            <p>Cuidados especiais para sua pele.</p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Services;