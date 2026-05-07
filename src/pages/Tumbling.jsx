import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { House } from "lucide-react";
import { Save } from "lucide-react";
import { tumblingSkills } from "../data/tumblingSkills";

export default function Tumbling() {

  const [mode, setMode] = useState("twoPass");

  const [passes, setPasses] = useState({
    pass1: Array(8).fill(""),
    pass2: Array(8).fill(""),
    pass3: Array(3).fill(""),
  });

  const [activeInput, setActiveInput] = useState(null);

  const [showSaveModal, setShowSaveModal] = useState(false);

const [routineName, setRoutineName] = useState("");

  const containerRef = useRef(null);

  useEffect(() => {

    function handleClickOutside(event) {

      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setActiveInput(null);
      }
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

  const allSkills = tumblingSkills.flatMap(
    (group) => group.items
  );

  function updateSkill(passName, skillIndex, value) {

    setPasses((prev) => {

      const updatedPass = [...prev[passName]];

      updatedPass[skillIndex] = value;

      return {
        ...prev,
        [passName]: updatedPass,
      };
    });
  }

  function getSkillDD(code) {

    const foundSkill = allSkills.find(
      (skill) => skill.code === code
    );

    return foundSkill ? foundSkill.dd : 0;
  }

  function getPassDD(passArray) {

    return passArray.reduce((total, skillCode) => {
      return total + getSkillDD(skillCode);
    }, 0);
  }

  const visiblePasses =
    mode === "twoPass"
      ? ["pass1", "pass2"]
      : ["pass1", "pass3"];

  const passLabels = {
    pass1: "First Pass",
    pass2: "Second Pass",
    pass3: "3 Skill Pass",
  };

  const totalDD = visiblePasses.reduce(
    (total, passName) => {
      return total + getPassDD(passes[passName]);
    },
    0
  );



  return (
    <div ref={containerRef} style={styles.container}>

      <Link to="/" style={styles.homeButton}>
        <House size={30} />
      </Link>

      <h1>Tumbling Calculator</h1>

      <div style={styles.toggleContainer}>

        <button
          style={
            mode === "twoPass"
              ? styles.activeButton
              : styles.toggleButton
          }
          onClick={() => setMode("twoPass")}
        >
          Two 8 Skill Passes
        </button>

        <button
          style={
            mode === "shortPass"
              ? styles.activeButton
              : styles.toggleButton
          }
          onClick={() => setMode("shortPass")}
        >
          8 Skill + 3 Skill
        </button>

      </div>

      {visiblePasses.map((passName) => {

        const passSkills = passes[passName];

        return (

          <div
            key={passName}
            style={styles.passBox}
          >

            <h2>
              {passLabels[passName]}
            </h2>

            {passSkills.map((skill, skillIndex) => {

              const matchingSkills = allSkills.filter((item) => {

                const search = skill.toLowerCase();

                return (
                  item.code.toLowerCase().includes(search) ||
                  item.name.toLowerCase().includes(search) ||

                  (item.aliases &&
                    item.aliases.some(alias =>
                      alias.toLowerCase().includes(search)
                    ))
                );

              }).slice(0, 8);

              return (
                <div
                  key={skillIndex}
                  style={styles.skillContainer}
                >

                  <div style={styles.row}>

                    <input
                      type="text"
                      placeholder={`Skill ${skillIndex + 1}`}
                      value={skill}
                      onChange={(e) =>
                        updateSkill(
                          passName,
                          skillIndex,
                          e.target.value
                        )
                      }
                      onFocus={() =>
                        setActiveInput(
                          `${passName}-${skillIndex}`
                        )
                      }
                      style={styles.input}
                    />

                    <select
                      value={skill}
                      onChange={(e) =>
                        updateSkill(
                          passName,
                          skillIndex,
                          e.target.value
                        )
                      }
                      style={styles.dropdown}
                    >

                      <option value="">
                        Select Skill
                      </option>

                      {tumblingSkills.map((group) => (
                        <optgroup
                          key={group.section}
                          label={group.section}
                        >

                          {group.items.map((item) => (
                            <option
                              key={`${item.code}-${item.name}`}
                              value={item.code}
                            >
                              {item.name} | {item.code} | {item.dd}
                            </option>
                          ))}

                        </optgroup>
                      ))}

                    </select>

                    <div style={styles.ddBox}>
                      {getSkillDD(skill).toFixed(1)}
                    </div>

                  </div>

                  {activeInput === `${passName}-${skillIndex}` &&
                    skill.length > 0 &&
                    matchingSkills.length > 0 && (

                    <div style={styles.suggestions}>

                      {matchingSkills.map((item) => (

                        <div
                          key={`${item.code}-${item.name}`}
                          style={styles.suggestionItem}
                          onMouseDown={(e) => {

                            e.preventDefault();

                            updateSkill(
                              passName,
                              skillIndex,
                              item.code
                            );

                            setActiveInput(null);
                          }}
                        >
                          {item.name} | {item.code} | {item.dd}
                        </div>

                      ))}

                    </div>

                  )}

                </div>
              );
            })}

            <h3>
              Pass DD: {getPassDD(passSkills).toFixed(1)}
            </h3>

          </div>
        );
      })}

      <h2>
        Total DD: {totalDD.toFixed(1)}
      </h2>

     <>
  <button
    onClick={() => setShowSaveModal(true)}
    style={styles.saveButton}
  >
    <Save size={20} />
  </button>

  {showSaveModal && (

    <div style={styles.modalOverlay}>

      <div style={styles.modal}>

        <h2>Save Routine</h2>

        <input
          type="text"
          placeholder="Routine name"
          value={routineName}
          onChange={(e) =>
            setRoutineName(e.target.value)
          }
          style={styles.modalInput}
        />

        <div style={styles.modalButtons}>

          <button
            onClick={() => setShowSaveModal(false)}
            style={styles.cancelButton}
          >
            Cancel
          </button>

          <button
            onClick={() => {

              if (!routineName) return;

              const existing = JSON.parse(
                localStorage.getItem("savedRoutines") || "[]"
              );

              existing.push({
                name: routineName,
                event: "tumbling",
                passes,
                totalDD,
              });

              localStorage.setItem(
                "savedRoutines",
                JSON.stringify(existing)
              );

              setRoutineName("");

              setShowSaveModal(false);

              alert("Routine saved!");

            }}
            style={styles.confirmButton}
          >
            Save
          </button>

        </div>

      </div>

    </div>

  )}
</>

    </div>
  );
}

const styles = {

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

    backgroundColor: "white",
    border: "2px solid black",
    borderRadius: "12px",

    color: "black",

    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",

    cursor: "pointer",
  },

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "60px",
    gap: "20px",
  },

  toggleContainer: {
    display: "flex",
    gap: "12px",
  },

  toggleButton: {
    padding: "12px 20px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "2px solid black",
    backgroundColor: "white",
    cursor: "pointer",
  },

  activeButton: {
    padding: "12px 20px",
    fontSize: "18px",
    borderRadius: "10px",
    border: "2px solid black",
    backgroundColor: "black",
    color: "white",
    cursor: "pointer",
  },

  passBox: {
    border: "2px solid #ddd",
    borderRadius: "16px",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  skillContainer: {
    position: "relative",
  },

  row: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  input: {
    width: "90px",
    padding: "10px",
    fontSize: "18px",
  },

  dropdown: {
    flex: 1,
    minWidth: "180px",
    padding: "10px",
    fontSize: "16px",
  },

  ddBox: {
    width: "60px",
    textAlign: "center",
    fontSize: "20px",
    fontWeight: "bold",
  },

  suggestions: {
    position: "absolute",
    top: "50px",
    left: "0",
    width: "400px",
    backgroundColor: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    zIndex: 1000,
    maxHeight: "220px",
    overflowY: "auto",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },

  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },

saveButton: {

  width: "50px",
  height: "50px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  borderRadius: "12px",

  border: "none",

  background: "#22c55e",

  color: "white",

  cursor: "pointer",

  marginTop: "10px",
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

  padding: "30px",

  borderRadius: "20px",

  width: "min(400px, 90vw)",

  display: "flex",
  flexDirection: "column",

  gap: "20px",
},

modalInput: {
  padding: "14px",

  fontSize: "18px",

  borderRadius: "10px",

  border: "1px solid #ccc",
},

modalButtons: {
  display: "flex",

  justifyContent: "flex-end",

  gap: "10px",
},

cancelButton: {
  padding: "12px 18px",

  borderRadius: "10px",

  border: "none",

  cursor: "pointer",
},

confirmButton: {
  padding: "12px 18px",

  borderRadius: "10px",

  border: "none",

  background: "#22c55e",

  color: "white",

  cursor: "pointer",
},

};