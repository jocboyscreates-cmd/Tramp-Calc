import { useState } from "react";

import { Link } from "react-router-dom";

import {
  House,
  RotateCcw,
  CircleHelp,
} from "lucide-react";

import { bingoChallenges }
from "../data/bingoChallenges";

export default function BingoGame() {

  const generateBoard = () => {

    return [...bingoChallenges]

      .sort(() => Math.random() - 0.5)

      .slice(0, 25)

      .map((challenge) => ({
        ...challenge,
        completed: false,
      }));
  };

  const [board, setBoard] =
    useState(generateBoard);

  const [bingo, setBingo] =
    useState(false);

  const [info, setInfo] =
    useState(null);

    const [helpOpen, setHelpOpen] =
  useState(false);

  const toggleSquare = (index) => {

    const updatedBoard =
      [...board];

    updatedBoard[index]
      .completed =
      !updatedBoard[index]
        .completed;

    setBoard(updatedBoard);

    checkForBingo(
      updatedBoard
    );
  };

  const checkForBingo = (
    currentBoard
  ) => {

    const rows = 5;
    const cols = 5;

    const grid = [];

    for (
      let row = 0;
      row < rows;
      row++
    ) {

      grid.push(
        currentBoard.slice(
          row * cols,
          row * cols + cols
        )
      );
    }

    for (
      let row = 0;
      row < rows;
      row++
    ) {

      if (
        grid[row].every(
          (square) =>
            square.completed
        )
      ) {

        setBingo(true);

        return;
      }
    }

    for (
      let col = 0;
      col < cols;
      col++
    ) {

      let win = true;

      for (
        let row = 0;
        row < rows;
        row++
      ) {

        if (
          !grid[row][col]
            .completed
        ) {

          win = false;
        }
      }

      if (win) {

        setBingo(true);

        return;
      }
    }

    let diagonal1 = true;

    for (
      let i = 0;
      i < rows;
      i++
    ) {

      if (
        !grid[i][i]
          .completed
      ) {

        diagonal1 = false;
      }
    }

    if (diagonal1) {

      setBingo(true);

      return;
    }

    let diagonal2 = true;

    for (
      let i = 0;
      i < rows;
      i++
    ) {

      if (
        !grid[i][
          cols - 1 - i
        ].completed
      ) {

        diagonal2 = false;
      }
    }

    if (diagonal2) {

      setBingo(true);

      return;
    }

    setBingo(false);
  };


  
  const resetBoard = () => {

    setBoard(generateBoard());

    setBingo(false);
  };

  return (

    <div style={styles.container}>

      <Link
        to="/games"
        style={styles.homeButton}
      >
        <House size={30} />
      </Link>

      <button
  style={styles.helpButton}

  onClick={() =>
    setHelpOpen(true)
  }
>
  <CircleHelp size={22} />
</button>

      <h1 style={styles.title}>
        Bingo
      </h1>

      <p style={styles.subtitle}>
        Complete a line to win
      </p>

      {bingo && (

  <div style={styles.overlay}>

    <div style={styles.bingoPopup}>

      <button
        style={styles.bingoClose}

        onClick={() =>
          setBingo(false)
        }
      >
        ×
      </button>

      <div style={styles.bingoText}>
        BINGO!
      </div>

    </div>

  </div>

)}

      <div style={styles.grid}>

        {board.map(
          (
            challenge,
            index
          ) => (

            <button
              key={index}

              style={{
                ...styles.square,

                ...(challenge.completed
                  ? styles.completedSquare
                  : {}),
              }}

              onClick={() =>
                toggleSquare(index)
              }

              onContextMenu={(e) => {

  e.preventDefault();

  setInfo(challenge);
}}

onPointerDown={() => {

  const timer = setTimeout(() => {

    setInfo(challenge);

  }, 500);

  challenge.timer = timer;
}}

onPointerUp={() => {
  clearTimeout(challenge.timer);
}}

onPointerLeave={() => {
  clearTimeout(challenge.timer);
}}
            >

              {challenge.title}

            </button>

          )
        )}

      </div>

      <button
        style={styles.resetButton}

        onClick={resetBoard}
      >

        <RotateCcw size={22} />

        New Board

      </button>

      {info && (

        <div style={styles.overlay}>

          <div style={styles.modal}>

            <h2>
              {info.title}
            </h2>

            <p>
              {info.description}
            </p>

            <button
              style={styles.closeButton}

              onClick={() =>
                setInfo(null)
              }
            >
              Close
            </button>

          </div>

        </div>

      )}

{helpOpen && (

  <div style={styles.overlay}>

    <div style={styles.modal}>

      <h2>
        How To Play
      </h2>

      <p>
        Tap a square to mark it
        complete.
      </p>

      <p>
        Hold down on mobile or
        right click on desktop to
        view the challenge
        description.
      </p>

      <p>
        A fun way to play is with
        multiple devices where
        each player gets their own
        random board.
      </p>

      <p>
        The winner is the first
        person to get bingo.
      </p>

      <button
        style={styles.closeButton}

        onClick={() =>
          setHelpOpen(false)
        }
      >
        Close
      </button>

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
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    paddingTop: "50px",

    paddingBottom: "50px",
  },

  homeButton: {
    position: "absolute",

    top: "30px",
    left: "30px",

    width: "52px",
    height: "52px",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    background: "white",

    borderRadius: "14px",

    color: "black",

    textDecoration: "none",
  },

  title: {
    fontSize: "56px",

    fontWeight: "bold",

    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",

    marginBottom: "30px",
  },

  bingoBanner: {
    padding: "14px 28px",

    borderRadius: "18px",

    background:
      "rgba(34,197,94,0.25)",

    border:
      "1px solid rgba(34,197,94,0.4)",

    fontWeight: "bold",

    fontSize: "28px",

    marginBottom: "30px",
  },

  grid: {
    width: "min(900px, 92vw)",

    display: "grid",

    gridTemplateColumns:
      "repeat(5, 1fr)",

    gap: "18px",
  },

  square: {
    aspectRatio: "1 / 1",

    borderRadius: "22px",

    border:
      "1px solid rgba(255,255,255,0.1)",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",

    fontWeight: "bold",

    fontSize: "16px",

    padding: "14px",

    cursor: "pointer",

    backdropFilter: "blur(10px)",
  },

  completedSquare: {
    background:
      "rgba(192,132,252,0.35)",

    border:
      "1px solid rgba(192,132,252,0.5)",
  },

  resetButton: {
    marginTop: "30px",

    padding: "16px 24px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.1)",

    color: "white",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    fontSize: "18px",

    cursor: "pointer",
  },

  overlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.5)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 9999,
  },

  modal: {
    width: "min(500px, 92vw)",

    background:
      "linear-gradient(135deg, #111827, #1e293b)",

    borderRadius: "28px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "20px",

    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  closeButton: {
    padding: "14px",

    borderRadius: "14px",

    border: "none",

    background:
      "rgba(255,255,255,0.1)",

    color: "white",

    cursor: "pointer",
  },

  helpButton: {
  position: "absolute",

  top: "30px",
  right: "30px",

  width: "46px",
  height: "46px",

  borderRadius: "14px",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  cursor: "pointer",

  backdropFilter: "blur(10px)",
},

bingoPopup: {
  width: "min(500px, 90vw)",

  background:
    "linear-gradient(135deg, #111827, #1e293b)",

  borderRadius: "34px",

  padding: "60px 30px",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  justifyContent: "center",

  position: "relative",

  border:
    "2px solid rgba(192,132,252,0.5)",

  boxShadow:
    "0 20px 80px rgba(0,0,0,0.5)",
},

bingoText: {
  fontSize: "72px",

  fontWeight: "bold",

  color: "#c084fc",

  textAlign: "center",
},

bingoClose: {
  position: "absolute",

  top: "18px",
  right: "18px",

  width: "38px",
  height: "38px",

  borderRadius: "50%",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  fontSize: "24px",

  cursor: "pointer",
},

};