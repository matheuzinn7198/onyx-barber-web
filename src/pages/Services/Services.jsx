import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Services.css";

function Services() {
  const gallery = [
    {
      id: 1,
      title: "Corte Masculino",
      category: "Corte",
    },
    {
      id: 2,
      title: "Barba",
      category: "Barba",
    },
    {
      id: 3,
      title: "Limpeza de Pele",
      category: "Estética",
    },
    {
      id: 4,
      title: "Hidratação",
      category: "Tratamento",
    },
    {
      id: 5,
      title: "Tintura",
      category: "Coloração",
    },
    {
      id: 6,
      title: "Depilação Nariz/Ouvido",
      category: "Estética",
    },
  ];

  return (
    <>
      <Navbar />

      <section className="services-page">

        <div className="services-header">

          <h1>Nossos Trabalhos</h1>

          <p>
            Conheça alguns dos serviços e
            resultados realizados pela
            Onyx Barber.
          </p>

        </div>

        <div className="gallery-filters">

          <button>Todos</button>

          <button>Cortes</button>

          <button>Barba</button>

          <button>Estética</button>

          <button>Tratamentos</button>

        </div>

        <div className="gallery-grid">

          {gallery.map((item) => (

            <div
              key={item.id}
              className="gallery-card"
            >

              <div className="gallery-placeholder">

                <span>📷</span>

              </div>

              <div className="gallery-info">

                <h3>{item.title}</h3>

                <p>{item.category}</p>

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Services;