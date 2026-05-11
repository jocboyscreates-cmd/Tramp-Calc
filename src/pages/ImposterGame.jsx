import { useState } from "react";

import { Link } from "react-router-dom";

import {
  House,
  Users,
} from "lucide-react";

import { onTrampSkills }
from "../data/onTrampSkills";

import { offTrampSkills }
from "../data/offTrampSkills";

export default function ImposterGame() {

  const [playerCount, setPlayerCount] =
    useState(4);

  const [maxImposters, setMaxImposters] =
    useState(2);

  const [gameStarted, setGameStarted] =
    useState(false);

  const [currentPlayer, setCurrentPlayer] =
    useState(1);

  const [revealed, setRevealed] =
    useState(false);

  const [skill, setSkill] =
    useState("");

  const [imposters, setImposters] =
    useState([]);

  const [startingPlayer, setStartingPlayer] =
    useState(1);

    const [offTramp, setOffTramp] =
  useState(false);


  const startGame = () => {

const skillBank =
  offTramp
    ? offTrampSkills
    : onTrampSkills;

const chosenSkill =
  skillBank[
    Math.floor(
      Math.random() *
      skillBank.length
    )
  ];

    const weighted = [
      1,1,1,1,
      2,2,
      3,
      4,
      5,
      6,
    ];

    const allowed =
      weighted.filter(
        (n) =>
          n <= maxImposters &&
          n <= playerCount
      );

    const imposterCount =
      allowed[
        Math.floor(
          Math.random() *
          allowed.length
        )
      ];

    const chosenImposters = [];

    while (
      chosenImposters.length <
      imposterCount
    ) {

      const randomPlayer =
        Math.floor(
          Math.random() *
          playerCount
        ) + 1;

      if (
        !chosenImposters.includes(
          randomPlayer
        )
      ) {

        chosenImposters.push(
          randomPlayer
        );
      }
    }

    setSkill(chosenSkill);

    setImposters(chosenImposters);

    setStartingPlayer(
      Math.floor(
        Math.random() *
        playerCount
      ) + 1
    );

    setCurrentPlayer(1);

    setRevealed(false);

    setGameStarted(true);
  };

  const nextPlayer = () => {

    setRevealed(false);

    setCurrentPlayer(
      (prev) => prev + 1
    );
  };

  const isImposter =
    imposters.includes(
      currentPlayer
    );

  return (

    <div style={styles.container}>

      <Link
        to="/games"
        style={styles.homeButton}
      >
        <House size={30} />
      </Link>

      <h1 style={styles.title}>
        Imposter Game
      </h1>

      {!gameStarted && (

        <div style={styles.card}>

          <div style={styles.section}>

  <p style={styles.label}>
    Players
  </p>

  <div style={styles.counterRow}>

    <button
      style={styles.counterButton}

      onClick={() =>
        setPlayerCount(
          Math.max(3, playerCount - 1)
        )
      }
    >
      -
    </button>

    <div style={styles.counterValue}>
      {playerCount}
    </div>

    <button
      style={styles.counterButton}

      onClick={() =>
        setPlayerCount(
          Math.min(10, playerCount + 1)
        )
      }
    >
      +
    </button>

  </div>
</div>

          <div style={styles.section}>

  <p style={styles.label}>
    Max Imposters
  </p>

  <div style={styles.counterRow}>

    <button
      style={styles.counterButton}

      onClick={() =>
        setMaxImposters(
          Math.max(
            1,
            maxImposters - 1
          )
        )
      }
    >
      -
    </button>

    <div style={styles.counterValue}>
      {maxImposters}
    </div>

    <button
      style={styles.counterButton}

      onClick={() =>
        setMaxImposters(
          Math.min(
            playerCount,
            maxImposters + 1
          )
        )
      }
    >
      +
    </button>

      </div>

</div>

<div style={styles.toggleRow}>

  <span style={styles.label}>
    Off Tramp Skills
  </span>

  <button
  style={
    offTramp

      ? styles.toggleActive

      : styles.toggle
  }

  onClick={() =>
    setOffTramp(!offTramp)
  }
>

  {offTramp
    ? "Off Tramp Skills"
    : "On Tramp Skills"}

</button>

</div>

<button
  style={styles.startButton}

  onClick={startGame}
>

            <Users size={26} />

            Start Game

          </button>

        </div>

      )}

      {gameStarted &&
      currentPlayer <= playerCount && (

        <div style={styles.revealCard}>

          <h2 style={styles.playerTitle}>
            Player {currentPlayer}
          </h2>

          <button
            type="button"

            style={styles.holdBox}

            onPointerDown={() =>
              setRevealed(true)
            }

            onPointerUp={() =>
              setRevealed(false)
            }

            onPointerLeave={() =>
              setRevealed(false)
            }
          >

            {!revealed && (
              <div>
                Hold To Reveal
              </div>
            )}

            {revealed && (
              <div style={styles.revealText}>

                {isImposter
                  ? "IMPOSTER"
                  : skill}

              </div>
            )}

          </button>

          <button
            style={styles.nextButton}

            onClick={nextPlayer}
          >
            Next Player
          </button>

        </div>

      )}

      {gameStarted &&
      currentPlayer > playerCount && (

        <div style={styles.card}>

          <h2>
            Everyone Has Seen
            Their Word
          </h2>

          <div style={styles.startPlayer}>
            Player {startingPlayer} starts
          </div>

          <Link
            to="/games"

            style={styles.backButton}
          >
            Back To Games
          </Link>

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
    fontSize: "54px",

    marginBottom: "40px",
  },

  card: {
    width: "min(500px, 92vw)",

    background:
      "linear-gradient(135deg, #111827, #1e293b)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "28px",

    padding: "32px",

    display: "flex",

    flexDirection: "column",

    gap: "28px",

    alignItems: "center",
  },

  section: {
    width: "100%",

    display: "flex",

    flexDirection: "column",

    gap: "12px",
  },

  label: {
    fontWeight: "bold",
  },

  startButton: {
    padding: "18px 28px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(192,132,252,0.35)",

    color: "white",

    fontWeight: "bold",

    fontSize: "20px",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    gap: "12px",
  },

  revealCard: {
    width: "min(700px, 92vw)",

    background:
      "linear-gradient(135deg, #111827, #1e293b)",

    borderRadius: "30px",

    padding: "40px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "30px",
  },

  playerTitle: {
    fontSize: "38px",
  },

  holdBox: {
    width: "100%",

    height: "300px",

    borderRadius: "24px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "36px",

    fontWeight: "bold",

    userSelect: "none",

    cursor: "pointer",

    color: "white",
  },

  revealText: {
    fontSize: "48px",

    fontWeight: "bold",

    textAlign: "center",
  },

  nextButton: {
    padding: "18px 28px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.1)",

    color: "white",

    fontSize: "20px",

    cursor: "pointer",
  },

  startPlayer: {
    fontSize: "40px",

    fontWeight: "bold",

    textAlign: "center",
  },

  backButton: {
    padding: "16px 24px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.1)",

    color: "white",

    textDecoration: "none",
  },

  counterRow: {
  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  gap: "20px",
},

counterButton: {
  width: "56px",
  height: "56px",

  borderRadius: "16px",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  fontSize: "30px",

  cursor: "pointer",
},

counterValue: {
  fontSize: "32px",

  fontWeight: "bold",

  minWidth: "50px",

  textAlign: "center",
},

toggleRow: {
  width: "100%",

  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",
},

toggle: {
  padding: "16px",

  borderRadius: "16px",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  fontSize: "18px",

  cursor: "pointer",
},

toggleActive: {
  padding: "16px",

  borderRadius: "16px",

  border: "none",

  background:
    "rgba(192,132,252,0.4)",

  color: "white",

  fontSize: "18px",

  cursor: "pointer",
},

};