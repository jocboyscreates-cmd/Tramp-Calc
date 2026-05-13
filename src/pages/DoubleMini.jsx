import {
  useState,
  useEffect,
  useRef,
} from "react";

import { Link } from "react-router-dom";

import {
  House,
  Save,
} from "lucide-react";

import { doubleMiniSkills }
from "../data/doubleMiniSkills";

export default function DoubleMini() {

  const [routineCount, setRoutineCount] =
    useState(2);

  const [routines, setRoutines] =
    useState([
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ]);

  const [activeInput, setActiveInput] =
    useState(null);

  const [showSaveModal, setShowSaveModal] =
    useState(false);

  const [routineName, setRoutineName] =
    useState("");

  const containerRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(
      event
    ) {

      if (
        containerRef.current &&
        !containerRef.current.contains(
          event.target
        )
      ) {

        setActiveInput(null);
      }
    }

    const savedRoutine =
      JSON.parse(
        localStorage.getItem(
          "currentRoutine"
        )
      );

    if (
      savedRoutine &&
      savedRoutine.event ===
        "doubleMini"
    ) {

      setRoutines(
        savedRoutine.routines
      );

      localStorage.removeItem(
        "currentRoutine"
      );
    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);

  const allSkills =
    doubleMiniSkills.flatMap(
      (group) => group.items
    );

  function updateSkill(
    routineIndex,
    skillIndex,
    value
  ) {

    const updatedRoutines =
      [...routines];

    updatedRoutines[
      routineIndex
    ][skillIndex] = value;

    setRoutines(
      updatedRoutines
    );
  }

  function getSkillDD(code) {

    const foundSkill =
      allSkills.find(
        (skill) =>
          skill.code === code
      );

    return foundSkill
      ? foundSkill.dd
      : 0;
  }

  function getRoutineDD(routine) {

    return routine.reduce(
      (
        total,
        skillCode
      ) => {

        return (
          total +
          getSkillDD(skillCode)
        );

      },
      0
    );
  }

  const totalAllRoutines =
    routines
      .slice(0, routineCount)
      .reduce(
        (
          total,
          routine
        ) => {

          return (
            total +
            getRoutineDD(
              routine
            )
          );

        },
        0
      );

  return (

    <div
      ref={containerRef}
      style={styles.container}
    >

      <Link
        to="/"
        style={styles.homeButton}
      >
        <House size={30} />
      </Link>

      <h1 style={styles.title}>
        Double Mini Calculator
      </h1>

      <div style={styles.toggleContainer}>

        <button
          style={
            routineCount === 2
              ? styles.activeButton
              : styles.toggleButton
          }

          onClick={() =>
            setRoutineCount(2)
          }
        >
          2 Routines
        </button>

        <button
          style={
            routineCount === 4
              ? styles.activeButton
              : styles.toggleButton
          }

          onClick={() =>
            setRoutineCount(4)
          }
        >
          4 Routines
        </button>

      </div>

      {routines
        .slice(0, routineCount)
        .map(
          (
            routine,
            routineIndex
          ) => (

            <div
  key={routineIndex}

  style={{
    ...styles.routineBox,

    zIndex:

      activeInput &&
      activeInput.startsWith(
        `${routineIndex}-`
      )

        ? 9999

        : 1,
  }}
>

              <h2>
                Routine{" "}
                {routineIndex + 1}
              </h2>

              {routine.map(
                (
                  skill,
                  skillIndex
                ) => {

                  const matchingSkills =
                    allSkills
                      .filter(
                        (
                          item
                        ) => {

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
                              ) ||

                            (
                              item.aliases &&

                              item.aliases.some(
                                (
                                  alias
                                ) =>

                                  alias
                                    .toLowerCase()
                                    .includes(
                                      search
                                    )
                              )
                            )
                          );

                        }
                      )
                      .slice(0, 8);

                  return (

                    <div
                      key={
                        skillIndex
                      }

                      style={
                        styles.skillContainer
                      }
                    >

                      <div
                        style={
                          styles.row
                        }
                      >

                        <input
                          type="text"

                          placeholder={`Skill ${skillIndex + 1}`}

                          value={skill}

                          onChange={(e) =>
                            updateSkill(
                              routineIndex,
                              skillIndex,
                              e.target
                                .value
                            )
                          }

                          onFocus={() =>
                            setActiveInput(
                              `${routineIndex}-${skillIndex}`
                            )
                          }

                          style={
                            styles.input
                          }
                        />

                        <select
                          value={skill}

                          onChange={(e) =>
                            updateSkill(
                              routineIndex,
                              skillIndex,
                              e.target
                                .value
                            )
                          }

                          style={
                            styles.dropdown
                          }
                        >

                          <option
  value=""
  style={{ color: "black" }}
>
                            Select Skill
                          </option>

                          {doubleMiniSkills.map(
                            (
                              group
                            ) => (

                              <optgroup
                                key={`${group.section}-${group.direction}`}

                                label={
                                  group.section
                                }
                              >

                                {group.items.map(
                                  (
                                    item
                                  ) => (

                                    <option
  key={`${item.code}-${item.name}`}

                                      value={
                                        item.code
                                      }
                                    >

                                      {item.name} | {item.code} | {item.dd}

                                    </option>

                                  )
                                )}

                              </optgroup>

                            )
                          )}

                        </select>

                        <div
                          style={
                            styles.ddBox
                          }
                        >

                          {getSkillDD(
                            skill
                          ).toFixed(1)}

                        </div>

                      </div>

                      {activeInput ===
                        `${routineIndex}-${skillIndex}` &&

                        skill.length > 0 &&

                        matchingSkills.length > 0 && (

                        <div
                          style={
                            styles.suggestions
                          }
                        >

                          {matchingSkills.map(
                            (
                              item
                            ) => (

                              <div
                                key={`${item.code}-${item.name}`}

                                style={
                                  styles.suggestionItem
                                }

                                onMouseDown={(
                                  e
                                ) => {

                                  e.preventDefault();

                                  updateSkill(
                                    routineIndex,
                                    skillIndex,
                                    item.code
                                  );

                                  setActiveInput(
                                    null
                                  );
                                }}
                              >

                                {item.name} | {item.code} | {item.dd}

                              </div>

                            )
                          )}

                        </div>

                      )}

                    </div>

                  );
                }
              )}

              <h3
                style={
                  styles.ddText
                }
              >

                Routine DD:{" "}
                {getRoutineDD(
                  routine
                ).toFixed(1)}

              </h3>

            </div>

          )
        )}

      <h2 style={styles.totalText}>
        Total DD:{" "}
        {totalAllRoutines.toFixed(1)}
      </h2>

      <button
        onClick={() =>
          setShowSaveModal(true)
        }

        style={styles.saveButton}
      >

        <Save size={20} />

      </button>

      {showSaveModal && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <h2>
              Save Routine
            </h2>

            <input
              type="text"

              placeholder="Routine name"

              value={routineName}

              onChange={(e) =>
                setRoutineName(
                  e.target.value
                )
              }

              style={
                styles.modalInput
              }
            />

            <div
              style={
                styles.modalButtons
              }
            >

              <button
                onClick={() =>
                  setShowSaveModal(
                    false
                  )
                }

                style={
                  styles.cancelButton
                }
              >
                Cancel
              </button>

              <button
                onClick={() => {

                  if (
                    !routineName
                  ) return;

                  const existing =
                    JSON.parse(
                      localStorage.getItem(
                        "savedRoutines"
                      ) || "[]"
                    );

                  existing.push({
                    name:
                      routineName,

                    event:
                      "doubleMini",

                    routines,

                    totalDD:
                      totalAllRoutines,
                  });

                  localStorage.setItem(
                    "savedRoutines",

                    JSON.stringify(
                      existing
                    )
                  );

                  setRoutineName("");

                  setShowSaveModal(
                    false
                  );

                  alert(
                    "Routine saved!"
                  );

                }}

                style={
                  styles.confirmButton
                }
              >
                Save
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

    background:
      "var(--bg-primary)",

    color:
      "var(--text-primary)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    padding:
      "60px 20px",

    gap: "24px",
  },

  homeButton: {
    position: "absolute",

    top: "20px",
    left: "20px",

    width: "52px",
    height: "52px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    textDecoration: "none",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "14px",

    color:
      "var(--text-primary)",

    backdropFilter:
      "blur(10px)",

    boxShadow:
      "0 8px 20px rgba(0,0,0,0.15)",
  },

  title: {
    fontSize: "54px",

    fontWeight: "bold",

    textAlign: "center",
  },

  toggleContainer: {
    display: "flex",

    gap: "12px",
  },

  toggleButton: {
    padding:
      "14px 22px",

    fontSize: "18px",

    borderRadius: "14px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    cursor: "pointer",

    transition:
      "0.2s ease",
  },

  activeButton: {
    padding:
      "14px 22px",

    fontSize: "18px",

    borderRadius: "14px",

    border:
      "1px solid var(--accent)",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

  routineBox: {
  width:
    "min(900px, 95vw)",

  background:
    "var(--card-bg)",

  border:
    "1px solid var(--border)",

  borderRadius: "26px",

  padding: "28px",

  display: "flex",

  flexDirection: "column",

  gap: "16px",

  position: "relative",

  overflow: "visible",

  backdropFilter:
    "blur(10px)",
},

  skillContainer: {
  position: "relative",
},

  row: {
  display: "flex",

  alignItems: "center",

  gap: "14px",

  flexWrap: "wrap",

  padding: "18px",

  borderRadius: "24px",

  background:
    "var(--card-bg)",

  border:
    "1px solid var(--border)",

  backdropFilter:
    "blur(10px)",
},

  input: {
  width: "120px",

  padding: "14px",

  borderRadius: "16px",

  border:
    "1px solid var(--border)",

  background:
    "rgba(255,255,255,0.06)",

  color:
    "var(--text-primary)",

  fontSize: "18px",

  outline: "none",
},

  dropdown: {
  flex: 1,

  minWidth: "220px",

  padding: "12px",

  fontSize: "16px",

  borderRadius: "12px",

  border:
    "1px solid var(--border)",

  background:
    "var(--input-bg)",

  color:
    "var(--input-text)",

  cursor: "pointer",

  outline: "none",
},


  ddBox: {
    width: "70px",

    textAlign: "center",

    fontSize: "22px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  suggestions: {
  position: "absolute",

  top: "92px",

  left: 0,

  width: "100%",

  background:
    "var(--suggestion-bg)",

  border:
    "1px solid var(--border)",

  borderRadius: "22px",

  overflow: "hidden",

  zIndex: 9999,

  maxHeight: "320px",

  overflowY: "auto",

  backdropFilter:
    "none",

  boxShadow:
    "0 14px 40px rgba(0,0,0,0.18)",
},

  suggestionItem: {
    padding: "16px",

    cursor: "pointer",

    borderBottom:
      "1px solid var(--border)",

    transition:
      "0.15s ease",
  },

  modalOverlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.55)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 9999,
  },

  modal: {
    background:
  "var(--card-bg)",

    color:
      "var(--text-primary)",

    padding: "34px",

    borderRadius: "26px",

    width:
      "min(420px, 92vw)",

    display: "flex",

    flexDirection: "column",

    gap: "22px",

    border:
      "1px solid var(--border)",

    backdropFilter:
      "blur(12px)",
  },

  modalInput: {
    padding: "14px",

    fontSize: "18px",

    borderRadius: "12px",

    border:
      "1px solid var(--border)",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",
  },

  modalButtons: {
    display: "flex",

    justifyContent:
      "flex-end",

    gap: "12px",
  },

  cancelButton: {
    padding:
      "12px 18px",

    borderRadius: "12px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    cursor: "pointer",
  },

  confirmButton: {
    padding:
      "12px 18px",

    borderRadius: "12px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

};