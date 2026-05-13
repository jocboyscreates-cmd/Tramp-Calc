import { useState } from "react";

import { Link } from "react-router-dom";

import {
  House,
  Share2,
  Trash2,
  Pencil,
} from "lucide-react";

import { trampolineSkills }
from "../data/trampolineSkills";

import { doubleMiniSkills }
from "../data/doubleMiniSkills";

import { tumblingSkills }
from "../data/tumblingSkills";

export default function SavedRoutines() {

  const [selectedRoutine, setSelectedRoutine] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  const [editingRoutine, setEditingRoutine] =
    useState(null);

  const [activeEditInput, setActiveEditInput] =
    useState(null);

  const savedRoutines = JSON.parse(
    localStorage.getItem(
      "savedRoutines"
    ) || "[]"
  );

  const trampoline =
    savedRoutines.filter(
      (routine) =>
        routine.event ===
        "trampoline"
    );

  const doubleMini =
    savedRoutines.filter(
      (routine) =>
        routine.event ===
        "doubleMini"
    );

  const tumbling =
    savedRoutines.filter(
      (routine) =>
        routine.event ===
        "tumbling"
    );

  const allSkills = [

    ...trampolineSkills.flatMap(
      (group) => group.items
    ),

    ...doubleMiniSkills.flatMap(
      (group) => group.items
    ),

    ...tumblingSkills.flatMap(
      (group) => group.items
    ),

  ];

  const liveDD =
    editingRoutine?.skills

      ? editingRoutine.skills.reduce(
          (total, skillCode) => {

            const foundSkill =
              allSkills.find(
                (item) =>
                  item.code ===
                  skillCode
              );

            return total + (
              foundSkill?.dd || 0
            );

          },
          0
        )

      : selectedRoutine?.totalDD || 0;

  function shareRoutine(routine) {

    const encoded =
      encodeURIComponent(
        JSON.stringify(routine)
      );

    const url =
      `${window.location.origin}/shared?r=${encoded}`;

    navigator.clipboard.writeText(
      url
    );

    alert(
      "Share link copied!"
    );
  }

  function deleteRoutine(index) {

    const updated = [
      ...savedRoutines,
    ];

    updated.splice(index, 1);

    localStorage.setItem(
      "savedRoutines",
      JSON.stringify(updated)
    );

    setSelectedRoutine(null);
  }

  function renderSection(
    title,
    routines
  ) {

    return (

      <div style={styles.section}>

        <h2 style={styles.sectionTitle}>
          {title}
        </h2>

        {routines.length === 0 && (

          <p style={styles.emptyText}>
            No saved routines yet.
          </p>

        )}

        {routines.map(
          (
            routine,
            index
          ) => (

            <div
              key={index}

              style={styles.card}

              onClick={() => {

                setSelectedRoutine(
                  routine
                );

                setEditName(
                  routine.name
                );

                setEditingRoutine(
                  JSON.parse(
                    JSON.stringify(
                      routine
                    )
                  )
                );

              }}
            >

              <div>

                <h3 style={styles.cardTitle}>
                  {routine.name}
                </h3>

                <p style={styles.cardDD}>
                  DD:
                  {" "}
                  {routine.totalDD.toFixed(1)}
                </p>

              </div>

              <div style={styles.buttonRow}>

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    shareRoutine(
                      routine
                    );

                  }}

                  style={styles.button}
                >

                  <Share2 size={18} />

                  Share

                </button>

                <button
                  onClick={(e) => {

                    e.stopPropagation();

                    deleteRoutine(
                      index
                    );

                  }}

                  style={
                    styles.deleteButton
                  }
                >

                  <Trash2 size={18} />

                  Delete

                </button>

              </div>

            </div>

          )
        )}

      </div>

    );
  }

  return (

    <div style={styles.container}>

      <Link
        to="/"

        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <h1 style={styles.title}>
        Saved Routines
      </h1>

      {renderSection(
        "Trampoline",
        trampoline
      )}

      {renderSection(
        "Double Mini",
        doubleMini
      )}

      {renderSection(
        "Tumbling",
        tumbling
      )}

      {selectedRoutine && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <div style={styles.modalTop}>

              <div>

                <h2 style={styles.modalTitle}>
                  {selectedRoutine.name}
                </h2>

                <p style={styles.modalSubtitle}>
                  {selectedRoutine.event}
                </p>

              </div>

              <div style={styles.liveDD}>
                DD
                {" "}
                {liveDD.toFixed(1)}
              </div>

            </div>

            <div style={styles.skillsList}>

              {editingRoutine?.skills &&
                editingRoutine.skills.map(
                  (
                    skill,
                    index
                  ) => (

                    <div
                      key={index}

                      style={styles.editRow}
                    >

                      <span>
                        {index + 1}.
                      </span>

                      <div
                        style={
                          styles.editInputContainer
                        }
                      >

                        <input
                          value={skill}

                          onFocus={() =>
                            setActiveEditInput(
                              index
                            )
                          }

                          onChange={(e) => {

                            const updated = {
                              ...editingRoutine,
                            };

                            updated.skills[index] =
                              e.target.value;

                            setEditingRoutine(
                              updated
                            );

                          }}

                          style={
                            styles.modalInput
                          }
                        />

                        {activeEditInput ===
                          index &&

                          skill.length > 0 && (

                          <div
                            style={
                              styles.suggestions
                            }
                          >

                            {allSkills
                              .filter(
                                (item) => {

                                  const search =
                                    skill.toLowerCase();

                                  return (
                                    item.code
                                      .toLowerCase()
                                      .includes(
                                        search
                                      ) ||

                                    item.name
                                      .toLowerCase()
                                      .includes(
                                        search
                                      )
                                  );
                                }
                              )
                              .slice(0, 6)
                              .map((item) => (

                                <div
                                  key={`${item.code}-${item.name}`}

                                  style={
                                    styles.suggestionItem
                                  }

                                  onMouseDown={() => {

                                    const updated = {
                                      ...editingRoutine,
                                    };

                                    updated.skills[index] =
                                      item.code;

                                    setEditingRoutine(
                                      updated
                                    );

                                    setActiveEditInput(
                                      null
                                    );

                                  }}
                                >

                                  {item.name}
                                  {" | "}
                                  {item.code}
                                  {" | "}
                                  {item.dd}

                                </div>

                              ))}

                          </div>

                        )}

                      </div>

                    </div>

                  )
                )}

            </div>

            <input
              type="text"

              value={editName}

              onChange={(e) =>
                setEditName(
                  e.target.value
                )
              }

              style={styles.modalInput}
            />

            <div style={styles.modalButtons}>

              <button
                onClick={() => {

                  localStorage.setItem(
                    "currentRoutine",
                    JSON.stringify(
                      selectedRoutine
                    )
                  );

                  if (
                    selectedRoutine.event ===
                    "trampoline"
                  ) {
                    window.location.href =
                      "/trampoline";
                  }

                  if (
                    selectedRoutine.event ===
                    "doubleMini"
                  ) {
                    window.location.href =
                      "/double-mini";
                  }

                  if (
                    selectedRoutine.event ===
                    "tumbling"
                  ) {
                    window.location.href =
                      "/tumbling";
                  }

                }}

                style={styles.button}
              >

                <Pencil size={18} />

                Open

              </button>

              <button
                onClick={() => {

                  const updated =
                    savedRoutines.map(
                      (routine) => {

                        if (
                          routine ===
                          selectedRoutine
                        ) {

                          return {
                            ...routine,
                            ...editingRoutine,

                            name:
                              editName,

                            totalDD:
                              liveDD,
                          };
                        }

                        return routine;
                      }
                    );

                  localStorage.setItem(
                    "savedRoutines",
                    JSON.stringify(
                      updated
                    )
                  );

                  setSelectedRoutine(
                    null
                  );

                }}

                style={styles.button}
              >

                Save Edit

              </button>

              <button
                onClick={() =>
                  setSelectedRoutine(
                    null
                  )
                }

                style={
                  styles.deleteButton
                }
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",

    padding: "40px 20px",

    display: "flex",

    flexDirection: "column",

    gap: "34px",

    background:
      "var(--bg-primary)",

    color:
      "var(--text-primary)",
  },

  homeButton: {
    width: "54px",
    height: "54px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    textDecoration: "none",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "16px",

    color:
      "var(--text-primary)",

    backdropFilter:
      "blur(10px)",
  },

  title: {
    fontSize: "56px",

    fontWeight: "bold",

    textAlign: "center",
  },

  section: {
    display: "flex",

    flexDirection: "column",

    gap: "16px",
  },

  sectionTitle: {
    fontSize: "34px",

    fontWeight: "bold",
  },

  emptyText: {
    color:
      "var(--text-secondary)",
  },

  card: {
    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "24px",

    padding: "24px",

    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    flexWrap: "wrap",

    gap: "16px",

    backdropFilter:
      "blur(10px)",

    cursor: "pointer",

    transition:
      "0.2s ease",
  },

  cardTitle: {
    fontSize: "24px",

    fontWeight: "bold",

    marginBottom: "6px",
  },

  cardDD: {
    color:
      "var(--accent)",

    fontWeight: "bold",
  },

  buttonRow: {
    display: "flex",

    gap: "12px",
  },

  button: {
    padding: "12px 18px",

    borderRadius: "14px",

    border: "none",

    display: "flex",

    alignItems: "center",

    gap: "8px",

    cursor: "pointer",

    fontWeight: "bold",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",
  },

  deleteButton: {
    padding: "12px 18px",

    borderRadius: "14px",

    border: "none",

    display: "flex",

    alignItems: "center",

    gap: "8px",

    cursor: "pointer",

    fontWeight: "bold",

    background:
      "rgba(239,68,68,0.18)",

    color: "#ef4444",
  },

  modalOverlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.6)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 9999,
  },

  modal: {
    width: "min(700px, 92vw)",

    maxHeight: "88vh",

    overflowY: "auto",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "30px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "24px",

    backdropFilter:
      "blur(14px)",
  },

  modalTop: {
    display: "flex",

    justifyContent:
      "space-between",

    alignItems: "center",

    gap: "20px",

    flexWrap: "wrap",
  },

  modalTitle: {
    fontSize: "36px",

    fontWeight: "bold",
  },

  modalSubtitle: {
    color:
      "var(--text-secondary)",
  },

  liveDD: {
    fontSize: "28px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  skillsList: {
    display: "flex",

    flexDirection: "column",

    gap: "10px",
  },

  editRow: {
    display: "flex",

    alignItems: "center",

    gap: "12px",
  },

  editInputContainer: {
    position: "relative",

    width: "100%",
  },

  modalInput: {
    width: "100%",

    padding: "14px",

    borderRadius: "16px",

    border:
      "1px solid var(--border)",

    background:
      "rgba(255,255,255,0.06)",

    color:
      "var(--text-primary)",

    fontSize: "16px",

    outline: "none",
  },

  suggestions: {
    position: "absolute",

    top: "56px",

    left: 0,

    width: "100%",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "16px",

    zIndex: 9999,

    maxHeight: "220px",

    overflowY: "auto",

    backdropFilter:
      "blur(12px)",
  },

  suggestionItem: {
    padding: "12px",

    cursor: "pointer",

    borderBottom:
      "1px solid var(--border)",
  },

  modalButtons: {
    display: "flex",

    gap: "12px",

    flexWrap: "wrap",
  },

};