import {
  useState,
  useEffect,
} from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import Trampoline from "./pages/Trampoline";
import DoubleMini from "./pages/DoubleMini";
import Tumbling from "./pages/Tumbling";
import SavedRoutines from "./pages/SavedRoutines";
import Leaderboard from "./pages/Leaderboard";
import Games from "./pages/Games";
import DiceGame from "./pages/DiceGame";
import ImposterGame from "./pages/ImposterGame";
import BingoGame from "./pages/BingoGame";
import SharedRoutine from "./pages/SharedRoutine";
import RandomRoutineGame from "./pages/RandomRoutineGame";
import ConnectionsGame from "./pages/ConnectionsGame";

import {
  Trophy,
  Settings,
  Save,
  Gamepad2,
} from "lucide-react";

export default function App() {

  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add(
        "dark"
      );

    } else {

      document.body.classList.remove(
        "dark"
      );

    }

  }, [darkMode]);

  const hoverIn = (e) => {

    e.currentTarget.style.transform =
      "translateY(-6px)";

    e.currentTarget.style.border =
      "1px solid rgba(252,175,69,0.4)";

    e.currentTarget.style.boxShadow =
      "0 0 30px rgba(252,175,69,0.22)";
  };

  const hoverOut = (e) => {

    e.currentTarget.style.transform =
      "translateY(0px)";

    e.currentTarget.style.border =
      "1px solid var(--border)";

    e.currentTarget.style.boxShadow =
      "0 12px 30px rgba(0,0,0,0.18)";
  };

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

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    Trampoline
                  </Link>

                  <Link
                    to="/double-mini"

                    style={styles.card}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    Double Mini
                  </Link>

                  <Link
                    to="/tumbling"

                    style={styles.card}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    Tumbling
                  </Link>

                </div>

                <div style={styles.bottomButtons}>

                  <Link
                    to="/saved"

                    style={styles.squareButton}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <Save size={40} />
                  </Link>

                  <Link
                    to="/leaderboard"

                    style={styles.squareButton}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <Trophy size={40} />
                  </Link>

                  <Link
                    to="/games"

                    style={styles.squareButton}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <Gamepad2 size={40} />
                  </Link>

                  <button
                    onClick={() =>
                      setSettingsOpen(true)
                    }

                    style={styles.squareButton}

                    onMouseEnter={hoverIn}
                    onMouseLeave={hoverOut}
                  >
                    <Settings size={40} />
                  </button>

                </div>

                {settingsOpen && (

                  <div style={styles.modalOverlay}>

                    <div style={styles.settingsModal}>

                      <h2 style={styles.settingsTitle}>
                        Settings
                      </h2>

                      <div style={styles.settingItem}>

                        <span>
                          Show Skill Names
                        </span>

                        <button
                          style={styles.settingButton}
                        >
                          Soon
                        </button>

                      </div>

                      <div style={styles.settingItem}>

                        <span>
                          Dark Mode
                        </span>

                        <button
                          style={
                            darkMode
                              ? styles.settingButtonActive
                              : styles.settingButton
                          }

                          onClick={() =>
                            setDarkMode(!darkMode)
                          }
                        >

                          {darkMode
                            ? "Enabled"
                            : "Disabled"}

                        </button>

                      </div>

                      <div style={styles.settingItem}>

                        <span>
                          Reset Saved Routines
                        </span>

                        <button
                          style={styles.deleteButton}

                          onClick={() => {

                            const confirmed =
                              window.confirm(
                                "Delete all saved routines?"
                              );

                            if (!confirmed)
                              return;

                            localStorage.removeItem(
                              "savedRoutines"
                            );

                            alert(
                              "Saved routines deleted."
                            );

                          }}
                        >
                          Reset
                        </button>

                      </div>

                      <p style={styles.versionText}>
                        Version 13.5.26
                      </p>

                      <button
                        onClick={() =>
                          setSettingsOpen(false)
                        }

                        style={styles.closeButton}
                      >
                        Close
                      </button>

                    </div>

                  </div>

                )}

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

                  <p style={styles.credit}>

                    Created by Jackson Cann •{" "}

                    <a
                      href="https://www.instagram.com/jcanflip"

                      target="_blank"

                      rel="noopener noreferrer"

                      style={styles.instagramLink}
                    >
                      @jcanflip
                    </a>

                  </p>

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
          path="/dice-game"
          element={<DiceGame />}
        />

        <Route
          path="/tumbling"
          element={<Tumbling />}
        />

        <Route
          path="/bingo-game"
          element={<BingoGame />}
        />

        <Route
          path="/saved"
          element={<SavedRoutines />}
        />

        <Route
          path="/leaderboard"
          element={<Leaderboard />}
        />

        <Route
          path="/games"
          element={<Games />}
        />

        <Route
          path="/imposter-game"
          element={<ImposterGame />}
        />

        <Route
          path="/shared"
          element={<SharedRoutine />}
        />

        <Route
          path="/connections-game"
          element={<ConnectionsGame />}
        />

        <Route
          path="/random-routine-game"
          element={<RandomRoutineGame />}
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
      "var(--bg-primary)",

    position: "relative",

    overflow: "hidden",

    transition: "0.3s",
  },

  overlay: {
    position: "absolute",
    inset: 0,

    background:
      "radial-gradient(circle at top, rgba(252,175,69,0.12), transparent 45%)",
  },

  content: {
    position: "relative",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    gap: "18px",
  },

  title: {
    color:
      "var(--text-primary)",

    fontSize:
      "clamp(42px, 8vw, 72px)",

    fontWeight: "bold",

    margin: 0,

    letterSpacing: "-2px",

    textAlign: "center",
  },

  subtitle: {
    color:
      "var(--text-secondary)",

    fontSize: "20px",

    marginBottom: "34px",

    textAlign: "center",
  },

  buttonContainer: {
    display: "flex",

    flexDirection: "column",

    gap: "20px",
  },

  card: {
    width: "min(340px, 92vw)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "30px",

    borderRadius: "28px",

    background:
      "var(--card-bg)",

    backdropFilter: "blur(14px)",

    border:
      "1px solid var(--border)",

    color:
      "var(--text-primary)",

    textDecoration: "none",

    fontSize: "34px",

    fontWeight: "bold",

    textAlign: "center",

    transition:
      "0.22s ease",

    boxShadow:
      "0 12px 30px rgba(0,0,0,0.18)",

    cursor: "pointer",
  },

  bottomButtons: {
    display: "grid",

    gridTemplateColumns:
      "repeat(2, 92px)",

    gap: "18px",

    marginTop: "18px",
  },

  squareButton: {
    width: "92px",
    height: "92px",

    borderRadius: "24px",

    border:
      "1px solid var(--border)",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    background:
      "var(--card-bg)",

    color:
      "var(--text-primary)",

    cursor: "pointer",

    textDecoration: "none",

    backdropFilter: "blur(12px)",

    boxShadow:
      "0 10px 25px rgba(0,0,0,0.18)",

    transition: "0.2s",
  },

  footer: {
    marginTop: "42px",

    display: "flex",

    flexDirection: "column",

    gap: "10px",

    alignItems: "center",
  },

  footerLink: {
    color:
      "var(--text-secondary)",

    textDecoration: "none",

    fontSize: "16px",
  },

  credit: {
    color:
      "var(--text-secondary)",

    fontSize: "14px",

    marginTop: "10px",
  },

  instagramLink: {
    color:
      "var(--accent)",

    textDecoration: "none",

    fontWeight: "bold",
  },

  modalOverlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.5)",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 9999,
  },

  settingsModal: {
    width: "min(430px, 92vw)",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "30px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "22px",

    color:
      "var(--text-primary)",

    backdropFilter:
      "blur(16px)",

    boxShadow:
      "0 20px 60px rgba(0,0,0,0.4)",
  },

  settingsTitle: {
    fontSize: "36px",

    fontWeight: "bold",

    margin: 0,
  },

  settingItem: {
    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",
  },

  settingButton: {
    padding: "10px 16px",

    borderRadius: "12px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",
  },

  settingButtonActive: {
    padding: "10px 16px",

    borderRadius: "12px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

  deleteButton: {
    padding: "10px 16px",

    borderRadius: "12px",

    border: "none",

    background: "#ef4444",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",
  },

  closeButton: {
    padding: "16px",

    borderRadius: "16px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    cursor: "pointer",
  },

  versionText: {
    color:
      "var(--text-secondary)",

    textAlign: "center",

    marginTop: "8px",
  },

};