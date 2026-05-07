import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Trampoline from "./pages/Trampoline";
import DoubleMini from "./pages/DoubleMini";
import Tumbling from "./pages/Tumbling";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={
            <div style={styles.container}>

              <div style={styles.overlay} />

              <div style={styles.content}>

                <h1 style={styles.title}>
                  Gymnastics Calculator
                </h1>

                <p style={styles.subtitle}>
                  Trampoline • Double Mini • Tumbling
                </p>

                <div style={styles.buttonContainer}>

                  <Link
                    to="/trampoline"
                    style={styles.card}
                  >
                    Trampoline
                  </Link>

                  <Link
                    to="/double-mini"
                    style={styles.card}
                  >
                    Double Mini
                  </Link>

                  <Link
                    to="/tumbling"
                    style={styles.card}
                  >
                    Tumbling
                  </Link>

                </div>

              </div>

            </div>
          }
        />

        <Route
          path="/trampoline"
          element={<Trampoline />}
        />

        <Route
          path="/double-mini"
          element={<DoubleMini />}
        />

        <Route
          path="/tumbling"
          element={<Tumbling />}
        />

      </Routes>
    </BrowserRouter>
  );
}

const styles = {

  container: {
    minHeight: "100vh",
    width: "100vw",
    
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    position: "relative",

    overflow: "hidden",
  },

  overlay: {
    position: "absolute",
    inset: 0,

    background:
      "radial-gradient(circle at top, rgba(255,255,255,0.08), transparent 40%)",
  },

  content: {
    position: "relative",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: "18px",
  },

  title: {
    color: "white",
    fontSize: "56px",
    fontWeight: "bold",

    margin: 0,
  },

  subtitle: {
    color: "#cbd5e1",
    fontSize: "20px",

    marginBottom: "30px",
  },

  buttonContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  card: {
    width: "320px",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "28px",

    borderRadius: "20px",

    background:
      "rgba(255,255,255,0.08)",

    backdropFilter: "blur(10px)",

    border:
      "1px solid rgba(255,255,255,0.15)",

    color: "white",

    textDecoration: "none",

    fontSize: "32px",
    fontWeight: "bold",

    textAlign: "center",

    transition: "0.2s",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.25)",
  },
};