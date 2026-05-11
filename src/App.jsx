import { useState } from "react";

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

import {
  Trophy,
  Settings,
  Save,
  Gamepad2,
} from "lucide-react";

export default function App() {
  const [settingsOpen, setSettingsOpen] =
  useState(false);

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

<div style={styles.bottomButtons}>

  <Link
    to="/saved"
    style={styles.squareButton}
  >
    <Save size={40} />
  </Link>

  <Link
    to="/leaderboard"
    style={styles.squareButton}
  >
    <Trophy size={40} />
  </Link>

  <Link
  to="/games"
  style={styles.squareButton}
>
  <Gamepad2 size={40} />
</Link>

  <button
    onClick={() =>
      setSettingsOpen(true)
    }

    style={styles.squareButton}
  >
    <Settings size={40} />
  </button>

</div>

            
{settingsOpen && (

  <div style={styles.modalOverlay}>

    <div style={styles.settingsModal}>

      <h2>
        Settings
      </h2>

      <div style={styles.settingItem}>
        <span>
          Show Skill Names
        </span>

        <button style={styles.settingButton}>
          Soon
        </button>
      </div>

      <div style={styles.settingItem}>
        <span>
          Dark Mode
        </span>

        <button style={styles.settingButton}>
          Enabled
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

            if (!confirmed) return;

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
        Version 1.0
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

  credit: {
  color: "#94a3b8",
  fontSize: "14px",
  marginTop: "10px",
  },

  instagramLink: {
  color: "#fcaf45",
  textDecoration: "none",
  },

  bottomButtons: {
  display: "grid",

  gridTemplateColumns: "repeat(2, 92px)",
  justifyContent: "center",

  gap: "18px",

  marginTop: "18px",

  justifyContent: "center",
},

squareButton: {
  width: "92px",
  height: "92px",

  borderRadius: "18px",

  border: "none",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  background:
    "rgba(255,255,255,0.08)",

  border:
    "1px solid rgba(255,255,255,0.15)",

  color: "white",

  cursor: "pointer",

  textDecoration: "none",

  backdropFilter: "blur(10px)",

  boxShadow:
    "0 10px 30px rgba(0,0,0,0.25)",
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
  width: "min(420px, 92vw)",

  background:
    "linear-gradient(135deg, #111827, #1e293b)",

  border:
    "1px solid rgba(255,255,255,0.1)",

  borderRadius: "24px",

  padding: "28px",

  display: "flex",

  flexDirection: "column",

  gap: "20px",

  color: "white",

  boxShadow:
    "0 20px 60px rgba(0,0,0,0.45)",
},

settingItem: {
  display: "flex",

  justifyContent: "space-between",

  alignItems: "center",
},

settingButton: {
  padding: "10px 16px",

  borderRadius: "10px",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",
},

deleteButton: {
  padding: "10px 16px",

  borderRadius: "10px",

  border: "none",

  background: "#ef4444",

  color: "white",

  fontWeight: "bold",

  cursor: "pointer",
},

closeButton: {
  padding: "14px",

  borderRadius: "14px",

  border: "none",

  background: "white",

  color: "black",

  fontWeight: "bold",

  cursor: "pointer",
},

versionText: {
  color: "#94a3b8",

  textAlign: "center",

  marginTop: "10px",
},

};