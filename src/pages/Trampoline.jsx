import { useState, useEffect, useRef } from "react";
import { trampolineSkills } from "../data/trampolineSkills";
import { House } from "lucide-react";
import { Link } from "react-router-dom";   

export default function Trampoline() {

  const [skills, setSkills] = useState(Array(10).fill(""));
  const [activeInput, setActiveInput] = useState(null);
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

  const allSkills = trampolineSkills.flatMap(
    (group) => group.items
  );

  function updateSkill(index, value) {
    const updatedSkills = [...skills];
    updatedSkills[index] = value;

    setSkills(updatedSkills);
  }

  function getSkillDD(code) {

    const foundSkill = allSkills.find(
      (skill) => skill.code === code
    );

    return foundSkill ? foundSkill.dd : 0;
  }

  function getSkillName(code) {

    const foundSkill = allSkills.find(
      (skill) => skill.code === code
    );

    return foundSkill ? foundSkill.name : "";
  }

  const totalDD = skills.reduce((total, skillCode) => {
    return total + getSkillDD(skillCode);
  }, 0);

  return (
  <div ref={containerRef} style={styles.container}>

    <Link to="/" style={styles.homeButton}>
      <House size={30} />
    </Link>

    <h1>Trampoline Calculator</h1>

    {skills.map((skill, index) => {

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
          <div key={index} style={styles.skillContainer}>

            <div style={styles.row}>

              <input
                type="text"
                placeholder={`Skill ${index + 1}`}
                value={skill}
                onChange={(e) =>
                    updateSkill(index, e.target.value)
                }
                onFocus={() => setActiveInput(index)}
                
                style={styles.input}
              />

              <select
                value={skill}
                onChange={(e) =>
                  updateSkill(index, e.target.value)
                }
                style={styles.dropdown}
              >

                <option value="">Select Skill</option>

                {trampolineSkills.map((group) => (
                  <optgroup
                    key={`${group.section}-${group.direction}`}
                    label={`${group.section} - ${group.direction}`}
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

            {activeInput === index &&
              skill.length > 0 &&
              matchingSkills.length > 0 && (

              <div style={styles.suggestions}>

                {matchingSkills.map((item) => (

                  <div
                    key={`${item.code}-${item.name}`}
                    style={styles.suggestionItem}
                    onMouseDown={(e) => {
                        e.preventDefault();
                        updateSkill(index, item.code);
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

      <h2>Total DD: {totalDD.toFixed(1)}</h2>
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
    gap: "14px",
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
};