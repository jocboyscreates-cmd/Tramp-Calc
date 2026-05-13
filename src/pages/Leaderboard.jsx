import { useState } from "react";

import { Link } from "react-router-dom";

import { leaderboardData }
from "../data/leaderboardData";

import {
  House,
  Trophy,
  Plus,
} from "lucide-react";

export default function Leaderboard() {

  const [selectedGender, setSelectedGender] =
    useState("Everyone");

  const [selectedEvent, setSelectedEvent] =
    useState("Trampoline");

  const [selectedLevel, setSelectedLevel] =
    useState("All Levels");

  const [submitOpen, setSubmitOpen] =
    useState(false);

  const [submitData, setSubmitData] =
    useState({
      username: "",
      event: "Trampoline",
      level: "",
      gender: "",
      dd: "",
      video: null,
    });

  const filteredData =
    leaderboardData.filter((item) => {

      const genderMatch =
        selectedGender === "Everyone" ||
        item.gender === selectedGender;

      const levelMatch =
        selectedLevel === "All Levels" ||
        item.level === selectedLevel;

      const eventMatch =
        item.event === selectedEvent;

      return (
        genderMatch &&
        levelMatch &&
        eventMatch
      );
    });

  const topThree =
    filteredData.slice(0, 3);

  const remaining =
    filteredData.slice(3);

  return (

    <div style={styles.container}>

      <Link
        to="/"
        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <h1 style={styles.title}>
        Leaderboard
      </h1>

      <div style={styles.filterRow}>

        {[
          "Trampoline",
          "Double Mini",
          "Tumbling",
        ].map((event) => (

          <button
            key={event}

            onClick={() =>
              setSelectedEvent(event)
            }

            style={
              selectedEvent === event
                ? styles.activeFilter
                : styles.filterButton
            }
          >
            {event}
          </button>

        ))}

      </div>

      <div style={styles.filterRow}>

        {[
          "Everyone",
          "Male",
          "Female",
        ].map((gender) => (

          <button
            key={gender}

            onClick={() =>
              setSelectedGender(gender)
            }

            style={
              selectedGender === gender
                ? styles.activeFilter
                : styles.filterButton
            }
          >
            {gender}
          </button>

        ))}

      </div>

      <div style={styles.filterRow}>

        {[
          "All Levels",
          "Level 1",
          "Level 2",
          "Level 3",
          "Level 4",
          "Level 5",
          "Level 6",
          "Level 7",
          "Junior",
          "Senior",
        ].map((level) => (

          <button
            key={level}

            onClick={() =>
              setSelectedLevel(level)
            }

            style={
              selectedLevel === level
                ? styles.activeFilter
                : styles.filterButton
            }
          >
            {level}
          </button>

        ))}

      </div>

      <div style={styles.podium}>

        {topThree[1] && (

          <div
            style={{
              ...styles.podiumCard,
              height: "180px",
            }}
          >

            <div style={styles.place}>
              #2
            </div>

            <div style={styles.username}>
              {topThree[1].username}
            </div>

            <div style={styles.dd}>
              {topThree[1].dd.toFixed(1)}
            </div>

          </div>

        )}

        {topThree[0] && (

          <div style={styles.firstPlace}>

            <Trophy size={42} />

            <div style={styles.place}>
              #1
            </div>

            <div style={styles.username}>
              {topThree[0].username}
            </div>

            <div style={styles.dd}>
              {topThree[0].dd.toFixed(1)}
            </div>

          </div>

        )}

        {topThree[2] && (

          <div
            style={{
              ...styles.podiumCard,
              height: "150px",
            }}
          >

            <div style={styles.place}>
              #3
            </div>

            <div style={styles.username}>
              {topThree[2].username}
            </div>

            <div style={styles.dd}>
              {topThree[2].dd.toFixed(1)}
            </div>

          </div>

        )}

      </div>

      <div style={styles.list}>

        {remaining.map(
          (person, index) => (

            <div
              key={person.username}

              style={styles.row}
            >

              <div>
                #{index + 4}
              </div>

              <div style={styles.rowName}>
                {person.username}
              </div>

              <div>
                {person.level}
              </div>

              <div>
                {person.gender}
              </div>

              <div style={styles.ddSmall}>
                {person.dd.toFixed(1)}
              </div>

            </div>

          )
        )}

      </div>

      <button
        style={styles.submitButton}

        onClick={() =>
          setSubmitOpen(true)
        }
      >

        <Plus size={24} />

        Submit Routine

      </button>

      {submitOpen && (

        <div style={styles.modalOverlay}>

          <div style={styles.submitModal}>

            <h2 style={styles.modalTitle}>
              Submit Routine
            </h2>

            <input
              placeholder="Display Name"

              value={submitData.username}

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  username:
                    e.target.value,
                })
              }

              style={styles.input}
            />

            <select
              value={submitData.event}

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  event:
                    e.target.value,
                })
              }

              style={styles.input}
            >

              <option>
                Trampoline
              </option>

              <option>
                Double Mini
              </option>

              <option>
                Tumbling
              </option>

            </select>

            <select
              value={submitData.level}

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  level:
                    e.target.value,
                })
              }

              style={styles.input}
            >

              <option value="">
                Select Level
              </option>

              <option>
                Level 1
              </option>

              <option>
                Level 2
              </option>

              <option>
                Level 3
              </option>

              <option>
                Level 4
              </option>

              <option>
                Level 5
              </option>

              <option>
                Level 6
              </option>

              <option>
                Level 7
              </option>

              <option>
                Junior
              </option>

              <option>
                Senior
              </option>

            </select>

            <select
              value={submitData.gender}

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  gender:
                    e.target.value,
                })
              }

              style={styles.input}
            >

              <option value="">
                Select Gender
              </option>

              <option>
                Male
              </option>

              <option>
                Female
              </option>

            </select>

            <input
              type="number"

              placeholder="DD"

              value={submitData.dd}

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  dd:
                    e.target.value,
                })
              }

              style={styles.input}
            />

            <label style={styles.uploadLabel}>
              Video of Pass / Routine
            </label>

            <input
              type="file"

              accept="video/*"

              onChange={(e) =>
                setSubmitData({
                  ...submitData,
                  video:
                    e.target.files[0],
                })
              }

              style={styles.input}
            />

            <p style={styles.reviewText}>
              Submissions are manually reviewed
              and may not appear immediately.
            </p>

            <button
              style={
                styles.submitRoutineButton
              }

              onClick={() => {

                if (
                  !submitData.username ||
                  !submitData.level ||
                  !submitData.gender ||
                  !submitData.dd ||
                  !submitData.video
                ) {

                  alert(
                    "Please fill out every field."
                  );

                  return;
                }

                const pending =
                  JSON.parse(
                    localStorage.getItem(
                      "pendingSubmissions"
                    ) || "[]"
                  );

                pending.push(submitData);

                localStorage.setItem(
                  "pendingSubmissions",
                  JSON.stringify(pending)
                );

                alert(
                  "Routine submitted for review!"
                );

                setSubmitOpen(false);

              }}
            >

              Submit

            </button>

            <button
              onClick={() =>
                setSubmitOpen(false)
              }

              style={styles.closeButton}
            >
              Cancel
            </button>

          </div>

        </div>

      )}

    </div>

  );
}

const styles = {

  container: {
    minHeight: "100vh",

    background:
      "var(--bg-primary)",

    padding: "40px 20px",

    color:
      "var(--text-primary)",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",
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

    color:
      "var(--text-primary)",

    textDecoration: "none",

    backdropFilter:
      "blur(10px)",
  },

  title: {
    fontSize: "58px",

    fontWeight: "bold",

    marginTop: "30px",

    marginBottom: "36px",

    textAlign: "center",
  },

  filterRow: {
    display: "flex",

    gap: "12px",

    marginBottom: "22px",

    flexWrap: "wrap",

    justifyContent: "center",
  },

  filterButton: {
    padding: "12px 20px",

    borderRadius: "16px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    cursor: "pointer",

    fontWeight: "600",

    transition:
      "0.2s ease",
  },

  activeFilter: {
    padding: "12px 20px",

    borderRadius: "16px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    cursor: "pointer",

    fontWeight: "bold",
  },

  podium: {
    display: "flex",

    alignItems: "flex-end",

    gap: "22px",

    marginTop: "30px",

    marginBottom: "50px",

    flexWrap: "wrap",

    justifyContent: "center",
  },

  podiumCard: {
    width: "140px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "26px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    gap: "10px",

    backdropFilter:
      "blur(10px)",
  },

  firstPlace: {
    width: "170px",
    height: "240px",

    background:
      "linear-gradient(135deg, rgba(252,175,69,0.25), rgba(255,255,255,0.05))",

    border:
      "1px solid rgba(252,175,69,0.45)",

    borderRadius: "30px",

    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    gap: "14px",

    backdropFilter:
      "blur(12px)",

    boxShadow:
      "0 18px 50px rgba(0,0,0,0.25)",
  },

  place: {
    fontSize: "30px",

    fontWeight: "bold",
  },

  username: {
    fontSize: "24px",

    fontWeight: "bold",

    textAlign: "center",
  },

  dd: {
    fontSize: "28px",

    fontWeight: "bold",

    color:
      "var(--accent)",
  },

  ddSmall: {
    color:
      "var(--accent)",

    fontWeight: "bold",
  },

  list: {
    width: "min(950px, 95vw)",

    display: "flex",

    flexDirection: "column",

    gap: "14px",
  },

  row: {
    display: "grid",

    gridTemplateColumns:
      "70px 1fr 1fr 1fr 100px",

    alignItems: "center",

    padding: "20px",

    background:
      "var(--card-bg)",

    border:
      "1px solid var(--border)",

    borderRadius: "20px",

    backdropFilter:
      "blur(10px)",

    fontSize: "18px",

    gap: "10px",
  },

  rowName: {
    fontWeight: "bold",
  },

  submitButton: {
    marginTop: "40px",

    display: "flex",

    alignItems: "center",

    gap: "12px",

    padding: "18px 28px",

    borderRadius: "20px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontSize: "20px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 12px 30px rgba(0,0,0,0.2)",
  },

  modalOverlay: {
    position: "fixed",

    inset: 0,

    background:
      "rgba(0,0,0,0.55)",

    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    zIndex: 9999,
  },

  submitModal: {
    width: "min(520px, 92vw)",

    maxHeight: "88vh",

    overflowY: "auto",

    background:
      "var(--card-bg)",

    borderRadius: "28px",

    padding: "30px",

    display: "flex",

    flexDirection: "column",

    gap: "18px",

    color:
      "var(--text-primary)",

    border:
      "1px solid var(--border)",

    backdropFilter:
      "blur(12px)",
  },

  modalTitle: {
    fontSize: "34px",

    fontWeight: "bold",

    marginBottom: "8px",
  },

  input: {
    padding: "15px",

    borderRadius: "16px",

    border:
      "1px solid var(--border)",

    background:
      "rgba(255,255,255,0.06)",

    color:
      "var(--text-primary)",

    fontSize: "16px",

    outline: "none",
  },

  uploadLabel: {
    fontSize: "15px",

    color:
      "var(--text-secondary)",
  },

  reviewText: {
    color:
      "var(--text-secondary)",

    fontSize: "14px",

    lineHeight: 1.5,
  },

  submitRoutineButton: {
    padding: "16px",

    borderRadius: "18px",

    border: "none",

    background:
      "var(--accent-glow)",

    color:
      "var(--accent)",

    fontWeight: "bold",

    fontSize: "18px",

    cursor: "pointer",
  },

  closeButton: {
    padding: "15px",

    borderRadius: "18px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color:
      "var(--text-primary)",

    cursor: "pointer",
  },

};