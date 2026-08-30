import { useState } from "react";

import { Link } from "react-router-dom";

import {
  CircleHelp,
  Dice5,
  Disc3,
  Grid3X3,
  House,
  Map,
  Shuffle,
  Users,
  X,
} from "lucide-react";

const games = [
  {
    title: "Dice Skills",
    subtitle: "Random trampoline skills",
    details:
      "Set your max flips, twists, and positions, then roll a random skill prompt for quick turns at practice.",
    to: "/dice-game",
    icon: Dice5,
  },
  {
    title: "Imposter Game",
    subtitle: "Find the fake routine",
    details:
      "Each player privately reveals their word. Most players get the same skill, imposters do not, and the group tries to spot them.",
    to: "/imposter-game",
    icon: Users,
  },
  {
    title: "Bingo",
    subtitle: "Complete trampoline challenges",
    details:
      "Tap squares as you finish challenges. Hold a square on mobile or right click on desktop for the challenge description.",
    to: "/bingo-game",
    icon: Grid3X3,
  },
  {
    title: "Connect 4",
    subtitle: "Connect four trampoline challenges",
    details:
      "Pick a column, attempt the random skill, and keep the piece only when you stick it. First player to connect four wins.",
    to: "/connections-game",
    icon: Disc3,
  },
  {
    title: "Skill Race",
    subtitle: "Snakes and ladders with trampoline skills",
    details:
      "Roll, attempt the skill, and move across the board. Stuck skills move you forward, missed skills move you back.",
    to: "/snake-ladders",
    icon: Map,
  },
  {
    title: "Random Routine",
    subtitle: "Build a routine from random skills",
    details:
      "Choose a difficulty, place random skills into 10 routine slots, and try to build the best routine with limited skips.",
    to: "/random-routine-game",
    icon: Shuffle,
  },
];

export default function Games() {
  const [selectedGame, setSelectedGame] =
    useState(null);

  return (
    <div className="games-hub-shell">
      <Link
        to="/"
        className="desktop-game-nav games-hub-home"
        aria-label="Home"
      >
        <House size={28} />
      </Link>

      <div className="games-hub-header">
        <div className="home-kicker">
          Practice
        </div>

        <h1>
          Games
        </h1>

        <p>
          Quick gym games with clearer rules, better touch targets, and info one tap away.
        </p>
      </div>

      <div className="games-hub-grid">
        {games.map((game) => {
          const Icon = game.icon;

          return (
            <div
              className="games-hub-card"
              key={game.title}
            >
              <Link
                to={game.to}
                className="games-hub-link"
              >
                <div className="games-hub-icon">
                  <Icon size={32} />
                </div>

                <div>
                  <div className="games-hub-title">
                    {game.title}
                  </div>

                  <div className="games-hub-subtitle">
                    {game.subtitle}
                  </div>
                </div>
              </Link>

              <button
                className="home-info-button"
                type="button"
                onClick={() =>
                  setSelectedGame(game)
                }
                aria-label={`Information about ${game.title}`}
                title={`Information about ${game.title}`}
              >
                <CircleHelp size={19} />
              </button>
            </div>
          );
        })}
      </div>

      <div className="game-floating-actions">
        <Link to="/">
          <House size={20} />
          Home
        </Link>

        <button
          type="button"
          onClick={() =>
            setSelectedGame({
              title: "Games",
              details:
                "Pick a game card to start. Use the small info button on any game for a quick rule summary before you play.",
            })
          }
        >
          <CircleHelp size={20} />
          Info
        </button>
      </div>

      {selectedGame && (
        <div className="app-modal-overlay">
          <div className="game-help-modal">
            <button
              className="app-modal-icon-button"
              onClick={() =>
                setSelectedGame(null)
              }
              type="button"
              aria-label="Close information"
            >
              <X size={20} />
            </button>

            <h2>
              {selectedGame.title}
            </h2>

            <p>
              {selectedGame.details}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
