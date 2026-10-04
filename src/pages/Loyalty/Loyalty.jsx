import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import "./Loyalty.css";

function Loyalty() {
  const completedServices = 7;
  const goal = 10;

  const progress =
    (completedServices / goal) * 100;

  return (
    <>
      <Navbar />

      <main className="loyalty-page">
        <div className="loyalty-card">

          <h1>Programa Fidelidade</h1>

          <p>
            Acumule serviços e ganhe recompensas.
          </p>

          <div className="loyalty-info">
            <h2>
              {completedServices}/{goal}
            </h2>

            <span>
              Serviços realizados
            </span>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="reward-text">
            Faltam {goal - completedServices} serviços
            para ganhar um corte grátis.
          </p>

          <div className="reward-box">
            🎁 Recompensa Atual

            <strong>
              1 Corte Masculino Grátis
            </strong>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}

export default Loyalty;