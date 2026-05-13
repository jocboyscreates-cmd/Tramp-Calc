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

    setImposters(
      chosenImposters
    );

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
        <House size={28} />
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
                    Math.max(
                      3,
                      playerCount - 1
                    )
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
                    Math.min(
                      10,
                      playerCount + 1
                    )
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
              Skill Type
            </span>

            <button
              style={
                offTramp
                  ? styles.toggleActive
                  : styles.toggle
              }

              onClick={() =>
                setOffTramp(
                  !offTramp
                )
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

            <Users size={24} />

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
              <div style={styles.holdText}>
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
            to="/imposter-game"

            style={styles.backButton}
          >
            Play Again
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
      "var(--bg-primary)",

    color:
      "var(--text-primary)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    paddingTop: "60px",

    paddingBottom: "50px",
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

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "16px",

    color:
      "var(--text-primary)",

    textDecoration: "none",

    backdropFilter:
      "blur(10px)",

    boxShadow:
      "0 8px 24px rgba(0,0,0,0.18)",
  },

  title: {
    fontSize: "58px",

    fontWeight: "bold",

    marginBottom: "40px",

    textAlign: "center",
  },

  card: {
    width: "min(520px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "30px",

    padding: "34px",

    display: "flex",

    flexDirection: "column",

    gap: "28px",

    alignItems: "center",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 12px 34px rgba(0,0,0,0.2)",
  },

  section: {
    width: "100%",

    display: "flex",

    flexDirection: "column",

    gap: "14px",
  },

  label: {
    fontWeight: "bold",

    fontSize: "18px",
  },

  counterRow: {
    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "20px",
  },

  counterButton: {
    width: "58px",
    height: "58px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    fontSize: "30px",

    cursor: "pointer",

    transition:
      "0.2s ease",
  },

  counterValue: {
    fontSize: "34px",

    fontWeight: "bold",

    minWidth: "60px",

    textAlign: "center",

    color:
      "var(--accent)",
  },

  toggleRow: {
    width: "100%",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",

    gap: "16px",
  },

  toggle: {
    padding: "16px 20px",

    borderRadius: "16px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    fontSize: "17px",

    cursor: "pointer",

    transition:
      "0.2s ease",
  },

  toggleActive: {
    padding: "16px 20px",

    borderRadius: "16px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontSize: "17px",

    fontWeight: "bold",

    cursor: "pointer",
  },

  startButton: {
    width: "100%",

    padding: "20px",

    borderRadius: "20px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    fontSize: "22px",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "12px",

    transition:
      "0.2s ease",
  },

  revealCard: {
    width: "min(760px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "34px",

    padding: "40px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "34px",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 12px 34px rgba(0,0,0,0.2)",
  },

  playerTitle: {
    fontSize: "42px",

    fontWeight: "bold",
  },

  holdBox: {
    width: "100%",

    minHeight: "320px",

    borderRadius: "28px",

    border:
      "1px solid var(--border)",

    background:
      "rgba(255,255,255,0.06)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    padding: "20px",

    fontWeight: "bold",

    userSelect: "none",

    cursor: "pointer",

    color:
      "var(--text-primary)",
  },

  holdText: {
    fontSize: "34px",
  },

  revealText: {
    fontSize: "52px",

    fontWeight: "bold",

    textAlign: "center",

    color:
      "var(--accent)",
  },

  nextButton: {
    padding: "18px 28px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    fontSize: "20px",

    cursor: "pointer",
  },

  startPlayer: {
    fontSize: "42px",

    fontWeight: "bold",

    textAlign: "center",

    color:
      "var(--accent)",
  },

  backButton: {
    padding: "16px 26px",

    borderRadius: "18px",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    textDecoration: "none",

    fontWeight: "bold",
  },

};