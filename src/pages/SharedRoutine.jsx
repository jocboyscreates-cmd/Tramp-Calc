import { Link } from "react-router-dom";

import {
  House,
  Share2,
  Pencil,
} from "lucide-react";

export default function SharedRoutine() {

  const params =
    new URLSearchParams(
      window.location.search
    );

  const encoded =
    params.get("r");

  let routine = null;

  try {

    if (encoded) {

      routine = JSON.parse(
        decodeURIComponent(encoded)
      );

    }

  } catch {

    routine = null;

  }

  if (!routine) {

    return (

      <div style={styles.invalidContainer}>

        <h1 style={styles.invalidTitle}>
          Invalid Shared Routine
        </h1>

        <p style={styles.invalidText}>
          This routine link is broken or invalid.
        </p>

        <Link
          to="/"

          style={styles.backButton}
        >
          Back Home
        </Link>

      </div>

    );
  }

  return (

    <div style={styles.container}>

      <Link
        to="/"

        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <div style={styles.header}>

        <div style={styles.shareIcon}>

          <Share2 size={34} />

        </div>

        <h1 style={styles.title}>
          {routine.name}
        </h1>

        <p style={styles.subtitle}>
          {routine.event}
        </p>

        <div style={styles.ddCard}>

          <div style={styles.ddLabel}>
            Difficulty
          </div>

          <div style={styles.dd}>
            {Number(
              routine.totalDD || 0
            ).toFixed(1)}
          </div>

        </div>

      </div>

<button
  style={styles.openButton}

  onClick={() => {

    localStorage.setItem(
      "currentRoutine",
      JSON.stringify(routine)
    );

    if (
      routine.event ===
      "trampoline"
    ) {
      window.location.href =
        "/trampoline";
    }

    if (
      routine.event ===
      "doubleMini"
    ) {
      window.location.href =
        "/double-mini";
    }

    if (
      routine.event ===
      "tumbling"
    ) {
      window.location.href =
        "/tumbling";
    }

  }}
>

  <Pencil size={20} />

  Open In Editor

</button>

      <div style={styles.skills}>

  {routine.event === "trampoline" &&

    routine.skills?.map(
      (skill, index) => (

        <div
          key={index}
          style={styles.skill}
        >

          <div style={styles.skillNumber}>
            {index + 1}
          </div>

          <div style={styles.skillText}>
            {skill}
          </div>

        </div>

      )
    )
  }

  {routine.event === "doubleMini" &&

    routine.routines?.map(
      (routineSkills, routineIndex) => (

        <div
          key={routineIndex}
          style={styles.routineSection}
        >

          <h2 style={styles.routineTitle}>
            Routine {routineIndex + 1}
          </h2>

          {routineSkills.map(
            (skill, index) => (

              <div
                key={index}
                style={styles.skill}
              >

                <div style={styles.skillNumber}>
                  {index + 1}
                </div>

                <div style={styles.skillText}>
                  {skill}
                </div>

              </div>

            )
          )}

        </div>

      )
    )
  }

  {routine.event === "tumbling" &&

    Object.entries(
      routine.passes || {}
    ).map(
      ([passName, passSkills]) => (

        <div
          key={passName}
          style={styles.routineSection}
        >

          <h2 style={styles.routineTitle}>
            {passName}
          </h2>

          {passSkills.map(
            (skill, index) => (

              <div
                key={index}
                style={styles.skill}
              >

                <div style={styles.skillNumber}>
                  {index + 1}
                </div>

                <div style={styles.skillText}>
                  {skill}
                </div>

              </div>

            )
          )}

        </div>

      )
    )
  }

</div>

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

    padding: "40px 20px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",
  },

  invalidContainer: {
    minHeight: "100vh",

    background:
      "var(--bg-primary)",

    color:
      "var(--text-primary)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    gap: "18px",

    padding: "20px",
  },

  invalidTitle: {
    fontSize: "52px",

    fontWeight: "bold",

    textAlign: "center",
  },

  invalidText: {
    color:
      "var(--text-secondary)",

    fontSize: "18px",

    textAlign: "center",
  },

  backButton: {
    marginTop: "10px",

    padding: "16px 24px",

    borderRadius: "18px",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    textDecoration: "none",

    fontWeight: "bold",
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

    textDecoration: "none",

    color:
      "var(--text-primary)",

    backdropFilter:
      "blur(10px)",

    boxShadow:
      "0 8px 24px rgba(0,0,0,0.18)",
  },

  header: {
    marginTop: "70px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "16px",

    textAlign: "center",
  },

  shareIcon: {
    width: "90px",
    height: "90px",

    borderRadius: "28px",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    boxShadow:
      "0 14px 40px rgba(0,0,0,0.22)",
  },

  title: {
    fontSize: "58px",

    fontWeight: "bold",

    lineHeight: 1.1,
  },

  subtitle: {
    color:
      "var(--text-secondary)",

    fontSize: "22px",

    textTransform: "capitalize",
  },

  ddCard: {
    marginTop: "10px",

    padding: "22px 34px",

    borderRadius: "26px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    gap: "6px",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 14px 40px rgba(0,0,0,0.18)",
  },

  ddLabel: {
    fontSize: "16px",

    color:
      "var(--text-secondary)",
  },

  dd: {
    fontSize: "48px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  skills: {
    marginTop: "50px",

    width: "min(700px, 92vw)",

    display: "flex",

    flexDirection: "column",

    gap: "16px",

    paddingBottom: "60px",
  },

  skill: {
    padding: "22px",

    borderRadius: "24px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    display: "flex",

    alignItems: "center",

    gap: "18px",

    backdropFilter:
      "blur(10px)",

    boxShadow:
      "0 10px 28px rgba(0,0,0,0.15)",
  },

  skillNumber: {
    minWidth: "52px",
    height: "52px",

    borderRadius: "16px",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontWeight: "bold",

    fontSize: "20px",
  },

  skillText: {
    fontSize: "22px",

    fontWeight: "600",
  },

  openButton: {
  marginTop: "16px",

  padding: "16px 24px",

  borderRadius: "18px",

  border: "none",

  background:
    "var(--accent-glow)",

  color:
    "var(--accent)",

  display: "flex",

  alignItems: "center",

  gap: "10px",

  fontWeight: "bold",

  fontSize: "16px",

  cursor: "pointer",
},

routineSection: {
  display: "flex",

  flexDirection: "column",

  gap: "16px",
},

routineTitle: {
  fontSize: "28px",

  fontWeight: "bold",

  marginBottom: "8px",
},

};