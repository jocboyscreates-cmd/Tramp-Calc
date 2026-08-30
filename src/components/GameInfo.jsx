import { useState } from "react";

import { Link } from "react-router-dom";

import {
  CircleHelp,
  House,
  X,
} from "lucide-react";

export default function GameInfo({
  title,
  children,
  backTo = "/games",
  backLabel = "Games",
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <button
        className="game-page-info-button"
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Information about ${title}`}
        title={`Information about ${title}`}
      >
        <CircleHelp size={22} />
      </button>

      <div className="game-floating-actions">
        <Link to={backTo}>
          <House size={20} />
          {backLabel}
        </Link>

        <button
          type="button"
          onClick={() => setOpen(true)}
        >
          <CircleHelp size={20} />
          Info
        </button>
      </div>

      {open && (
        <div className="app-modal-overlay">
          <div className="game-help-modal">
            <button
              className="app-modal-icon-button"
              onClick={() => setOpen(false)}
              type="button"
              aria-label="Close information"
            >
              <X size={20} />
            </button>

            <h2>
              {title}
            </h2>

            <p>
              {children}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
