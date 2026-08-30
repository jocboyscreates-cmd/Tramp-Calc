import { useState } from "react";

import { Link } from "react-router-dom";

import confetti from "canvas-confetti";

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
    useState(() => generateBoard());

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

const duration = 2500;

const animationEnd =
  Date.now() + duration;

const defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 99999,
};

function randomInRange(min, max) {
  return Math.random() *
    (max - min) + min;
}

const interval = setInterval(() => {

  const timeLeft =
    animationEnd - Date.now();

  if (timeLeft <= 0) {
    clearInterval(interval);
    return;
  }

  const particleCount =
    50 * (timeLeft / duration);

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.1, 0.3),
      y: Math.random() - 0.2,
    },
  });

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.7, 0.9),
      y: Math.random() - 0.2,
    },
  });

}, 250);

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

const duration = 2500;

const animationEnd =
  Date.now() + duration;

const defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 99999,
};

function randomInRange(min, max) {
  return Math.random() *
    (max - min) + min;
}

const interval = setInterval(() => {

  const timeLeft =
    animationEnd - Date.now();

  if (timeLeft <= 0) {
    clearInterval(interval);
    return;
  }

  const particleCount =
    50 * (timeLeft / duration);

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.1, 0.3),
      y: Math.random() - 0.2,
    },
  });

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.7, 0.9),
      y: Math.random() - 0.2,
    },
  });

}, 250);

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

const duration = 2500;

const animationEnd =
  Date.now() + duration;

const defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 99999,
};

function randomInRange(min, max) {
  return Math.random() *
    (max - min) + min;
}

const interval = setInterval(() => {

  const timeLeft =
    animationEnd - Date.now();

  if (timeLeft <= 0) {
    clearInterval(interval);
    return;
  }

  const particleCount =
    50 * (timeLeft / duration);

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.1, 0.3),
      y: Math.random() - 0.2,
    },
  });

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.7, 0.9),
      y: Math.random() - 0.2,
    },
  });

}, 250);

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

const duration = 2500;

const animationEnd =
  Date.now() + duration;

const defaults = {
  startVelocity: 30,
  spread: 360,
  ticks: 60,
  zIndex: 99999,
};

function randomInRange(min, max) {
  return Math.random() *
    (max - min) + min;
}

const interval = setInterval(() => {

  const timeLeft =
    animationEnd - Date.now();

  if (timeLeft <= 0) {
    clearInterval(interval);
    return;
  }

  const particleCount =
    50 * (timeLeft / duration);

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.1, 0.3),
      y: Math.random() - 0.2,
    },
  });

  confetti({
    ...defaults,
    particleCount,

    origin: {
      x: randomInRange(0.7, 0.9),
      y: Math.random() - 0.2,
    },
  });

}, 250);

return;
    }

    setBingo(false);
  };

  const resetBoard = () => {

    setBoard(generateBoard());

    setBingo(false);
  };

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
        <House size={30} />
      </Link>

      <button
        className="game-page-info-button"
        style={styles.helpButton}

        onClick={() =>
          setHelpOpen(true)
        }
      >
        <CircleHelp size={22} />
      </button>

      <div className="game-floating-actions">
        <Link to="/games">
          <House size={20} />
          Games
        </Link>

        <button
          type="button"
          onClick={() =>
            setHelpOpen(true)
          }
        >
          <CircleHelp size={20} />
          Info
        </button>
      </div>

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

                const timer =
                  setTimeout(() => {

                    setInfo(
                      challenge
                    );

                  }, 500);

                challenge.timer =
                  timer;
              }}

              onPointerUp={() => {

                clearTimeout(
                  challenge.timer
                );
              }}

              onPointerLeave={() => {

                clearTimeout(
                  challenge.timer
                );
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

            <h2 style={styles.modalTitle}>
  How To Play
</h2>

            <p>
              Tap a square to
              mark it complete.
            </p>

            <p>
              Hold down on mobile
              or right click on
              desktop to view the
              challenge description.
            </p>

            <p>
              A fun way to play
              is with multiple
              devices where each
              player gets their
              own random board.
            </p>

            <p>
              The winner is the
              first person to
              get bingo.
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
      "var(--bg-primary)",

    color:
      "var(--text-primary)",

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

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "14px",

    color:
      "var(--text-primary)",

    textDecoration: "none",
  },

  title: {
  fontSize:
    "clamp(36px, 8vw, 56px)",

  fontWeight: "bold",

  marginBottom: "10px",

  textAlign: "center",
},

  subtitle: {
    color:
      "var(--text-secondary)",

    marginBottom: "30px",
  },

  grid: {
  width: "min(900px, 96vw)",

  display: "grid",

  gridTemplateColumns:
    "repeat(5, minmax(0, 1fr))",

  gap:
    "clamp(6px, 2vw, 18px)",
},

  square: {
  aspectRatio: "1 / 1",

  minHeight: "70px",

  borderRadius:
    "clamp(10px, 2vw, 22px)",

  border:
    "1px solid var(--border)",

  background:
    "var(--card-bg)",

  color:
    "var(--text-primary)",

  fontWeight: "bold",

  fontSize:
    "clamp(10px, 2vw, 16px)",

  padding:
    "clamp(4px, 1vw, 14px)",

  cursor: "pointer",

  backdropFilter: "blur(10px)",

  transition:
    "all 0.2s ease",

  overflow: "hidden",

  wordBreak: "break-word",

  lineHeight: "1.1",
},

  completedSquare: {
    background:
      "var(--accent-glow)",

    border:
      "1px solid var(--accent)",
  },

  resetButton: {
    marginTop: "30px",

    padding: "16px 24px",

    borderRadius: "18px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

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
    "rgba(0,0,0,0.6)",

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  padding: "20px",

  zIndex: 9999,

  backdropFilter:
    "blur(8px)",
},

  modal: {
  width: "min(560px, 92vw)",

  background:
    "linear-gradient(135deg, rgba(30,41,59,0.98), rgba(15,23,42,0.98))",

  borderRadius: "32px",

  padding: "34px",

  display: "flex",

  flexDirection: "column",

  gap: "24px",

  border:
    "1px solid rgba(255,255,255,0.08)",

  backdropFilter:
    "blur(24px)",

  boxShadow:
    "0 20px 70px rgba(0,0,0,0.45)",
},

  closeButton: {
    padding: "14px",

    borderRadius: "14px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    cursor: "pointer",
  },

  helpButton: {
    position: "absolute",

    top: "30px",
    right: "30px",

    width: "46px",
    height: "46px",

    borderRadius: "14px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    cursor: "pointer",

    backdropFilter: "blur(10px)",
  },

  bingoPopup: {
  width: "min(520px, 92vw)",

  minHeight: "240px",

  background:
    "linear-gradient(135deg, rgba(30,41,59,0.96), rgba(15,23,42,0.96))",

  borderRadius: "36px",

  padding: "50px 30px",

  display: "flex",

  flexDirection: "column",

  alignItems: "center",

  justifyContent: "center",

  position: "relative",

  border:
    "1px solid rgba(252,175,69,0.45)",

  backdropFilter:
    "blur(24px)",

  boxShadow:
    "0 25px 90px rgba(252,175,69,0.18)",
},

  bingoText: {
  fontSize:
    "clamp(54px, 13vw, 96px)",

  fontWeight: "900",

  letterSpacing: "-2px",

  color:
    "var(--accent)",

  textAlign: "center",

  textShadow:
    "0 0 30px rgba(252,175,69,0.35)",
},

  bingoClose: {
    position: "absolute",

    top: "18px",
    right: "18px",

    width: "38px",
    height: "38px",

    borderRadius: "50%",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    fontSize: "24px",

    cursor: "pointer",
  },

  modalTitle: {
  fontSize: "42px",

  fontWeight: "bold",

  color:
    "var(--text-primary)",
},

};
