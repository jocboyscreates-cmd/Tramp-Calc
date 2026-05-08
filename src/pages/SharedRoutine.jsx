import { Link } from "react-router-dom";

import { House } from "lucide-react";

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

      console.log(routine);

    }

  } catch {

    routine = null;

  }

  if (!routine) {

    return (

      <div style={styles.container}>

        <h1>
          Invalid Shared Routine
        </h1>

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

      <h1 style={styles.title}>
        {routine.name}
      </h1>

      <p style={styles.subtitle}>
        {routine.event}
      </p>

      <h2 style={styles.dd}>
        DD: {Number(routine.totalDD || 0).toFixed(1)}
      </h2>

      <div style={styles.skills}>

        {routine.skills &&
          routine.skills.map(
            (skill, index) => (

              <div
                key={index}

                style={styles.skill}
              >
                {index + 1}. {skill}
              </div>

            )
          )}

      </div>

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    color: "white",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",
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

    color: "black",

    borderRadius: "14px",

    textDecoration: "none",
  },

  title: {
    marginTop: "70px",

    fontSize: "42px",
  },

  subtitle: {
    color: "#cbd5e1",

    fontSize: "20px",
  },

  dd: {
    marginTop: "10px",

    color: "#facc15",
  },

  skills: {
    marginTop: "40px",

    width: "min(500px, 92vw)",

    display: "flex",

    flexDirection: "column",

    gap: "12px",
  },

  skill: {
    padding: "18px",

    borderRadius: "18px",

    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    fontSize: "20px",
  },

};