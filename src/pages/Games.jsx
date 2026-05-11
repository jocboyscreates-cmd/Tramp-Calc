import { Link } from "react-router-dom";

import {
  House,
  Dice5,
  Users,
  Grid3X3,
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
      Find the fake routin
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

      </div>

    </div>

  );
}

const styles = {

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

  container: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    paddingTop: "60px",

    color: "white",
  },

  title: {
    fontSize: "56px",

    fontWeight: "bold",

    marginBottom: "10px",
  },

  subtitle: {
    color: "#cbd5e1",

    fontSize: "18px",

    marginBottom: "40px",
  },

  grid: {
    display: "flex",

    flexDirection: "column",

    gap: "24px",

    width: "100%",

    alignItems: "center",
  },

  gameCard: {
    width: "min(700px, 92vw)",

    padding: "26px",

    borderRadius: "28px",

    border:
      "1px solid rgba(255,255,255,0.12)",

    background:
      "rgba(255,255,255,0.08)",

    display: "flex",

    alignItems: "center",

    gap: "24px",

    color: "white",

    textDecoration: "none",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",

    transition: "0.2s",
  },

  gameCardDisabled: {
    width: "min(700px, 92vw)",

    padding: "26px",

    borderRadius: "28px",

    border:
      "1px solid rgba(255,255,255,0.08)",

    background:
      "rgba(255,255,255,0.05)",

    display: "flex",

    alignItems: "center",

    gap: "24px",

    color: "white",

    opacity: 0.8,

    backdropFilter: "blur(10px)",
  },

  iconBox: {
    width: "82px",
    height: "82px",

    borderRadius: "22px",

    background:
      "rgba(255,255,255,0.08)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    flexShrink: 0,
  },

  gameTitle: {
    fontSize: "28px",

    fontWeight: "bold",

    marginBottom: "6px",
  },

  gameSubtitle: {
    color: "#cbd5e1",

    fontSize: "16px",
  },

};