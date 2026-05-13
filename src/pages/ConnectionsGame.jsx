import { useState } from "react";

const skillBank = [
  "Barani Straight",
  "Barani Pike",
  "Barani Truck",
  "Rudy",
  "Back Full",
  "Double Back Tuck",
  "Half Out Tuck",
  "Half Out Pike",
  "Tuck Jump",
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

  const [selectedColumn, setSelectedColumn] =
    useState(null);

  const [showPopup, setShowPopup] =
    useState(false);

  const [currentSkill, setCurrentSkill] =
    useState("");

  const [pendingRow, setPendingRow] =
    useState(null);

  const [winner, setWinner] =
    useState(null);

  const getRandomSkill = () => {

    return skillBank[
      Math.floor(
        Math.random() *
        skillBank.length
      )
    ];
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

    newBoard[pendingRow][selectedColumn] =
      currentPlayer;

    setBoard(newBoard);

    if (
      checkWinner(
        newBoard,
        currentPlayer
      )
    ) {

      setWinner(currentPlayer);

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

    setShowPopup(false);

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
  };

  return (

    <div style={styles.page}>

      <h1 style={styles.title}>
        Connections
      </h1>

      {!winner && (

        <div
          style={{
            ...styles.turnBanner,

            background:
              currentPlayer === "red"
                ? "#ef4444"
                : "#facc15",
          }}
        >
          {
            currentPlayer === "red"
              ? "Red Turn"
              : "Yellow Turn"
          }
        </div>

      )}

      {winner && (

        <div style={styles.winText}>

          {
            winner === "red"
              ? "Red Wins!"
              : "Yellow Wins!"
          }

        </div>

      )}

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
                      cell === "red"

                        ? "#ef4444"

                        : cell ===
                          "yellow"

                        ? "#facc15"

                        : "rgba(255,255,255,0.08)",
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

    </div>

  );
}

const styles = {

  page: {
    minHeight: "100vh",

    background:
      "var(--bg-primary)",

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
    "repeat(7, 60px)",

  gap: "10px",

  marginBottom: "20px",

  padding: "0 18px",
},

  topButton: {
    width: "54px",
    height: "54px",

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
      "rgba(255,255,255,0.06)",

    padding: "18px",

    borderRadius: "28px",

    border:
      "1px solid var(--border)",

    backdropFilter:
      "blur(12px)",
  },

  cell: {
    width: "60px",
    height: "60px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",
  },

  piece: {
    width: "52px",
    height: "52px",

    borderRadius: "50%",

    transition:
      "0.25s ease",

    border:
      "2px solid rgba(255,255,255,0.08)",
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

    inset: 0,

    background:
      "rgba(0,0,0,0.55)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 9999,
  },

  popup: {
    width: "min(420px, 92vw)",

    background:
      "var(--card-bg)",

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

};