// src/pages/AdminSchedule/AdminSchedule.jsx

import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  getSchedule,
  saveSchedule,
} from "../../utils/availability";
import "./AdminSchedule.css";

function AdminSchedule() {
  const [schedule, setSchedule] = useState(() => getSchedule());
  const [editingDayId, setEditingDayId] = useState(null);
  const [draft, setDraft] = useState(null);
  const [error, setError] = useState("");
  const [savedDayId, setSavedDayId] = useState(null);

  const updateSchedule = (updatedSchedule) => {
    setSchedule(updatedSchedule);
    saveSchedule(updatedSchedule);
  };

  const startEditing = (day) => {
    setEditingDayId(day.id);
    setDraft({ ...day });
    setError("");
    setSavedDayId(null);
  };

  const cancelEditing = () => {
    setEditingDayId(null);
    setDraft(null);
    setError("");
  };

  const handleChange = (field, value) => {
    setDraft((current) => ({
      ...current,
      [field]: value,
    }));
    setError("");
  };

  const handleToggle = (day) => {
    const updatedSchedule = schedule.map((item) =>
      item.id === day.id
        ? { ...item, enabled: !item.enabled }
        : item
    );

    updateSchedule(updatedSchedule);
    setSavedDayId(day.id);
  };

  const handleSave = () => {
    if (!draft) return;

    if (draft.enabled) {
      if (!draft.opening || !draft.closing) {
        setError("Informe o horário de abertura e fechamento.");
        return;
      }

      if (draft.opening >= draft.closing) {
        setError("O fechamento deve ser depois da abertura.");
        return;
      }

      const hasBreakStart = Boolean(draft.breakStart);
      const hasBreakEnd = Boolean(draft.breakEnd);

      if (hasBreakStart !== hasBreakEnd) {
        setError("Preencha os dois horários do intervalo.");
        return;
      }

      if (
        hasBreakStart &&
        (
          draft.breakStart >= draft.breakEnd ||
          draft.breakStart < draft.opening ||
          draft.breakEnd > draft.closing
        )
      ) {
        setError("Confira os horários do intervalo.");
        return;
      }
    }

    const updatedSchedule = schedule.map((item) =>
      item.id === draft.id ? { ...draft } : item
    );

    updateSchedule(updatedSchedule);
    setSavedDayId(draft.id);
    setEditingDayId(null);
    setDraft(null);
    setError("");
  };

  return (
    <>
      <Navbar />

      <main className="admin-schedule-page">
        <div className="admin-schedule-container">
          <button
            type="button"
            className="schedule-back-button"
            onClick={() => window.history.back()}
          >
            ← Voltar
          </button>

          <header className="schedule-header">
            <h1>
              Horários de <span>Funcionamento</span>
            </h1>

            <p>
              Configure os horários de atendimento de cada dia.
            </p>
          </header>

          <section className="schedule-list">
            {schedule.map((day) => {
              const isEditing = editingDayId === day.id;

              return (
                <article className="schedule-card" key={day.id}>
                  <div className="schedule-card-header">
                    <div>
                      <h2>{day.day}</h2>

                      <span
                        className={
                          day.enabled
                            ? "schedule-status active"
                            : "schedule-status inactive"
                        }
                      >
                        {day.enabled ? "Atendimento ativo" : "Fechado"}
                      </span>
                    </div>

                    {!isEditing && (
                      <div className="schedule-card-actions">
                        <button
                          type="button"
                          className="schedule-edit-button"
                          onClick={() => startEditing(day)}
                        >
                          Editar
                        </button>

                        <button
                          type="button"
                          className={
                            day.enabled
                              ? "schedule-toggle-button close"
                              : "schedule-toggle-button open"
                          }
                          onClick={() => handleToggle(day)}
                        >
                          {day.enabled ? "Fechar dia" : "Abrir dia"}
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditing && draft ? (
                    <div className="schedule-edit-form">
                      <label className="schedule-checkbox">
                        <input
                          type="checkbox"
                          checked={draft.enabled}
                          onChange={(event) =>
                            handleChange("enabled", event.target.checked)
                          }
                        />
                        Dia com atendimento
                      </label>

                      {draft.enabled && (
                        <>
                          <div className="schedule-fields">
                            <label>
                              Abertura
                              <input
                                type="time"
                                value={draft.opening}
                                onChange={(event) =>
                                  handleChange("opening", event.target.value)
                                }
                              />
                            </label>

                            <label>
                              Fechamento
                              <input
                                type="time"
                                value={draft.closing}
                                onChange={(event) =>
                                  handleChange("closing", event.target.value)
                                }
                              />
                            </label>
                          </div>

                          <h3>Intervalo para almoço (opcional)</h3>

                          <div className="schedule-fields">
                            <label>
                              Início
                              <input
                                type="time"
                                value={draft.breakStart}
                                onChange={(event) =>
                                  handleChange("breakStart", event.target.value)
                                }
                              />
                            </label>

                            <label>
                              Fim
                              <input
                                type="time"
                                value={draft.breakEnd}
                                onChange={(event) =>
                                  handleChange("breakEnd", event.target.value)
                                }
                              />
                            </label>
                          </div>
                        </>
                      )}

                      {error && (
                        <p className="schedule-error">{error}</p>
                      )}

                      <div className="schedule-form-actions">
                        <button
                          type="button"
                          className="schedule-save-button"
                          onClick={handleSave}
                        >
                          Salvar
                        </button>

                        <button
                          type="button"
                          className="schedule-cancel-button"
                          onClick={cancelEditing}
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="schedule-details">
                      {day.enabled ? (
                        <>
                          <p>
                            <strong>Funcionamento:</strong>{" "}
                            {day.opening} às {day.closing}
                          </p>

                          {day.breakStart && day.breakEnd && (
                            <p>
                              <strong>Intervalo:</strong>{" "}
                              {day.breakStart} às {day.breakEnd}
                            </p>
                          )}
                        </>
                      ) : (
                        <p>Não serão oferecidos horários neste dia.</p>
                      )}

                      {savedDayId === day.id && (
                        <span className="schedule-saved-message">
                          Alterações salvas
                        </span>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          <div className="schedule-footer-actions">
            <button
              type="button"
              className="schedule-blocks-button"
              onClick={() => window.location.assign("/admin-blocks")}
            >
              Gerenciar bloqueios de datas
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default AdminSchedule;