import { useState } from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";

import { trampolineSkills } from "../data/trampolineSkills";

import { doubleMiniSkills } from "../data/doubleMiniSkills";

import { tumblingSkills } from "../data/tumblingSkills";

export default function SavedRoutines() {

const [selectedRoutine, setSelectedRoutine] = useState(null);

const [editName, setEditName] = useState("");

const [editingRoutine, setEditingRoutine] = useState(null);

const [activeEditInput, setActiveEditInput] = useState(null);

  const savedRoutines = JSON.parse(
    localStorage.getItem("savedRoutines") || "[]"
  );

  const trampoline = savedRoutines.filter(
    (routine) => routine.event === "trampoline"
  );

  const doubleMini = savedRoutines.filter(
    (routine) => routine.event === "doubleMini"
  );

  const tumbling = savedRoutines.filter(
    (routine) => routine.event === "tumbling"
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

  function shareRoutine(routine) {

    const encoded = encodeURIComponent(
      JSON.stringify(routine)
    );

    const url =
      `${window.location.origin}/shared?r=${encoded}`;

    navigator.clipboard.writeText(url);

    alert("Share link copied!");
  }

  function deleteRoutine(index) {

    const updated = [...savedRoutines];

    updated.splice(index, 1);

    localStorage.setItem(
      "savedRoutines",
      JSON.stringify(updated)
    );

    setSelectedRoutine(null);
  }

  function renderSection(title, routines) {

    return (
      <div style={styles.section}>

        <h2>{title}</h2>

        {routines.length === 0 && (
          <p>No saved routines yet.</p>
        )}

        {routines.map((routine, index) => (

          <div
  key={index}
  style={styles.card}

  onClick={() => {

    setSelectedRoutine(routine);

setEditName(routine.name);

setEditingRoutine(
  JSON.parse(JSON.stringify(routine))
);

  }}
>

            <div>

              <h3>{routine.name}</h3>

              <p>
                DD: {routine.totalDD.toFixed(1)}
              </p>

            </div>

            <div style={styles.buttonRow}>

              <button
                onClick={() => shareRoutine(routine)}
                style={styles.button}
              >
                Share
              </button>

              <button
                onClick={() => deleteRoutine(index)}
                style={styles.deleteButton}
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>
    );
  }

  return (

    <div style={styles.container}>

      <Link to="/" style={styles.homeButton}>
        <House size={30} />
      </Link>

      <h1>Saved Routines</h1>

      {renderSection("Trampoline", trampoline)}

      {renderSection("Double Mini", doubleMini)}

      {renderSection("Tumbling", tumbling)}

{selectedRoutine && (

  <div style={styles.modalOverlay}>

    <div style={styles.modal}>

      <h2>{selectedRoutine.name}</h2>

      <p>
        Event: {selectedRoutine.event}
      </p>

      <p>
        Total DD:
        {" "}
        {selectedRoutine.totalDD.toFixed(1)}
      </p>

      <div style={styles.skillsList}>

        {editingRoutine?.skills &&
  editingRoutine.skills.map(
    (skill, index) => (

      <div
        key={index}
        style={styles.editRow}
      >

        <span>
          {index + 1}.
        </span>

        <div style={styles.editInputContainer}>

  <input
    value={skill}

    onFocus={() =>
      setActiveEditInput(index)
    }

    onChange={(e) => {

      const updated = {
        ...editingRoutine,
      };

      updated.skills[index] =
        e.target.value;

      setEditingRoutine(updated);

    }}

    style={styles.modalInput}
  />

  {activeEditInput === index &&

    skill.length > 0 && (

    <div style={styles.suggestions}>

      {allSkills
        .filter((item) => {

          const search =
            skill.toLowerCase();

          return (
            item.code
              .toLowerCase()
              .includes(search) ||

            item.name
              .toLowerCase()
              .includes(search)
          );
        })
        .slice(0, 6)
        .map((item) => (

          <div
            key={`${item.code}-${item.name}`}

            style={styles.suggestionItem}

            onMouseDown={() => {

              const updated = {
                ...editingRoutine,
              };

              updated.skills[index] =
                item.code;

              setEditingRoutine(updated);

              setActiveEditInput(null);

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

        {selectedRoutine.routines &&
          selectedRoutine.routines.map(
            (routine, routineIndex) => (

              <div key={routineIndex}>

                <strong>
                  Routine {routineIndex + 1}
                </strong>

                {routine.map((skill, index) => (

                  <div key={index}>
                    {index + 1}. {skill || "-"}
                  </div>

                ))}

              </div>

            )
          )}

        {selectedRoutine.passes &&
          Object.entries(
            selectedRoutine.passes
          ).map(([passName, passSkills]) => (

            <div key={passName}>

              <strong>{passName}</strong>

              {passSkills.map((skill, index) => (

                <div key={index}>
                  {index + 1}. {skill || "-"}
                </div>

              ))}

            </div>

          ))}

      </div>

      <input
        type="text"
        value={editName}
        onChange={(e) =>
          setEditName(e.target.value)
        }
        style={styles.modalInput}
      />

      <div style={styles.modalButtons}>

        <button
          onClick={() => {

            const updated =
              savedRoutines.map((routine) => {

                if (routine === selectedRoutine) {

                  return {
                    ...routine,
                    ...editingRoutine,

                    name: editName,
                  };
                }

                return routine;
              });

            localStorage.setItem(
              "savedRoutines",
              JSON.stringify(updated)
            );

            window.location.reload();

          }}
          style={styles.button}
        >
          Save Edit
        </button>

        <button
          onClick={() =>
            setSelectedRoutine(null)
          }
          style={styles.deleteButton}
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
    padding: "30px",

    display: "flex",
    flexDirection: "column",
    gap: "30px",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",
  },

  homeButton: {
    width: "52px",
    height: "52px",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    textDecoration: "none",

    backgroundColor: "white",
    borderRadius: "12px",

    color: "black",
  },

  section: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",

    borderRadius: "16px",

    padding: "20px",

    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    flexWrap: "wrap",

    gap: "10px",
  },

  buttonRow: {
    display: "flex",
    gap: "10px",
  },

  button: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },

  deleteButton: {
    padding: "10px 16px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",

    background: "#ef4444",
    color: "white",
  },

modalOverlay: {
  position: "fixed",
  inset: 0,

  background: "rgba(0,0,0,0.5)",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  zIndex: 9999,
},

modal: {
  background: "white",

  color: "black",

  padding: "30px",

  borderRadius: "20px",

  width: "min(500px, 92vw)",

  maxHeight: "80vh",

  overflowY: "auto",

  display: "flex",
  flexDirection: "column",

  gap: "20px",
},

skillsList: {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
},

modalButtons: {
  display: "flex",
  gap: "10px",
},

modalInput: {
  padding: "12px",

  fontSize: "16px",

  borderRadius: "10px",

  border: "1px solid #ccc",
},

editRow: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
},

editInputContainer: {
  position: "relative",
},

suggestions: {
  position: "absolute",

  top: "50px",
  left: 0,

  width: "100%",

  background: "white",

  border: "1px solid #ccc",

  borderRadius: "10px",

  zIndex: 9999,

  maxHeight: "220px",

  overflowY: "auto",

  boxShadow:
    "0 4px 10px rgba(0,0,0,0.15)",
},

suggestionItem: {
  padding: "10px",

  cursor: "pointer",

  borderBottom: "1px solid #eee",
},

};