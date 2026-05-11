import { useState } from "react";

import { Link } from "react-router-dom";

import {
  House,
  Dice5,
} from "lucide-react";

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
          ? [...normalPositions, ...weird]
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

    <div style={styles.container}>

      <Link
        to="/games"
        style={styles.homeButton}
      >
        <House size={30} />
      </Link>

      <h1 style={styles.title}>
        Dice Routine Generator
      </h1>

      <div style={styles.card}>

        <div style={styles.section}>

          <p>
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

          <div>
            {maxTwists / 2} twists
          </div>

        </div>

        <div style={styles.section}>

          <p>
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

          <div>
            {maxFlips / 4} flips
          </div>

        </div>

        <div style={styles.toggleRow}>

          <span>
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

      <p>
        Rolling...
      </p>

    </div>

  </div>

)}

      {result && (

  <div style={styles.overlay}>

        <div style={styles.popup}>

          <h2>
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
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

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
  },

  title: {
    fontSize: "48px",

    marginBottom: "40px",
  },

  card: {
    width: "min(500px, 92vw)",

    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderRadius: "24px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "30px",

    backdropFilter: "blur(10px)",
  },

  section: {
    display: "flex",

    flexDirection: "column",

    gap: "12px",
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
      "rgba(255,255,255,0.1)",

    color: "white",

    cursor: "pointer",
  },

  activeToggle: {
    padding: "12px 20px",

    borderRadius: "14px",

    border: "none",

    background:
      "rgba(192,132,252,0.4)",

    color: "white",

    cursor: "pointer",
  },

  playButton: {
    padding: "18px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(192,132,252,0.4)",

    color: "white",

    fontSize: "20px",

    fontWeight: "bold",

    cursor: "pointer",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    gap: "12px",
  },

  rollingBox: {
    marginTop: "40px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "20px",
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
      "rgba(255,255,255,0.1)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "50px",
  },

  popup: {
    marginTop: "40px",

    width: "min(420px, 92vw)",

    background:
  "linear-gradient(135deg, #111827, #1e293b)",

  border:
  "1px solid rgba(255,255,255,0.08)",

    borderRadius: "24px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "18px",

    alignItems: "center",
  },

  resultText: {
    fontSize: "28px",

    fontWeight: "bold",
  },

  backButton: {
    padding: "14px 22px",

    borderRadius: "16px",

    background:
      "rgba(255,255,255,0.1)",

    color: "white",

    textDecoration: "none",
  },

};