import { useState } from "react";

import { Link } from "react-router-dom";

import { House } from "lucide-react";

import GameInfo from "../components/GameInfo";

import {
  randomRoutineSkills
} from "../data/randomRoutineSkills";

export default function RandomRoutineGame() {

  const [difficulty, setDifficulty] =
  useState("easyDoubles");

  const [routine, setRoutine] =
    useState(
      Array(10).fill(null)
    );

  const [currentSkill, setCurrentSkill] =
    useState(null);

    const [showMenu, setShowMenu] =
  useState(false);

  const [gameStarted, setGameStarted] =
    useState(false);


const [skipsLeft, setSkipsLeft] =
  useState(3);

  const [skipsEnabled, setSkipsEnabled] =
  useState(true);



  function getRandomSkill() {

  const pool =
    randomRoutineSkills[difficulty];

  let randomSkill;

do {

  randomSkill =
    pool[
      Math.floor(
        Math.random() *
        pool.length
      )
    ];

} while (
  randomSkill.code ===
  currentSkill?.code
);

  const duplicateCount =
    routine.filter(
      skill =>
        skill?.code ===
        randomSkill.code
    ).length;

  if (duplicateCount >= 3) {

    getRandomSkill();

    return;
  }

  setCurrentSkill(
    randomSkill
  );
}

  function skipSkill() {

  if (skipsLeft <= 0)
    return;

  setSkipsLeft(
    skipsLeft - 1
  );

  getRandomSkill();
}

  function startGame() {

    setRoutine(
      Array(10).fill(null)
    );

    setSkipsLeft(
  skipsEnabled ? 3 : 0
);

    setGameStarted(true);

    getRandomSkill();
  }

  function placeSkill(index) {

    if (
      routine[index] ||
      !currentSkill
    ) return;

    const updatedRoutine =
      [...routine];

    updatedRoutine[index] =
      currentSkill;

    setRoutine(
      updatedRoutine
    );

    const filledSlots =
      updatedRoutine.filter(
        Boolean
      ).length;

    if (filledSlots < 10) {

      getRandomSkill();

    } else {

      setCurrentSkill(null);
    }
  }

  const totalDD =
    routine.reduce(
      (total, skill) => {

        return (
          total +
          (skill?.dd || 0)
        );

      },
      0
    );

  return (

    <div
      className="game-page-with-mobile-actions"
      style={styles.container}
    >

      <Link
        to="/games"
        className="desktop-game-nav"
        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <GameInfo title="Random Routine">
        Pick a difficulty and place each random skill into one of the 10 routine slots. Skips are optional, and the total DD updates as the routine fills.
      </GameInfo>

      <h1 style={styles.title}>
        Random Routine
      </h1>

    

      {!gameStarted && (

  <button
    onClick={() =>
      setShowMenu(true)
    }

    style={styles.playButton}
  >
    Play
  </button>

)}

{showMenu && (

  <div style={styles.modalOverlay}>

    <div style={styles.modal}>

      <h2 style={styles.modalTitle}>
        Start Game
      </h2>

      <div style={styles.modalSection}>

        <div style={styles.modalLabel}>
          Difficulty
        </div>

        <div style={styles.difficultyRow}>

          <button
            onClick={() =>
              setDifficulty(
                "noDoubles"
              )
            }

            style={
              difficulty ===
              "noDoubles"

                ? styles.activeButton

                : styles.button
            }
          >
            No Doubles
          </button>

          <button
            onClick={() =>
              setDifficulty(
                "easyDoubles"
              )
            }

            style={
              difficulty ===
              "easyDoubles"

                ? styles.activeButton

                : styles.button
            }
          >
            Easy Doubles
          </button>

          <button
            onClick={() =>
              setDifficulty(
                "hardDoubles"
              )
            }

            style={
              difficulty ===
              "hardDoubles"

                ? styles.activeButton

                : styles.button
            }
          >
            Hard Doubles
          </button>

          <button
            onClick={() =>
              setDifficulty(
                "any"
              )
            }

            style={
              difficulty ===
              "any"

                ? styles.activeButton

                : styles.button
            }
          >
            Any Skill
          </button>

        </div>

      </div>

      <div style={styles.modalSection}>

        <div style={styles.modalLabel}>
          Skips
        </div>

        <div style={styles.difficultyRow}>

          <button
            onClick={() =>
  setSkipsEnabled(true)
}

            style={
              skipsEnabled

                ? styles.activeButton

                : styles.button
            }
          >
            Enabled
          </button>



          <button
            onClick={() =>
  setSkipsEnabled(false)
}

            style={
              !skipsEnabled

                ? styles.activeButton

                : styles.button
            }
          >
            Disabled
          </button>

        </div>

      </div>

      <button
        onClick={() => {

          setShowMenu(false);

          startGame();
        }}

        style={styles.playButton}
      >
        Start Game
      </button>

    </div>

  </div>

)}

      {currentSkill && (

        <div style={styles.skillCard}>

          <div style={styles.skillName}>
            {currentSkill.name}
          </div>

          <div style={styles.skillCode}>
            {currentSkill.code}
          </div>

          <div style={styles.skillDD}>
            {currentSkill.dd.toFixed(1)}
          </div>

        </div>

      )}

      {gameStarted &&
  !currentSkill && (

    <button
      onClick={() => {

        setRoutine(
          Array(10).fill(null)
        );

        setCurrentSkill(null);

        startGame();
      }}

      style={styles.playButton}
    >
      Play Again
    </button>

)}

      {gameStarted &&
  currentSkill &&
  skipsLeft > 0 && (

    <button
      onClick={skipSkill}

      style={styles.playButton}
    >
      Skip ({skipsLeft})
    </button>

)}

{gameStarted && (

  <button
    onClick={() => {

      setRoutine(
        Array(10).fill(null)
      );

      setCurrentSkill(null);

      setGameStarted(false);

      setShowMenu(true);
    }}

    style={styles.button}
  >
    Reset Game
  </button>

)}

      <div style={styles.routineGrid}>

        {routine.map(
          (skill, index) => (

            <div
              key={index}

              onClick={() =>
                placeSkill(index)
              }

              style={styles.slot}
            >

              <div style={styles.slotNumber}>
                {index + 1}
              </div>

              {skill && (

                <>
                  <div style={styles.slotCode}>
                    {skill.code}
                  </div>

                  <div style={styles.slotDD}>
                    {skill.dd.toFixed(1)}
                  </div>
                </>

              )}

            </div>

          )
        )}

      </div>

      <div style={styles.totalDD}>
        Total DD:
        {" "}
        {totalDD.toFixed(1)}
      </div>

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

    padding: "40px 20px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "28px",
  },

  homeButton: {
    position: "absolute",

    top: "24px",
    left: "24px",

    width: "52px",
    height: "52px",

    borderRadius: "16px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    color:
      "var(--text-primary)",

    textDecoration: "none",
  },

  title: {
    fontSize: "58px",

    fontWeight: "bold",

    textAlign: "center",
  },

  difficultyRow: {
    display: "flex",

    flexWrap: "wrap",

    gap: "14px",

    justifyContent: "center",
  },

  button: {
    padding: "14px 22px",

    borderRadius: "16px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    cursor: "pointer",

    fontSize: "16px",
  },

  activeButton: {
    padding: "14px 22px",

    borderRadius: "16px",

    border:
      "1px solid var(--accent)",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    cursor: "pointer",

    fontSize: "16px",

    fontWeight: "bold",
  },

  playButton: {
    padding: "18px 40px",

    borderRadius: "20px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontSize: "22px",

    fontWeight: "bold",

    cursor: "pointer",
  },

  skillCard: {
    width: "min(500px, 92vw)",

    padding: "40px",

    borderRadius: "32px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "12px",

    backdropFilter:
      "blur(12px)",
  },

  skillName: {
    fontSize: "34px",

    fontWeight: "bold",

    textAlign: "center",
  },

  skillCode: {
    fontSize: "52px",

    color:
      "var(--accent)",

    fontWeight: "bold",
  },

  skillDD: {
    fontSize: "28px",

    color:
      "var(--text-secondary)",
  },

  routineGrid: {
    display: "grid",

    gridTemplateColumns:
  window.innerWidth < 700
    ? "1fr"
    : "repeat(5, 1fr)",

    gap: "16px",

    width:
      "min(900px, 100%)",
  },

  slot: {
    minHeight: "120px",

    borderRadius: "24px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    gap: "8px",

    backdropFilter:
      "blur(10px)",
  },

  slotNumber: {
    fontSize: "18px",

    color:
      "var(--text-secondary)",
  },

  slotCode: {
    fontSize: "26px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  slotDD: {
    fontSize: "18px",
  },

  totalDD: {
    fontSize: "30px",

    fontWeight: "bold",
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
  width: "min(700px, 92vw)",

  padding: "36px",

  borderRadius: "32px",

  background:
    "var(--card-bg)",

  border:
    "1px solid var(--border)",

  display: "flex",

  flexDirection: "column",

  gap: "28px",

  backdropFilter:
    "blur(14px)",
},

modalTitle: {
  fontSize: "42px",

  fontWeight: "bold",

  textAlign: "center",
},

modalSection: {
  display: "flex",

  flexDirection: "column",

  gap: "18px",
},

modalLabel: {
  fontSize: "24px",

  fontWeight: "bold",
},
};
