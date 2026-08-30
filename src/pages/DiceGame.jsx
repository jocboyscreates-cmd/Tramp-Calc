import { useState } from "react";

import { Link } from "react-router-dom";

import {
  House,
  Dice5,
} from "lucide-react";

import GameInfo from "../components/GameInfo";

export default function DiceGame() {

  const [maxTwists, setMaxTwists] =
    useState(12);

  const [maxFlips, setMaxFlips] =
    useState(3);

  const [weirdPositions, setWeirdPositions] =
    useState(false);

  const [rolling, setRolling] =
    useState(false);

  const [result, setResult] =
    useState(null);

  const rollDice = () => {

    setRolling(true);

    setResult(null);

    setTimeout(() => {

      const safeFlipValues = [
        0,
        1,
        3,
        4,
        5,
        7,
        8,
        9,
        11,
        12,
        13,
        15,
        16,
      ];

      const availableFlips =
        safeFlipValues.filter(
          (v) => v <= maxFlips
        );

      const flipRoll =
        availableFlips[
          Math.floor(
            Math.random() *
            availableFlips.length
          )
        ];

      const twistRoll =
        Math.floor(
          Math.random() *
          (maxTwists + 1)
        );

      const normalPositions = [
        "Tuck",
        "Pike",
        "Straight",
      ];

      const weird = [
        "Split",
        "Straddle",
      ];

      const positions =
        weirdPositions
          ? [
              ...normalPositions,
              ...weird,
            ]
          : normalPositions;

      const position =
        positions[
          Math.floor(
            Math.random() *
            positions.length
          )
        ];

      setResult({
        flips:
          flipRoll * 0.25,

        twists:
          twistRoll * 0.5,

        position,
      });

      setRolling(false);

    }, 900);
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

      <GameInfo title="Dice Skills">
        Set max flips, twists, and positions, then roll a random skill. Use it for fast practice turns or as a quick challenge picker.
      </GameInfo>

      <h1 style={styles.title}>
        Dice Routine Generator
      </h1>

      <div style={styles.card}>

        <div style={styles.section}>

          <p style={styles.label}>
            Max Twists
          </p>

          <input
            type="range"

            min="0"
            max="12"

            value={maxTwists}

            onChange={(e) =>
              setMaxTwists(
                Number(e.target.value)
              )
            }
          />

          <div style={styles.valueText}>
            {maxTwists / 2} twists
          </div>

        </div>

        <div style={styles.section}>

          <p style={styles.label}>
            Max Flips
          </p>

          <input
            type="range"

            min="0"
            max="16"

            value={maxFlips}

            onChange={(e) =>
              setMaxFlips(
                Number(e.target.value)
              )
            }
          />

          <div style={styles.valueText}>
            {maxFlips / 4} flips
          </div>

        </div>

        <div style={styles.toggleRow}>

          <span style={styles.label}>
            Weird Positions
          </span>

          <button
            onClick={() =>
              setWeirdPositions(
                !weirdPositions
              )
            }

            style={
              weirdPositions
                ? styles.activeToggle
                : styles.toggle
            }
          >

            {weirdPositions
              ? "ON"
              : "OFF"}

          </button>

        </div>

        <button
          style={styles.playButton}

          onClick={rollDice}
        >

          <Dice5 size={28} />

          Roll Dice

        </button>

      </div>

      {rolling && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <div style={styles.diceRow}>

              <div style={styles.dice}>
                🎲
              </div>

              <div style={styles.dice}>
                🎲
              </div>

              <div style={styles.dice}>
                🎲
              </div>

            </div>

            <p style={styles.rollingText}>
              Rolling...
            </p>

          </div>

        </div>

      )}

      {result && (

        <div style={styles.overlay}>

          <div style={styles.popup}>

            <h2 style={styles.resultTitle}>
              Result
            </h2>

            <div style={styles.resultText}>
              {result.flips} flips
            </div>

            <div style={styles.resultText}>
              {result.twists} twists
            </div>

            <div style={styles.resultText}>
              {result.position}
            </div>

            <button
              style={styles.playButton}

              onClick={rollDice}
            >
              Roll Again
            </button>

            <Link
              to="/games"

              style={styles.backButton}
            >
              Back
            </Link>

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

    transition: "0.2s",
  },

  title: {
    fontSize: "48px",

    marginBottom: "40px",
  },

  card: {
    width: "min(500px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "24px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "30px",

    backdropFilter: "blur(12px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.2)",
  },

  section: {
    display: "flex",

    flexDirection: "column",

    gap: "12px",
  },

  label: {
    fontWeight: "bold",
  },

  valueText: {
    color:
      "var(--text-secondary)",
  },

  toggleRow: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",
  },

  toggle: {
    padding: "12px 20px",

    borderRadius: "14px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    cursor: "pointer",

    transition: "0.2s",
  },

  activeToggle: {
    padding: "12px 20px",

    borderRadius: "14px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

  playButton: {
    padding: "18px",

    borderRadius: "18px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontSize: "20px",

    fontWeight: "bold",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "12px",

    transition: "0.2s",
  },

  diceRow: {
    display: "flex",

    gap: "20px",
  },

  dice: {
    width: "90px",
    height: "90px",

    borderRadius: "20px",

    background:
      "rgba(255,255,255,0.08)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "50px",
  },

  popup: {
    width: "min(420px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "28px",

    padding: "34px",

    display: "flex",

    flexDirection: "column",

    gap: "20px",

    alignItems: "center",

    backdropFilter: "blur(14px)",

    boxShadow:
      "0 20px 60px rgba(0,0,0,0.35)",
  },

  rollingText: {
    fontSize: "22px",

    fontWeight: "bold",
  },

  resultTitle: {
    fontSize: "36px",

    margin: 0,
  },

  resultText: {
    fontSize: "28px",

    fontWeight: "bold",
  },

  backButton: {
    padding: "14px 22px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    textDecoration: "none",

    transition: "0.2s",
  },

};
