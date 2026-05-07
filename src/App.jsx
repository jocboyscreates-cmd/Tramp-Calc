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

                <div style={styles.footer}>

                  <a
                    href="https://www.gymbc.org/media/qb5g331q/2025_tg_canadian_pathways_en_v6_march-2025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.footerLink}
                  >
                    Canadian Pathways PDF
                  </a>

                  <a
                    href="https://www.gymbc.org/media/1wbnaeax/fig-tra-cop-2025-2028.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.footerLink}
                  >
                    FIG Code of Points PDF
                  </a>

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
    fontSize: "clamp(32px, 8vw, 56px)",
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
    width: "min(320px, 90vw)",

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

  footer: {
    marginTop: "40px",

    display: "flex",
    flexDirection: "column",
    gap: "10px",

    alignItems: "center",
  },

  footerLink: {
    color: "#cbd5e1",

    textDecoration: "none",

    fontSize: "16px",
  },
};