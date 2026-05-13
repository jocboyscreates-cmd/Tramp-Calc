import {
  useState,
  useEffect,
  useRef,
} from "react";

import {
  trampolineSkills,
} from "../data/trampolineSkills";

import {
  House,
  Save,
} from "lucide-react";

import { Link }
from "react-router-dom";

export default function Trampoline() {

  const [skills, setSkills] =
    useState(Array(10).fill(""));

  const [activeInput, setActiveInput] =
    useState(null);

  const containerRef =
    useRef(null);

  const [showSaveModal, setShowSaveModal] =
    useState(false);

  const [routineName, setRoutineName] =
    useState("");

  useEffect(() => {

    function handleClickOutside(event) {

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
        "trampoline"
    ) {

      setSkills(
        savedRoutine.skills
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
    trampolineSkills.flatMap(
      (group) => group.items
    );

  function updateSkill(
    index,
    value
  ) {

    const updatedSkills =
      [...skills];

    updatedSkills[index] =
      value;

    setSkills(updatedSkills);
  }

  function getSkillDD(skillValue) {

  if (!skillValue)
    return 0;

  const parts =
    skillValue.split("|||");

  const name = parts[0];
  const code = parts[1];

  const foundSkill =
    allSkills.find(
      (skill) =>
        skill.code === code &&
        skill.name === name
    );

  return foundSkill
    ? foundSkill.dd
    : 0;
}

  const totalDD =
    skills.reduce(
      (total, skillCode) => {

        return (
          total +
          getSkillDD(skillCode)
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
        <House size={28} />
      </Link>

      <h1 style={styles.title}>
        Trampoline Calculator
      </h1>

      <div style={styles.totalCard}>

        <div style={styles.totalLabel}>
          Total DD
        </div>

        <div style={styles.totalDD}>
          {totalDD.toFixed(1)}
        </div>

      </div>

      <div style={styles.skillsWrapper}>

        {skills.map(
          (skill, index) => {

            const matchingSkills =
              allSkills
                .filter((item) => {

                  const search =
  skill
    .split("|||")[0]
    .toLowerCase();

                  return (

                    item.code
                      .toLowerCase()
                      .includes(search)

                    ||

                    item.name
                      .toLowerCase()
                      .includes(search)

                    ||

                    (
  [
    ...(item.aliases || []),

    item.code.replaceAll(
      "0",
      "-"
    )
  ].some(
    (alias) =>

      alias
        .toLowerCase()
        .includes(
          search
        )
  )
)

                  );

                })
                .slice(0, 8);

            return (

              <div
                key={index}

                style={
                  styles.skillContainer
                }
              >

                <div style={styles.row}>

                  <div
                    style={
                      styles.skillNumber
                    }
                  >
                    {index + 1}
                  </div>

                  <input
                    type="text"

                    placeholder={`Skill ${index + 1}`}

                    value={skill.split("|||")[1] || skill}

                    onChange={(e) =>
                      updateSkill(
                        index,
                        e.target.value
                      )
                    }

                    onFocus={() =>
                      setActiveInput(
                        index
                      )
                    }

                    onKeyDown={(e) => {

  if (e.key === "Enter") {

    const search =
      skill.toLowerCase();

    const exactMatch =
      allSkills.find(
        (item) => {

          const aliases = [

            ...(item.aliases || []),

            item.code.replaceAll(
              "0",
              "-"
            ),

            item.name,

            item.code,
          ];

          return aliases.some(
            (alias) =>

              alias
                .toLowerCase() ===
              search
          );
        }
      );

    if (exactMatch) {

      updateSkill(
        index,
        `${exactMatch.name}|||${exactMatch.code}`
      );

      setActiveInput(null);
    }
  }
}}

                    style={styles.input}
                  />

                  <select
                    value={skill}

                    onChange={(e) =>
                      updateSkill(
                        index,
                        e.target.value
                      )
                    }

                    style={styles.dropdown}
                  >

                    <option
  value=""
>
                      Select Skill
                    </option>

                    {trampolineSkills.map(
                      (group) => (

                        <optgroup
                          key={`${group.section}-${group.direction}`}

                          label={`${group.section} - ${group.direction}`}
                        >

                          {group.items.map(
                            (item) => (

                              <option
  key={`${item.code}-${item.name}`}

  style={styles.option}

  value={`${item.name}|||${item.code}`}
>

                                {item.name}
                                {" | "}
                                {item.code}
                                {" | "}
                                {item.dd}

                              </option>

                            )
                          )}

                        </optgroup>

                      )
                    )}

                  </select>

                  <div style={styles.ddBox}>

                    {getSkillDD(skill)
                      .toFixed(1)}

                  </div>

                </div>

                {activeInput ===
                  index &&

                  skill.length > 0 &&

                  matchingSkills.length > 0 && (

                  <div
                    style={
                      styles.suggestions
                    }
                  >

                    {matchingSkills.map(
                      (item) => (

                        <div
                          key={`${item.code}-${item.name}`}

                          style={
                            styles.suggestionItem
                          }

                          onMouseDown={(e) => {

                            e.preventDefault();

                            updateSkill(
  index,
  `${item.name}|||${item.code}`
);

                            setActiveInput(
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

                      )
                    )}

                  </div>

                )}

              </div>

            );

          }
        )}

      </div>

      <button
        onClick={() =>
          setShowSaveModal(true)
        }

        style={styles.saveButton}
      >

        <Save size={20} />

        Save Routine

      </button>

      {showSaveModal && (

        <div style={styles.modalOverlay}>

          <div style={styles.modal}>

            <h2 style={styles.modalTitle}>
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

              style={styles.modalInput}
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

                  if (!routineName)
                    return;

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
                      "trampoline",

                    skills,

                    totalDD,

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
      "40px 20px 80px",
  },

  homeButton: {
    position: "absolute",

    top: "30px",
    left: "30px",

    width: "54px",
    height: "54px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    textDecoration: "none",

    borderRadius: "16px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    color:
      "var(--text-primary)",

    backdropFilter:
      "blur(10px)",
  },

  title: {
    fontSize: "56px",

    fontWeight: "bold",

    textAlign: "center",

    marginBottom: "24px",
  },

  totalCard: {
    padding: "24px 40px",

    borderRadius: "28px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "8px",

    marginBottom: "40px",

    backdropFilter:
      "blur(12px)",
  },

  totalLabel: {
    fontSize: "18px",

    color:
      "var(--text-secondary)",
  },

  totalDD: {
    fontSize: "58px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  skillsWrapper: {
    width:
      "min(900px, 95vw)",

    display: "flex",

    flexDirection: "column",

    gap: "18px",
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

  skillNumber: {
    width: "52px",
    height: "52px",

    borderRadius: "16px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    fontSize: "20px",
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

    height: "52px",

    borderRadius: "16px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    fontSize: "22px",
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

  saveButton: {
    marginTop: "34px",

    padding: "18px 26px",

    borderRadius: "20px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontSize: "18px",

    fontWeight: "bold",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    cursor: "pointer",
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
    width:
      "min(450px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "30px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "22px",

    backdropFilter:
      "blur(14px)",
  },

  modalTitle: {
    fontSize: "34px",

    fontWeight: "bold",
  },

  modalInput: {
    padding: "16px",

    borderRadius: "18px",

    border:
      "1px solid var(--border)",

    background:
      "rgba(255,255,255,0.06)",

    color:
      "var(--text-primary)",

    fontSize: "18px",

    outline: "none",
  },

  modalButtons: {
    display: "flex",

    justifyContent:
      "flex-end",

    gap: "12px",
  },

  cancelButton: {
    padding: "14px 18px",

    borderRadius: "16px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    cursor: "pointer",
  },

  confirmButton: {
    padding: "14px 18px",

    borderRadius: "16px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

};