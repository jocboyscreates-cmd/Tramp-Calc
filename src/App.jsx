import {
  useEffect,
  useState,
} from "react";

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";

import { Helmet } from "react-helmet-async";

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
import SnakeLadders from "./pages/SnakeLadders";

import {
  BookOpen,
  Calculator,
  ChevronRight,
  CircleHelp,
  Gamepad2,
  Save,
  Settings,
  Trophy,
  X,
} from "lucide-react";

const primaryTools = [
  {
    title: "Trampoline",
    subtitle: "Build a 10 skill routine and total the DD.",
    meta: "Routine calculator",
    to: "/trampoline",
    icon: Calculator,
    info:
      "Use this for trampoline routines. Type a skill code or choose from the skill list, and the total DD updates as you build.",
  },
  {
    title: "Double Mini",
    subtitle: "Score two or four double mini passes.",
    meta: "DMT calculator",
    to: "/double-mini",
    icon: Calculator,
    info:
      "Use this for double mini routines. Pick each pass skill, switch between 2 and 4 routine mode, and save your setup when you are done.",
  },
  {
    title: "Tumbling",
    subtitle: "Track two full passes or an 8 plus 3 pass setup.",
    meta: "Pass calculator",
    to: "/tumbling",
    icon: Calculator,
    info:
      "Use this for tumbling passes. Choose the pass format, enter each skill, and the pass and total DD values stay visible while you work.",
  },
];

const supportTools = [
  {
    title: "Saved",
    subtitle: "Open, share, and reuse your saved routines.",
    to: "/saved",
    icon: Save,
    info:
      "Saved routines live on this device. Open one to keep editing, copy a share link, or clear them from Settings.",
  },
  {
    title: "Leaderboard",
    subtitle: "Check benchmark DD scores.",
    to: "/leaderboard",
    icon: Trophy,
    info:
      "Leaderboard keeps the higher score examples separate from your saved routines so you can compare without cluttering your own list.",
  },
  {
    title: "Games",
    subtitle: "Practice games for trampoline sessions.",
    to: "/games",
    icon: Gamepad2,
    info:
      "Games are designed for quick phone use at the gym: random skills, routine challenges, bingo, skill race, and connect style games.",
  },
  {
    title: "Settings",
    subtitle: "Theme, reset, links, and common questions.",
    action: "settings",
    icon: Settings,
    info:
      "Settings controls dark mode, saved routine reset, rule links, version info, and common questions about the calculators.",
  },
];

const faqItems = [
  {
    q: "What is trampoline DD?",
    a:
      "DD stands for Degree of Difficulty. Each trampoline skill has a difficulty value based on flips, twists, and body position.",
  },
  {
    q: "How does the trampoline calculator work?",
    a:
      "The calculator adds the difficulty values of each skill in your routine to calculate a total DD score.",
  },
  {
    q: "What is Double Mini?",
    a:
      "Double Mini Trampoline is a gymnastics event where athletes perform two connected skills on a small trampoline runway.",
  },
  {
    q: "How is tumbling scored?",
    a:
      "Tumbling scores are based on difficulty, execution, and completion of connected tumbling passes.",
  },
  {
    q: "Is this based on FIG rules?",
    a:
      "The calculator uses FIG and Gymnastics Canada difficulty values and pathways where possible.",
  },
];

function ToolCard({
  item,
  compact = false,
  onInfo,
  onSettings,
}) {
  const Icon = item.icon;

  const cardContent = (
    <>
      <div className="home-card-icon">
        <Icon size={compact ? 23 : 28} />
      </div>

      <div className="home-card-copy">
        {item.meta && (
          <div className="home-card-meta">
            {item.meta}
          </div>
        )}

        <div className="home-card-title">
          {item.title}
        </div>

        <div className="home-card-subtitle">
          {item.subtitle}
        </div>
      </div>

      <ChevronRight
        className="home-card-arrow"
        size={22}
      />
    </>
  );

  const openInfo = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onInfo(item);
  };

  return (
    <div
      className={
        compact
          ? "home-tool-card home-tool-card-compact"
          : "home-tool-card"
      }
    >
      {item.to ? (
        <Link
          to={item.to}
          className="home-tool-link"
        >
          {cardContent}
        </Link>
      ) : (
        <button
          className="home-tool-link home-tool-button"
          onClick={onSettings}
          type="button"
        >
          {cardContent}
        </button>
      )}

      <button
        className="home-info-button"
        onClick={openInfo}
        type="button"
        aria-label={`Information about ${item.title}`}
        title={`Information about ${item.title}`}
      >
        <CircleHelp size={19} />
      </button>
    </div>
  );
}

function HomeScreen() {
  const [settingsOpen, setSettingsOpen] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const [faqOpen, setFaqOpen] =
    useState(false);

  const [openQuestion, setOpenQuestion] =
    useState(null);

  const [infoItem, setInfoItem] =
    useState(null);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <>
      <Helmet>
        <title>
          Tramp Calc | Trampoline DD Calculator & Gymnastics Tools
        </title>

        <meta
          name="description"
          content="Trampoline DD calculator, double mini calculator, tumbling tools, routine builders, trampoline games, and gymnastics scoring tools."
        />

        <meta
          name="keywords"
          content="trampoline calculator, trampoline DD, double mini calculator, tumbling calculator, gymnastics difficulty calculator, trampoline scoring"
        />
      </Helmet>

      <main className="home-shell">
        <section className="home-hero">
          <div className="home-kicker">
            Tramp Calc
          </div>

          <h1 className="home-title">
            Gymnastics Calculator
          </h1>

          <p className="home-subtitle">
            Faster DD checks, cleaner routine building, and gym games made for one hand on a phone.
          </p>
        </section>

        <section
          className="home-section"
          aria-label="Calculators"
        >
          <div className="home-section-heading">
            <span>
              Calculators
            </span>

            <span>
              Pick your event
            </span>
          </div>

          <div className="home-primary-grid">
            {primaryTools.map((item) => (
              <ToolCard
                key={item.title}
                item={item}
                onInfo={setInfoItem}
              />
            ))}
          </div>
        </section>

        <section
          className="home-section"
          aria-label="More tools"
        >
          <div className="home-section-heading">
            <span>
              More
            </span>

            <span>
              Routines, games, and app controls
            </span>
          </div>

          <div className="home-support-grid">
            {supportTools.map((item) => (
              <ToolCard
                key={item.title}
                item={item}
                compact
                onInfo={setInfoItem}
                onSettings={() =>
                  setSettingsOpen(true)
                }
              />
            ))}
          </div>
        </section>

        <footer className="home-footer">
          <a
            href="https://www.gymbc.org/media/qb5g331q/2025_tg_canadian_pathways_en_v6_march-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            Canadian Pathways PDF
          </a>

          <a
            href="https://www.gymbc.org/media/1wbnaeax/fig-tra-cop-2025-2028.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            FIG Code of Points PDF
          </a>

          <p>
            Created by Jackson Cann{" "}
            <a
              href="https://www.instagram.com/jcanflip"
              target="_blank"
              rel="noopener noreferrer"
            >
              @jcanflip
            </a>
          </p>
        </footer>
      </main>

      {infoItem && (
        <div className="app-modal-overlay">
          <div className="app-info-modal">
            <button
              className="app-modal-icon-button"
              onClick={() => setInfoItem(null)}
              type="button"
              aria-label="Close information"
            >
              <X size={20} />
            </button>

            <div className="app-modal-mark">
              <BookOpen size={24} />
            </div>

            <h2>
              {infoItem.title}
            </h2>

            <p>
              {infoItem.info}
            </p>

            <button
              className="app-modal-primary"
              onClick={() => setInfoItem(null)}
              type="button"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {settingsOpen && (
        <div className="app-modal-overlay">
          <div className="settings-modal">
            <button
              className="app-modal-icon-button"
              onClick={() => setSettingsOpen(false)}
              type="button"
              aria-label="Close settings"
            >
              <X size={20} />
            </button>

            <h2>
              Settings
            </h2>

            <div className="settings-row">
              <span>
                Show Skill Names
              </span>

              <button
                className="settings-button"
                type="button"
              >
                Soon
              </button>
            </div>

            <div className="settings-row">
              <span>
                Dark Mode
              </span>

              <button
                className={
                  darkMode
                    ? "settings-button settings-button-active"
                    : "settings-button"
                }
                onClick={() =>
                  setDarkMode(!darkMode)
                }
                type="button"
              >
                {darkMode
                  ? "Enabled"
                  : "Disabled"}
              </button>
            </div>

            <div className="settings-row">
              <span>
                Reset Saved Routines
              </span>

              <button
                className="settings-delete-button"
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
                type="button"
              >
                Reset
              </button>
            </div>

            <button
              onClick={() =>
                setFaqOpen(!faqOpen)
              }
              className="settings-wide-button"
              type="button"
            >
              {faqOpen
                ? "Hide Questions"
                : "Common Questions"}
            </button>

            {faqOpen && (
              <div className="settings-faq-list">
                {faqItems.map((item, index) => (
                  <div
                    key={item.q}
                    className="settings-faq-item"
                  >
                    <button
                      onClick={() =>
                        setOpenQuestion(
                          openQuestion === index
                            ? null
                            : index
                        )
                      }
                      className="settings-faq-question"
                      type="button"
                    >
                      {item.q}
                    </button>

                    {openQuestion === index && (
                      <p>
                        {item.a}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <p className="settings-version">
              Version 13.5.26
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<HomeScreen />}
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
          path="/snake-ladders"
          element={<SnakeLadders />}
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
