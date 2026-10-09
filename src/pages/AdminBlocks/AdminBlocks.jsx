// src/pages/AdminBlocks/AdminBlocks.jsx

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  dateKey,
  getBlocks,
  saveBlocks,
} from "../../utils/availability";
import "./AdminBlocks.css";

function AdminBlocks() {
  const [blocks, setBlocks] = useState(() => getBlocks());
  const [date, setDate] = useState(dateKey(new Date()));
  const [allDay, setAllDay] = useState(true);
  const [start, setStart] = useState("12:00");
  const [end, setEnd] = useState("13:00");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleAddBlock = (event) => {
    event.preventDefault();
    setError("");

    if (!date) {
      setError("Selecione uma data.");
      return;
    }

    if (!allDay && (!start || !end || start >= end)) {
      setError("Informe um período válido.");
      return;
    }

    const newBlock = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      date,
      allDay,
      start: allDay ? "" : start,
      end: allDay ? "" : end,
      reason: reason.trim() || "Indisponibilidade",
    };

    const updatedBlocks = [...blocks, newBlock].sort((a, b) => {
      return `${a.date}${a.start}`.localeCompare(`${b.date}${b.start}`);
    });

    setBlocks(updatedBlocks);
    saveBlocks(updatedBlocks);
    setReason("");
  };

  const handleRemoveBlock = (id) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);

    setBlocks(updatedBlocks);
    saveBlocks(updatedBlocks);
  };

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Navbar />

      <main className="admin-blocks-page">
        <div className="admin-blocks-container">
          <button
            type="button"
            className="blocks-back-button"
            onClick={() => window.history.back()}
          >
            ← Voltar
          </button>

          <header className="blocks-header">
            <h1>
              Bloqueios de <span>Agenda</span>
            </h1>

            <p>
              Bloqueie um dia inteiro ou um período específico.
            </p>
          </header>

          <form className="blocks-form" onSubmit={handleAddBlock}>
            <label>
              Data
              <input
                type="date"
                value={date}
                min={dateKey(new Date())}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </label>

            <label className="blocks-checkbox">
              <input
                type="checkbox"
                checked={allDay}
                onChange={(event) => setAllDay(event.target.checked)}
              />
              Bloquear o dia inteiro
            </label>

            {!allDay && (
              <div className="blocks-time-fields">
                <label>
                  Início
                  <input
                    type="time"
                    value={start}
                    onChange={(event) => setStart(event.target.value)}
                    required
                  />
                </label>

                <label>
                  Fim
                  <input
                    type="time"
                    value={end}
                    onChange={(event) => setEnd(event.target.value)}
                    required
                  />
                </label>
              </div>
            )}

            <label>
              Motivo
              <input
                type="text"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Ex.: compromisso, evento, manutenção..."
                maxLength={100}
              />
            </label>

            {error && <p className="blocks-error">{error}</p>}

            <button type="submit" className="blocks-add-button">
              Adicionar bloqueio
            </button>
          </form>

          <section className="blocks-list-section">
            <h2>Bloqueios cadastrados</h2>

            {blocks.length === 0 ? (
              <p className="blocks-empty">
                Nenhum bloqueio cadastrado.
              </p>
            ) : (
              <div className="blocks-list">
                {blocks.map((block) => (
                  <article className="blocks-card" key={block.id}>
                    <div>
                      <h3>{formatDate(block.date)}</h3>

                      <p>
                        {block.allDay
                          ? "Dia inteiro"
                          : `${block.start} às ${block.end}`}
                      </p>

                      <span>{block.reason}</span>
                    </div>

                    <button
                      type="button"
                      className="blocks-remove-button"
                      onClick={() => handleRemoveBlock(block.id)}
                    >
                      Remover
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminBlocks;