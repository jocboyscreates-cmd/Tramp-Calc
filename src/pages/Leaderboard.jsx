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

  const topThree = filteredData.slice(0, 3);

  const remaining =
    filteredData.slice(3);

  return (

    <div style={styles.container}>

      <Link
        to="/"
        style={styles.homeButton}
      >
        <House size={30} />
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

        <button
          onClick={() =>
            setSelectedGender("Everyone")
          }

          style={
            selectedGender === "Everyone"

              ? styles.activeFilter

              : styles.filterButton
          }
        >
          Everyone
        </button>

        <button
          onClick={() =>
            setSelectedGender("Male")
          }

          style={
            selectedGender === "Male"

              ? styles.activeFilter

              : styles.filterButton
          }
        >
          Male
        </button>

        <button
          onClick={() =>
            setSelectedGender("Female")
          }

          style={
            selectedGender === "Female"

              ? styles.activeFilter

              : styles.filterButton
          }
        >
          Female
        </button>

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
              height: "170px",
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
          <div
            style={{
              ...styles.firstPlace,
            }}
          >

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
              height: "140px",
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

              <div>
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

      <h2>
        Submit Routine
      </h2>

      <input
        placeholder="Display Name"

        value={submitData.username}

        onChange={(e) =>
          setSubmitData({
            ...submitData,
            username: e.target.value,
          })
        }

        style={styles.input}
      />

      <select
        value={submitData.event}

        onChange={(e) =>
          setSubmitData({
            ...submitData,
            event: e.target.value,
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
            level: e.target.value,
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
            gender: e.target.value,
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
            dd: e.target.value,
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
        style={styles.submitRoutineButton}

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
      "linear-gradient(135deg, #0f172a, #1e293b)",

    padding: "30px",

    color: "white",

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

    borderRadius: "14px",

    color: "black",

    textDecoration: "none",
  },

  title: {
    fontSize: "52px",

    marginTop: "40px",

    marginBottom: "30px",
  },

  filterRow: {
    display: "flex",

    gap: "12px",

    marginBottom: "40px",

    flexWrap: "wrap",

    justifyContent: "center",
  },

  filterButton: {
    padding: "12px 20px",

    borderRadius: "14px",

    border: "none",

    background:
      "rgba(255,255,255,0.08)",

    color: "white",

    cursor: "pointer",
  },

  activeFilter: {
    padding: "12px 20px",

    borderRadius: "14px",

    border: "none",

    background:
      "rgba(192,132,252,0.35)",

    color: "white",

    cursor: "pointer",
  },

  podium: {
    display: "flex",

    alignItems: "flex-end",

    gap: "20px",

    marginBottom: "50px",

    flexWrap: "wrap",

    justifyContent: "center",
  },

  podiumCard: {
    width: "120px",

    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.1)",

    borderRadius: "22px",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",

    gap: "10px",

    backdropFilter: "blur(10px)",
  },

  firstPlace: {
    width: "140px",
    height: "220px",

    background:
      "linear-gradient(135deg, rgba(250,204,21,0.35), rgba(255,255,255,0.08))",

    border:
      "1px solid rgba(250,204,21,0.4)",

    borderRadius: "24px",

    display: "flex",
    flexDirection: "column",

    alignItems: "center",
    justifyContent: "center",

    gap: "12px",

    backdropFilter: "blur(10px)",

    boxShadow:
      "0 20px 50px rgba(0,0,0,0.35)",
  },

  place: {
    fontSize: "28px",

    fontWeight: "bold",
  },

  username: {
    fontSize: "22px",

    fontWeight: "bold",
  },

  dd: {
    fontSize: "24px",

    color: "#facc15",

    fontWeight: "bold",
  },

  list: {
    width: "min(900px, 95vw)",

    display: "flex",
    flexDirection: "column",

    gap: "12px",
  },

  row: {
    display: "grid",

    gridTemplateColumns:
      "80px 1fr 1fr 1fr 100px",

    alignItems: "center",

    padding: "18px 22px",

    background:
      "rgba(255,255,255,0.08)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "18px",

    backdropFilter: "blur(10px)",

    fontSize: "18px",
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
      "rgba(192,132,252,0.35)",

    color: "white",

    fontSize: "20px",

    fontWeight: "bold",

    cursor: "pointer",

    boxShadow:
      "0 10px 30px rgba(0,0,0,0.35)",
  },

  modalOverlay: {
  position: "fixed",

  inset: 0,

  background:
    "rgba(0,0,0,0.5)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 9999,
},

submitModal: {
  width: "min(500px, 92vw)",

  maxHeight: "85vh",

overflowY: "auto",

overscrollBehavior: "contain",

  background:
    "linear-gradient(135deg, #111827, #1e293b)",

  borderRadius: "24px",

  padding: "30px",

  display: "flex",

  flexDirection: "column",

  gap: "18px",

  color: "white",

  border:
    "1px solid rgba(255,255,255,0.08)",
},

input: {
  padding: "14px",

  borderRadius: "14px",

  border: "none",

  fontSize: "16px",
},

submitRoutineButton: {
  padding: "16px",

  borderRadius: "16px",

  border: "none",

  background:
    "rgba(192,132,252,0.5)",

  color: "white",

  fontWeight: "bold",

  fontSize: "18px",

  cursor: "pointer",
},

closeButton: {
  padding: "14px",

  borderRadius: "14px",

  border: "none",

  background:
    "rgba(255,255,255,0.1)",

  color: "white",

  cursor: "pointer",
},
uploadLabel: {
  fontSize: "15px",

  color: "#cbd5e1",

  marginBottom: "-10px",
},

};