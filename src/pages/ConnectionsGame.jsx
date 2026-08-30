import { useState } from "react";

import { Link } from "react-router-dom";

import { House } from "lucide-react";

import Confetti from "react-confetti";

import GameInfo from "../components/GameInfo";

const defaultSkillOptions = [
  "Tuck Jump",
  "Straddle Jump",
  "Pike Jump",
  "Half Turn",
  "Full Turn",
  "Tuck Half Turn",
  "1 1/2 Turn",
  "Pike Half Turn",
  "Tuck Full Turn",
  "Barani Tuck",
  "Barani Pike",
  "Barani Straight",
  "Front Tuck",
  "Front Pike",
  "Front Straight",
  "Back Tuck",
  "Back Pike",
  "Back Straight",
  "Back Full",
  "Rudy",
  "Back Half",
  "Double Full Twist",
  "Half Out Tuck",
  "Half Out Pike",
];

const harderSkillOptions = [
  "Front Full",
  "Randy",
  "Double Back Tuck",
  "Double Full",
  "Rudy Out",
  "Full Out Tuck",
  "Full Out Straight",
  "Rudy Out Tuck",
  "Rudy Out Pike",
  "Half In Tuck",
  "Adolph",
  "Full In Tuck",
  "Triff",
];

const defaultSelectedSkills = defaultSkillOptions;

const skillGroups = [
  {
    title: "Skill Race skills",
    skills: defaultSkillOptions,
  },
  {
    title: "Harder skills",
    note: "Off by default",
    skills: harderSkillOptions,
  },
];

const pickRandomSkill = (skills) =>
  skills[
    Math.floor(
      Math.random() *
      skills.length
    )
  ];

export default function ConnectionsGame() {

  const ROWS = 6;
  const COLS = 7;

  const createBoard = () =>
    Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS).fill(null)
      );

  const [board, setBoard] =
    useState(createBoard());

  const [currentPlayer, setCurrentPlayer] =
    useState("red");

    const [droppingPiece, setDroppingPiece] =
  useState(null);

const [poofPiece, setPoofPiece] =
  useState(null);

  const [selectedColumn, setSelectedColumn] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

  const [currentSkill, setCurrentSkill] =
    useState("");

  const [pendingRow, setPendingRow] =
    useState(null);

    const [gameOver, setGameOver] =
  useState(false);

    const [gameStarted, setGameStarted] =
  useState(false);

const [showHowTo, setShowHowTo] =
  useState(false);

const [selectedSkills, setSelectedSkills] =
  useState(defaultSelectedSkills);

  const [winner, setWinner] =
    useState(null);

const selectedSkillCount =
  selectedSkills.length;

const toggleSkill = (skill) => {

  setSelectedSkills((currentSkills) => {

    if (
      currentSkills.includes(skill)
    ) {

      return currentSkills.filter(
        (currentSkill) =>
          currentSkill !== skill
      );
    }

    return [
      ...currentSkills,
      skill,
    ];
  });
};

const resetSkillSelection = () => {

  setSelectedSkills(
    defaultSelectedSkills
  );
};

const selectAllSkills = () => {

  setSelectedSkills([
    ...defaultSkillOptions,
    ...harderSkillOptions,
  ]);
};

  const getRandomSkill = () => {

  if (selectedSkills.length === 0) {

    return "";
  }

  return pickRandomSkill(
    selectedSkills
  );
};

  const checkWinner = (
    boardToCheck,
    player
  ) => {

    for (
      let row = 0;
      row < ROWS;
      row++
    ) {

      for (
        let col = 0;
        col < COLS - 3;
        col++
      ) {

        if (

          boardToCheck[row][col] ===
            player &&

          boardToCheck[row][col + 1] ===
            player &&

          boardToCheck[row][col + 2] ===
            player &&

          boardToCheck[row][col + 3] ===
            player

        ) {

          return true;
        }
      }
    }

    for (
      let row = 0;
      row < ROWS - 3;
      row++
    ) {

      for (
        let col = 0;
        col < COLS;
        col++
      ) {

        if (

          boardToCheck[row][col] ===
            player &&

          boardToCheck[row + 1][col] ===
            player &&

          boardToCheck[row + 2][col] ===
            player &&

          boardToCheck[row + 3][col] ===
            player

        ) {

          return true;
        }
      }
    }

    // DIAGONAL ↘

for (
  let row = 0;
  row < ROWS - 3;
  row++
) {

  for (
    let col = 0;
    col < COLS - 3;
    col++
  ) {

    if (

      boardToCheck[row][col] ===
        player &&

      boardToCheck[row + 1][col + 1] ===
        player &&

      boardToCheck[row + 2][col + 2] ===
        player &&

      boardToCheck[row + 3][col + 3] ===
        player

    ) {

      return true;
    }
  }
}

// DIAGONAL ↗

for (
  let row = 3;
  row < ROWS;
  row++
) {

  for (
    let col = 0;
    col < COLS - 3;
    col++
  ) {

    if (

      boardToCheck[row][col] ===
        player &&

      boardToCheck[row - 1][col + 1] ===
        player &&

      boardToCheck[row - 2][col + 2] ===
        player &&

      boardToCheck[row - 3][col + 3] ===
        player

    ) {

      return true;
    }
  }
}

    return false;
  };

  const startMove = (col) => {

    if (winner) return;

    for (
      let row = ROWS - 1;
      row >= 0;
      row--
    ) {

      if (!board[row][col]) {

        setSelectedColumn(col);

        setPendingRow(row);

        setCurrentSkill(
          getRandomSkill()
        );

        setShowPopup(true);

        return;
      }
    }
  };

  const stickSkill = () => {

    const newBoard = [...board];

    setDroppingPiece({

  row: pendingRow,

  col: selectedColumn,

  player: currentPlayer,

});

    newBoard[pendingRow][selectedColumn] =
      currentPlayer;

    setTimeout(() => {

  setBoard(newBoard);

  setDroppingPiece(null);

}, 350);

    if (
      checkWinner(
        newBoard,
        currentPlayer
      )
    ) {

      setWinner(currentPlayer);

setGameOver(true);

    } else {

      setCurrentPlayer(
        currentPlayer === "red"
          ? "yellow"
          : "red"
      );
    }

    setShowPopup(false);
  };

  const failSkill = () => {

    setPoofPiece({

  row: pendingRow,

  col: selectedColumn,

  player: currentPlayer,

});

    setShowPopup(false);

    setTimeout(() => {

  setPoofPiece(null);

}, 500);

    setCurrentPlayer(
      currentPlayer === "red"
        ? "yellow"
        : "red"
    );
  };

  const resetGame = () => {

    setBoard(createBoard());

    setWinner(null);

    setCurrentPlayer("red");
    setGameOver(false);
  };

  if (!gameStarted) {

  return (

    <div
      className="game-page-with-mobile-actions"
      style={styles.page}
    >

        

      <Link
        to="/games"
        className="desktop-game-nav"
        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <GameInfo title="Connect 4">
        Pick which skills are in play, then take turns choosing columns. A random skill appears each move. If it is landed, the piece stays; if it is missed, the turn passes.
      </GameInfo>

      <h1 style={styles.title}>
        Connections
      </h1>

      <p style={styles.subtitle}>
        Land skills to claim spaces
      </p>

      <div style={styles.menuCard}>

        <div style={styles.skillHeader}>

          <div>

            <div style={styles.sectionTitle}>
              Skills
            </div>

            <div style={styles.skillCount}>
              {selectedSkillCount} selected
            </div>

          </div>

          <div style={styles.skillActions}>

            <button
              onClick={resetSkillSelection}
              style={styles.skillActionButton}
            >
              Defaults
            </button>

            <button
              onClick={selectAllSkills}
              style={styles.skillActionButton}
            >
              All
            </button>

          </div>

        </div>

        <div style={styles.skillGroups}>

          {skillGroups.map((group) => (

            <div
              key={group.title}
              style={styles.skillGroup}
            >

              <div style={styles.skillGroupHeader}>

                <span>
                  {group.title}
                </span>

                {group.note && (

                  <span style={styles.skillGroupNote}>
                    {group.note}
                  </span>

                )}

              </div>

              <div style={styles.skillGrid}>

                {group.skills.map((skill) => {

                  const isSelected =
                    selectedSkills.includes(skill);

                  return (

                    <label
                      key={skill}
                      style={{
                        ...styles.skillOption,

                        background: isSelected
                          ? "var(--accent-glow)"
                          : "rgba(255,255,255,0.08)",

                        borderColor: isSelected
                          ? "var(--accent)"
                          : "var(--border)",
                      }}
                    >

                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() =>
                          toggleSkill(skill)
                        }
                        style={styles.skillCheckbox}
                      />

                      <span>
                        {skill}
                      </span>

                    </label>
                  );
                })}

              </div>

            </div>

          ))}

        </div>

        <button
          onClick={() =>
            setGameStarted(true)
          }
          disabled={
            selectedSkillCount === 0
          }

          style={{
            ...styles.playButton,

            opacity:
              selectedSkillCount === 0
                ? 0.45
                : 1,

            cursor:
              selectedSkillCount === 0
                ? "not-allowed"
                : "pointer",
          }}
        >
          Play
        </button>

        <button
          onClick={() =>
            setShowHowTo(
              !showHowTo
            )
          }

          style={styles.howButton}
        >
          How To Play
        </button>

        {showHowTo && (

          <div style={styles.howText}>

            Players take turns
            selecting a column.

            A random skill appears.

            If the skill is landed,
            the piece stays.

            First to connect 4 wins.

          </div>

        )}

      </div>

    </div>

  );
}

return (

    <div
  className="game-page-with-mobile-actions"
  style={{
    ...styles.page,

    background: `
      radial-gradient(
        circle at top,

        ${
          currentPlayer === "red"

            ? "rgba(239,68,68,0.18)"

            : "rgba(250,204,21,0.18)"
        },

        transparent 55%
      ),

      var(--bg-primary)
    `,
  }}
>

        {gameOver && (

  <Confetti

  recycle={false}

  numberOfPieces={250}

  style={{
    position: "fixed",

    top: 0,
    left: 0,

    width: "100vw",
    height: "100vh",

    zIndex: 99999999,

    pointerEvents: "none",
  }}

  colors={
    winner === "red"

      ? [
          "#ef4444",
          "#ff7b7b",
          "#ffb3b3",
        ]

      : [
          "#facc15",
          "#fde047",
          "#fff08a",
        ]
  }
/>

)}

        <Link
  to="/games"

  className="desktop-game-nav"

  style={styles.homeButton}
>
  <House size={28} />
</Link>

      <GameInfo title="Connect 4">
        Pick a column, attempt the skill, and choose Stuck It or Missed. The first player to connect four pieces wins.
      </GameInfo>

      <h1 style={styles.title}>
        Connections
      </h1>

    

      {/* TOP CIRCLES */}

      <div style={styles.topRow}>

        {Array(COLS)
          .fill(null)
          .map((_, col) => (

            <button
              key={col}

              onClick={() =>
                startMove(col)
              }

              style={{
                ...styles.topButton,

                border:
                  currentPlayer ===
                  "red"

                    ? "3px solid #ef4444"

                    : "3px solid #facc15",
              }}
            />

          ))}

      </div>

      {/* BOARD */}

      <div style={styles.board}>

        {board.map((row, rowIndex) =>

          row.map(
            (cell, colIndex) => (

              <div
                key={`${rowIndex}-${colIndex}`}

                style={styles.cell}
              >

                <div
  style={{

    ...styles.piece,

    background:

      droppingPiece &&
      droppingPiece.row === rowIndex &&
      droppingPiece.col === colIndex

        ? droppingPiece.player === "red"
          ? "#ef4444"
          : "#facc15"

      : poofPiece &&
        poofPiece.row === rowIndex &&
        poofPiece.col === colIndex

        ? poofPiece.player === "red"
          ? "#ef4444"
          : "#facc15"

      : cell === "red"

        ? "#ef4444"

      : cell === "yellow"

        ? "#facc15"

      : document.documentElement.classList.contains("dark")

  ? "rgba(255,255,255,0.08)"

  : "rgba(15,23,42,0.12)",

    animation:

      droppingPiece &&
      droppingPiece.row === rowIndex &&
      droppingPiece.col === colIndex

        ? "dropPiece 0.35s ease"

      : poofPiece &&
        poofPiece.row === rowIndex &&
        poofPiece.col === colIndex

        ? "poof 0.5s ease forwards"

      : "none",
  }}
/>

              </div>

            )
          )
        )}

      </div>

      <button
        onClick={resetGame}

        style={styles.resetButton}
      >
        Reset Game
      </button>

      {/* POPUP */}

      {showPopup && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2>
              Stick This Skill
            </h2>

            <div style={styles.skillText}>
              {currentSkill}
            </div>

            <div style={styles.popupButtons}>

              <button
                onClick={stickSkill}

                style={styles.stickButton}
              >
                Stuck It
              </button>

              <button
                onClick={failSkill}

                style={styles.failButton}
              >
                Missed
              </button>

            </div>

          </div>

        </div>

        

      )}

      {gameOver && (

  <div style={styles.overlay}>

    <div style={styles.popup}>

      <h1 style={styles.endTitle}>

        {
          winner === "red"
            ? "Red Wins!"
            : "Yellow Wins!"
        }

      </h1>

      <div style={styles.endSubtitle}>
        Great sticks.
      </div>

      <div style={styles.popupButtons}>

        <button
          onClick={resetGame}
          style={styles.stickButton}
        >
          Play Again
        </button>

        <button
          onClick={() =>
            setGameStarted(false)
          }
          style={styles.failButton}
        >
          Main Menu
        </button>

      </div>

    </div>

  </div>

)}

    </div>

  );
}


const styles = {

  page: {
  minHeight: "100vh",

  position: "relative",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  padding: "30px 12px",

  color:
    "var(--text-primary)",
},

  title: {
    fontSize: "56px",

    fontWeight: "bold",

    marginBottom: "18px",
  },

  turnBanner: {
    padding: "14px 30px",

    borderRadius: "20px",

    marginBottom: "24px",

    color: "white",

    fontWeight: "bold",

    fontSize: "20px",
  },

  winText: {
    fontSize: "34px",

    fontWeight: "bold",

    color:
      "var(--accent)",

    marginBottom: "20px",
  },

  topRow: {
  display: "grid",

  gridTemplateColumns:
    "repeat(7, clamp(38px, 11vw, 60px))",

  gap: "10px",

  marginBottom: "20px",

  padding: "0 18px",
},

  topButton: {
  width: "clamp(34px, 10vw, 54px)",
  height: "clamp(34px, 10vw, 54px)",

    borderRadius: "50%",

    background:
      "rgba(255,255,255,0.08)",

    cursor: "pointer",

    transition: "0.2s",

    backdropFilter:
      "blur(8px)",
  },

  board: {
    display: "grid",

    gridTemplateColumns:
      "repeat(7, 1fr)",

    gap: "10px",

    background:

  document.documentElement
    .classList
    .contains("dark")

    ? "rgba(255,255,255,0.06)"

    : "rgba(15,23,42,0.08)",

    padding: "18px",

    borderRadius: "28px",

    border:
      "1px solid var(--border)",

    backdropFilter:
      "blur(12px)",
  },

  cell: {
  width: "clamp(38px, 11vw, 60px)",
  height: "clamp(38px, 11vw, 60px)",

  background:
  document.documentElement
    .classList
    .contains("dark")

    ? "rgba(255,255,255,0.04)"

    : "rgba(15,23,42,0.04)",

borderRadius: "50%",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  piece: {
  width: "clamp(32px, 9vw, 52px)",
  height: "clamp(32px, 9vw, 52px)",

    borderRadius: "50%",

    transition:
      "0.25s ease",

    border:
  "2px solid rgba(255,255,255,0.22)",
  },

  resetButton: {
    marginTop: "30px",

    padding:
      "16px 28px",

    borderRadius: "18px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    fontSize: "18px",

    cursor: "pointer",
  },

  overlay: {
  position: "fixed",

  top: 0,
  left: 0,

  width: "100vw",
  height: "100vh",

  background:
    "rgba(0,0,0,0.72)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  zIndex: 999999,

  backdropFilter:
    "blur(6px)",
},

  popup: {
    width: "min(420px, 92vw)",

    background:
      "var(--card-bg)",

      position: "relative",

zIndex: 1000000,

    border:
      "1px solid var(--border)",

    borderRadius: "30px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "24px",

    alignItems: "center",

    backdropFilter:
      "blur(18px)",
  },

  skillText: {
    fontSize: "36px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  popupButtons: {
    display: "flex",

    gap: "16px",

    width: "100%",
  },

  stickButton: {
    flex: 1,

    padding: "16px",

    borderRadius: "16px",

    border: "none",

    background: "#22c55e",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",
  },

  failButton: {
    flex: 1,

    padding: "16px",

    borderRadius: "16px",

    border: "none",

    background: "#ef4444",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    cursor: "pointer",
  },

  homeButton: {
  position: "absolute",

  top: "20px",
  left: "20px",

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

  backdropFilter:
    "blur(12px)",

  zIndex: 1000,
},

subtitle: {
  color:
    "var(--text-secondary)",

  marginBottom: "30px",

  fontSize: "18px",
},

menuCard: {
  width: "min(680px, 92vw)",

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
    "blur(16px)",
},

sectionTitle: {
  fontSize: "22px",

  fontWeight: "bold",
},

skillHeader: {
  display: "flex",

  alignItems: "center",

  justifyContent: "space-between",

  gap: "16px",
},

skillCount: {
  marginTop: "6px",

  color:
    "var(--text-secondary)",

  fontSize: "14px",
},

skillActions: {
  display: "flex",

  gap: "8px",
},

skillActionButton: {
  padding: "10px 12px",

  borderRadius: "12px",

  border:
    "1px solid var(--border)",

  background:
    "rgba(255,255,255,0.08)",

  color:
    "var(--text-primary)",

  cursor: "pointer",

  fontWeight: "bold",
},

skillGroups: {
  display: "flex",

  flexDirection: "column",

  gap: "18px",

  maxHeight: "min(48vh, 460px)",

  overflowY: "auto",

  paddingRight: "4px",
},

skillGroup: {
  display: "flex",

  flexDirection: "column",

  gap: "10px",
},

skillGroupHeader: {
  display: "flex",

  justifyContent: "space-between",

  gap: "12px",

  color:
    "var(--text-primary)",

  fontWeight: "bold",
},

skillGroupNote: {
  color:
    "var(--text-secondary)",

  fontSize: "13px",

  fontWeight: "normal",
},

skillGrid: {
  display: "grid",

  gridTemplateColumns:
    "repeat(auto-fit, minmax(150px, 1fr))",

  gap: "10px",
},

skillOption: {
  minHeight: "46px",

  padding: "10px 12px",

  borderRadius: "14px",

  border:
    "1px solid var(--border)",

  display: "flex",

  alignItems: "center",

  gap: "9px",

  color:
    "var(--text-primary)",

  cursor: "pointer",

  lineHeight: 1.2,

  fontWeight: "bold",

  fontSize: "14px",
},

skillCheckbox: {
  flex: "0 0 auto",

  width: "16px",

  height: "16px",

  accentColor:
    "var(--accent)",
},

playButton: {
  padding: "18px",

  borderRadius: "18px",

  border: "none",

  background:
    "var(--accent-glow)",

  color:
    "var(--accent)",

  fontWeight: "bold",

  fontSize: "20px",

  cursor: "pointer",
},

howButton: {
  padding: "14px",

  borderRadius: "14px",

  border: "none",

  background:
    "rgba(255,255,255,0.08)",

  color:
    "var(--text-primary)",

  cursor: "pointer",
},

howText: {
  color:
    "var(--text-secondary)",

  lineHeight: 1.5,
},

endTitle: {
  fontSize: "42px",

  fontWeight: "bold",

  margin: 0,

  color:
    "var(--accent)",
},

endSubtitle: {
  color:
    "var(--text-secondary)",

  fontSize: "18px",
},

};
