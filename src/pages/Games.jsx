import { Link } from "react-router-dom";

import {
  House,
  Dice5,
  Users,
  Grid3X3,
  Disc3,
  Shuffle,
  Map,
} from "lucide-react";

export default function Games() {

  return (

    <div style={styles.container}>

      <Link
        to="/"
        style={styles.homeButton}
      >
        <House size={30} />
      </Link>

      <h1 style={styles.title}>
        Games
      </h1>

      <p style={styles.subtitle}>
        Mini games and challenges
      </p>

      <div style={styles.grid}>

        <Link
          to="/dice-game"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Dice5 size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Dice Skills
            </div>

            <div style={styles.gameSubtitle}>
              Random trampoline skills
            </div>

          </div>

        </Link>

        <Link
          to="/imposter-game"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Users size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Imposter Game
            </div>

            <div style={styles.gameSubtitle}>
              Find the fake routine
            </div>

          </div>

        </Link>

        <Link
          to="/bingo-game"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Grid3X3 size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Bingo
            </div>

            <div style={styles.gameSubtitle}>
              Complete trampoline challenges
            </div>

          </div>

        </Link>

        
        <Link
          to="/connections-game"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Disc3 size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Connect 4
            </div>

            <div style={styles.gameSubtitle}>
              Connect four trampoline challenges
            </div>

          </div>

        </Link>

        <Link
          to="/snake-ladders"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Map size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Skill Race
            </div>

            <div style={styles.gameSubtitle}>
              Snakes & ladders with trampoline skills
            </div>

          </div>

        </Link>

        <Link
          to="/random-routine-game"
          style={styles.gameCard}
        >

          <div style={styles.iconBox}>
            <Shuffle size={42} />
          </div>

          <div>

            <div style={styles.gameTitle}>
              Random Routine
            </div>

            <div style={styles.gameSubtitle}>
              Build a routine from random skills
            </div>

          </div>

        </Link>
      </div>

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",

    background:
      "var(--bg-primary)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    paddingTop: "70px",

    color:
      "var(--text-primary)",
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

    transition:
      "0.2s ease",
  },

  title: {
    fontSize: "60px",

    fontWeight: "bold",

    marginBottom: "10px",

    textAlign: "center",
  },

  subtitle: {
    color:
      "var(--text-secondary)",

    fontSize: "19px",

    marginBottom: "50px",

    textAlign: "center",
  },

  grid: {
    display: "flex",

    flexDirection: "column",

    gap: "28px",

    width: "100%",

    alignItems: "center",

    paddingBottom: "50px",
  },

  gameCard: {
    width: "min(760px, 92vw)",

    padding: "28px",

    borderRadius: "30px",

    border:
      "1px solid var(--border)",

    background:
      "var(--card-bg)",

    display: "flex",

    alignItems: "center",

    gap: "24px",

    color:
      "var(--text-primary)",

    textDecoration: "none",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 12px 34px rgba(0,0,0,0.22)",

    transition:
      "0.25s ease",

    cursor: "pointer",
  },

  iconBox: {
    width: "84px",
    height: "84px",

    borderRadius: "24px",

    background:
      "rgba(255,255,255,0.08)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,

    color:
      "var(--accent)",
  },

  gameTitle: {
    fontSize: "30px",

    fontWeight: "bold",

    marginBottom: "6px",
  },

  gameSubtitle: {
    color:
      "var(--text-secondary)",

    fontSize: "17px",
  },

};

document.addEventListener(
  "mouseover",
  (e) => {

    const target =
      e.target.closest("a");

    if (
      target &&
      target.style.cursor ===
        "pointer"
    ) {

      target.style.transform =
        "translateY(-4px)";

      target.style.border =
        "1px solid var(--accent)";

      target.style.boxShadow =
        "0 0 25px rgba(252,175,69,0.25)";
    }
  }
);

document.addEventListener(
  "mouseout",
  (e) => {

    const target =
      e.target.closest("a");

    if (
      target &&
      target.style.cursor ===
        "pointer"
    ) {

      target.style.transform =
        "translateY(0px)";

      target.style.border =
        "1px solid var(--border)";

      target.style.boxShadow =
        "0 12px 34px rgba(0,0,0,0.22)";
    }
  }
);