import { useState } from "react"
import { Link } from "react-router-dom"
import { House } from "lucide-react"
import { Check } from "lucide-react"
import { X } from "lucide-react"
import Confetti from "react-confetti"

export default function SnakeLadders() {

const [gameStarted, setGameStarted] =
  useState(false)

const [players, setPlayers] =
  useState(2)



  const [currentPlayer, setCurrentPlayer] =
  useState(0)

  const [positions, setPositions] =
  useState(
    Array(8).fill(0)
  )

  const [dice, setDice] =
  useState(null)

const [rolling, setRolling] =
  useState(false)

  const [currentSkill, setCurrentSkill] =
  useState("")

  const [waitingForAnswer, setWaitingForAnswer] =
  useState(false)

const playerColours = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
  "#14b8a6",
  "#ec4899",
]

const playerNames = [
  "Red",
  "Blue",
  "Green",
  "Yellow",
  "Purple",
  "Orange",
  "Teal",
  "Pink",
]


const [snakes, setSnakes] =
  useState([])

const [ladders, setLadders] =
  useState([])

const [winner, setWinner] =
  useState(null)


const squareToPosition = (square) => {

  const row = Math.floor((square - 1) / 10)

  let col = (square - 1) % 10

  if (row % 2 === 1) {

    col = 9 - col

  }

  return {

    x: col * 65 + 32,

    y: (9 - row) * 65 + 32,

  }

}

const generateBoard = () => {

  const used = new Set()

  const newSnakes = []

  const newLadders = []

  const snakeCount =
  Math.floor(Math.random() * 3) + 1

const ladderCount =
  Math.floor(Math.random() * 3) + 1

  const randomSquare = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min

  while (newSnakes.length < snakeCount) {

    const start = randomSquare(55, 98)

    const end = randomSquare(
      Math.max(2, start - 45),
      start - 18
    )

    if (
      used.has(start) ||
      used.has(end)
    ) continue

    used.add(start)
    used.add(end)

    newSnakes.push({
      start,
      end,
    })

  }

  while (newLadders.length < ladderCount) {

    const start = randomSquare(2, 55)

    const end = randomSquare(
      start + 18,
      Math.min(98, start + 45)
    )

    if (
      used.has(start) ||
      used.has(end)
    ) continue

    used.add(start)
    used.add(end)

    newLadders.push({
      start,
      end,
    })

  }

  setSnakes(newSnakes)

  setLadders(newLadders)

}

const skillLevels = {

  1: [
    "Tuck Jump",
    "Straddle Jump",
    "Pike Jump",
    "Half Turn",
    "Full Turn",
  ],

  2: [
    "Tuck Half Turn",
    "1 1/2 Turn",
    "Pike Half Turn",
    "Tuck Full Turn",
  ],

  3: [
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
  ],

  4: [
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
  ],

  5: [
    "Rudy",
    "Back Full",
    "Back Half",
    "Double Full Twist",
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
  ],

  6: [
    "Rudy",
    "Back Full",
    "Back Half",
    "Double Full Twist",
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
  ],

  7: [
    "Rudy",
    "Back Full",
    "Back Half",
    "Double Full Twist",
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
  ],

  8: [
    "Skill 1",
    "Skill 2",
    "Skill 3",
  ],

  9: [
    "Half Out Tuck",
    "Half Out Pike",
    "Rudy",
    "Back Full",
    "Back Half",
    "Double Full Twist",
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
  ],

  10: [
    "Half Out Tuck",
    "Half Out Pike",
    "Rudy",
    "Back Full",
    "Back Half",
    "Double Full Twist",
    "Barani Tuck",
    "Barani Pike",
    "Barani Straight",
    "Front Tuck",
    "Front Pike",
    "Front Straight",
    "Back Tuck",
    "Back Pike",
    "Back Straight",
    "Back Full",
    "Tuck Half Turn",
    "1 1/2 Turn",
    "Pike Half Turn",
    "Tuck Full Turn",
    "Tuck Jump",
    "Straddle Jump",
    "Pike Jump",
    "Half Turn",
    "Full Turn",
  ],

}

const getRandomSkill = () => {

  const square = Math.max(
    1,
    positions[currentPlayer]
  )

  const level =
  Math.max(
    1,
    Math.min(
      10,
      Math.ceil(square / 10)
    )
  )

  const skills =
    skillLevels[level]

  return skills[
    Math.floor(
      Math.random() *
      skills.length
    )
  ]

}

const rollDice = () => {

  setRolling(true)

  setTimeout(() => {

    const roll =
      Math.floor(Math.random() * 6) + 1

    setDice(roll)

    setCurrentSkill(
      getRandomSkill()
    )

    setRolling(false)

    setWaitingForAnswer(true)

  }, 800)

}

const endTurn = () => {

  setCurrentPlayer(

    (currentPlayer + 1) % players

  )

  setWaitingForAnswer(false)

  setDice(null)

  setCurrentSkill("")

}

const resetGame = () => {

  setPositions(
    Array(8).fill(0)
  )

  setCurrentPlayer(0)

  setDice(null)

  setRolling(false)

  setCurrentSkill("")

  setWaitingForAnswer(false)

  setSnakes([])

setLadders([])

  setGameStarted(false)

}

const stickSkill = () => {

    

  const newPositions = [...positions]

  let newPosition

  if (newPositions[currentPlayer] === 0) {

    newPosition = dice

  } else {

    newPosition =
      newPositions[currentPlayer] + dice

  }

  if (newPosition > 100) {

    newPosition = 100

  }

  const snakeMap = Object.fromEntries(
  snakes.map(s => [s.start, s.end])
)

const ladderMap = Object.fromEntries(
  ladders.map(l => [l.start, l.end])
)

if (ladderMap[newPosition]) {

  newPosition = ladderMap[newPosition]

}

if (snakeMap[newPosition]) {

  newPosition = snakeMap[newPosition]

}

  newPositions[currentPlayer] = newPosition

setPositions(newPositions)

if (newPosition >= 100) {

  setWinner(currentPlayer)

  return

}

endTurn()

}

const missSkill = () => {

  const newPositions = [...positions]

  let newPosition

  if (newPositions[currentPlayer] === 0) {

    newPosition = 0

  } else {

    newPosition = Math.max(
      1,
      newPositions[currentPlayer] - dice
    )

  }

  const snakeMap = Object.fromEntries(
    snakes.map(s => [s.start, s.end])
  )

  const ladderMap = Object.fromEntries(
    ladders.map(l => [l.start, l.end])
  )

  if (ladderMap[newPosition]) {

    newPosition = ladderMap[newPosition]

  }

  if (snakeMap[newPosition]) {

    newPosition = snakeMap[newPosition]

  }

 newPositions[currentPlayer] = newPosition

setPositions(newPositions)

if (newPosition >= 100) {

  setWinner(currentPlayer)

  return

}

endTurn()
}
if (!gameStarted) {

  return (

    <div style={styles.page}>

        {winner !== null && (

  <Confetti
    recycle={false}
    numberOfPieces={350}
  />

)}

      <Link
        to="/games"
        style={styles.homeButton}
      >
        <House size={28} />
      </Link>

      <h1 style={styles.title}>
        Skill Race
      </h1>

      <p style={styles.subtitle}>
        Stick skills to race across the board!
      </p>

      <div style={styles.menuCard}>

        <div style={styles.cardTitle}>
          Players
        </div>

        <div style={styles.playerGrid}>

          {[2,3,4,5,6,7,8].map(num => (

            <button

              key={num}

              onClick={() =>
  setPlayers(num)
}
              style={{
                ...styles.playerButton,

                background:
                  players === num
                    ? "var(--accent-glow)"
                    : "rgba(255,255,255,0.08)"
              }}

            >

              {num}

            </button>

          ))}

        </div>

        <div style={styles.tokenPreview}>

          {playerColours
            .slice(0, players)
            .map((colour, index) => (

              <div

                key={index}

                style={{
                  ...styles.playerToken,
                  background: colour
                }}

              />

          ))}

        </div>

      
        <button

          style={styles.playButton}

          onClick={() => {

  generateBoard()

  setGameStarted(true)

}}

        >

          Play

        </button>

      </div>

    </div>

  )

}

 return (

  <div style={styles.page}>

    <Link
      to="/games"
      style={styles.homeButton}
    >
      <House size={28} />
    </Link>

    <h1 style={styles.title}>
      Skill Race
    </h1>

    <p style={styles.subtitle}>
      Stick skills to race across the board!
    </p>

    <div style={styles.gameBar}>

      {!waitingForAnswer ? (

        <button

          style={styles.topRollButton}

          disabled={rolling}

          onClick={rollDice}

        >

          {rolling
            ? "🎲 Rolling..."
            : "🎲 Roll Dice"}

        </button>

      ) : (

        <div style={styles.rollResult}>

        <div style={styles.rollDice}>

  <span style={styles.diceEmoji}>
    🎲
  </span>

  <span style={styles.rollNumber}>
    {dice}
  </span>

</div>

          <div style={styles.rollSkill}>

            {currentSkill}

          </div>

         <button

  style={styles.smallStick}

  onClick={stickSkill}

>

  <Check

    size={34}

    strokeWidth={3.5}

  />

</button>

          <button

  style={styles.smallMiss}

  onClick={missSkill}

>

  <X

    size={34}

    strokeWidth={3.5}

  />

</button>

        </div>

      )}

    </div>

    <div style={styles.layout}>

      <div

        style={{

          ...styles.boardCard,

          border: `3px solid ${playerColours[currentPlayer]}`,

          boxShadow: `
            0 0 20px ${playerColours[currentPlayer]},
            0 0 45px ${playerColours[currentPlayer]},
            0 0 80px ${playerColours[currentPlayer]}66
          `,

          transition: "0.3s",

        }}

      >

        <svg

          viewBox="0 0 650 650"

          style={styles.boardOverlay}

        >



        </svg>

  <svg
  viewBox="0 0 650 650"
  style={styles.boardOverlay}
>

              {ladders.map((ladder, index) => {

            const start =
              squareToPosition(ladder.start)

            const end =
              squareToPosition(ladder.end)

            return (

              <g key={index}>

                <line

                  x1={start.x}
                  y1={start.y}

                  x2={end.x}
                  y2={end.y}

                  stroke="rgba(181,101,29,.55)"

                  strokeWidth="12"

                  strokeLinecap="round"

                />

                <circle

                  cx={start.x}

                  cy={start.y}

                  r="11"

                  fill="rgba(120,70,20,.9)"

                />

              </g>

            )

          })}

          {snakes.map((snake, index) => {

            const start =
              squareToPosition(snake.start)

            const end =
              squareToPosition(snake.end)

            const midX =
              (start.x + end.x) / 2

            const midY =
              (start.y + end.y) / 2

            const curve =
              index % 2 === 0
                ? 60
                : -60

            return (

              <g key={index}>

                <path

                  d={`
                    M ${start.x} ${start.y}
                    Q ${midX + curve} ${midY}
                    ${end.x} ${end.y}
                  `}

                  fill="none"

                  stroke="rgba(34,197,94,.45)"

                  strokeWidth="14"

                  strokeLinecap="round"

                />

                <circle

                  cx={start.x}

                  cy={start.y}

                  r="12"

                  fill="rgba(34,197,94,.65)"

                />

              </g>

            )

          })}

        </svg>

        <div style={styles.board}>

          {Array.from({ length: 10 }).map((_, row) => {

            const start = (9 - row) * 10 + 1

            let numbers = Array.from(
              { length: 10 },
              (_, i) => start + i
            )

            if (row % 2 === 0) {

              numbers.reverse()

            }

            return numbers.map(number => (

              <div

                key={number}

                style={styles.square}

              >

                <div style={styles.squareNumber}>

                  {number}

                </div>

                <div

                  style={{

                    display: "flex",

                    flexWrap: "wrap",

                    justifyContent: "center",

                    gap: 2,

                    marginTop: "auto",

                  }}

                >

                  {positions.map((position, player) => (

                    position === number && (

                      <div

                        key={player}

                        style={{

                          width: 16,

                          height: 16,

                          borderRadius: "50%",

                          background:
                            playerColours[player],

                          border: "2px solid white",

                        }}

                      />

                    )

                  ))}

                </div>

              </div>

            ))

          })}

        </div>

      </div>

    </div>

          <div

        style={{

          display: "flex",

          justifyContent: "center",

          marginTop: 20,

        }}

      >

        <button

          style={styles.newGameButton}

          onClick={() => {

            if (
              window.confirm(
                "Start a new game?"
              )
            ) {

              resetGame()

            }

          }}

        >

          🎮 New Game

        </button>

      </div>

      {winner !== null && (

        <div style={styles.popupBackground}>

          <Confetti
            recycle={false}
            numberOfPieces={350}
          />

          <div style={styles.popup}>

            <div

              style={{

                ...styles.popupToken,

                background:
                  playerColours[winner],

                boxShadow: `
                  0 0 20px ${playerColours[winner]},
                  0 0 40px ${playerColours[winner]},
                  0 0 70px ${playerColours[winner]}
                `,

              }}

            />

            <h2

              style={{

                color:
                  playerColours[winner],

                marginBottom: 10,

              }}

            >

              {playerNames[winner]} Wins!

            </h2>

            <p

              style={{

                color:
                  "var(--text-secondary)",

                marginBottom: 30,

              }}

            >

              You reached square 100!

            </p>

            <button

              style={styles.playButton}

              onClick={() => {

                setWinner(null)

                resetGame()

              }}

            >

              Play Again

            </button>

          </div>

        </div>

      )}

    </div>

  )

}


const styles = {

  page: {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    padding: "30px"
  },

  homeButton: {
    position: "absolute",
    top: 20,
    left: 20,
    width: 54,
    height: 54,
    borderRadius: 16,
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--text-primary)",
    textDecoration: "none"
  },

  title: {
    textAlign: "center",
    fontSize: 52,
    marginBottom: 8
  },

  subtitle: {
    textAlign: "center",
    color: "var(--text-secondary)",
    marginBottom: 30
  },

  layout: {

  display: "flex",

  justifyContent: "center",

},

 boardCard: {

  position: "relative",

  width: "min(calc(100vw - 40px), 680px)",

  background: "var(--card-bg)",

  border: "1px solid var(--border)",

  borderRadius: 24,

  padding: 15,

},

  boardOverlay: {

  position: "absolute",

  inset: 15,

  width: "calc(100% - 30px)",

  height: "calc(100% - 30px)",

  pointerEvents: "none",

  zIndex: 1,

},

 board: {

  display: "grid",

  gridTemplateColumns: "repeat(10, 1fr)",

  gap: 4,

  width: "100%",

  aspectRatio: "1",

},

  square: {

  width: "100%",

aspectRatio: "1",

  borderRadius: 10,

  background: "rgba(255,255,255,0.05)",

  border: "1px solid var(--border)",

  display: "flex",

  flexDirection: "column",

  padding: 5,

  boxSizing: "border-box",

},

  squareNumber: {
    fontSize: 12,
    color: "var(--text-secondary)"
  },


homeArea: {

  width: 140,

  display: "flex",

  flexDirection: "column",

  gap: 14,

  paddingTop: 20,

},

homeTitle: {

  fontSize: 24,

  fontWeight: "bold",

  textAlign: "center",

  marginBottom: 10,

},



homePlayer: {

  display: "flex",

  alignItems: "center",

  gap: 12,

  background: "var(--card-bg)",

  border: "1px solid var(--border)",

  borderRadius: 14,

  padding: "10px 14px",

},

homeToken: {

  width: 22,

  height: 22,

  borderRadius: "50%",

  border: "2px solid white",

},

  sidebar: {
    width: 260,
    display: "flex",
    flexDirection: "column",
    gap: 18
  },

  card: {
    background: "var(--card-bg)",
    border: "1px solid var(--border)",
    borderRadius: 20,
    padding: 20
  },

  cardTitle: {
    marginTop: 0,
    marginBottom: 15
  },

  dice: {
    fontSize: 60,
    textAlign: "center",
    marginBottom: 20
  },

  rollButton: {
    width: "100%",
    padding: 15,
    border: "none",
    borderRadius: 14,
    background: "var(--accent-glow)",
    color: "var(--accent)",
    fontWeight: "bold",
    cursor: "pointer"
  },

  resetButton: {
    width: "100%",
    padding: 15,
    border: "none",
    borderRadius: 14,
    background: "#ef4444",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
  },

  menuCard: {
  width: 450,
  margin: "auto",
  background: "var(--card-bg)",
  border: "1px solid var(--border)",
  borderRadius: 28,
  padding: 30,
  display: "flex",
  flexDirection: "column",
  gap: 22
},

playerGrid: {
  display: "grid",
  gridTemplateColumns: "repeat(4,1fr)",
  gap: 12
},

playerButton: {
  padding: 14,
  border: "none",
  borderRadius: 14,
  color: "var(--text-primary)",
  fontWeight: "bold",
  cursor: "pointer"
},

tokenPreview: {
  display: "flex",
  justifyContent: "center",
  gap: 14
},

playerToken: {
  width: 24,
  height: 24,
  borderRadius: "50%",
  border: "2px solid rgba(255,255,255,0.3)"
},

diffRow: {
  display: "flex",
  gap: 12
},

playButton: {
  padding: 18,
  border: "none",
  borderRadius: 16,
  background: "var(--accent-glow)",
  color: "var(--accent)",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer"
},

skillTitle: {
  fontSize: 24,
  fontWeight: "bold",
  marginTop: 20,
  marginBottom: 12,
  textAlign: "center"
},

skillBox: {
  background: "rgba(255,255,255,0.08)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: 18,
  textAlign: "center",
  fontSize: 22,
  fontWeight: "bold",
  color: "var(--accent)",
  marginBottom: 18
},

answerButtons: {
  display: "flex",
  flexDirection: "column",
  gap: 12
},

stickButton: {
  padding: "16px",
  border: "none",
  borderRadius: 14,
  background: "#22c55e",
  color: "white",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  transition: "0.2s"
},

missButton: {
  padding: "16px",
  border: "none",
  borderRadius: 14,
  background: "#ef4444",
  color: "white",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  transition: "0.2s"
},

popupBackground: {

  position: "fixed",

  inset: 0,

  background: "rgba(0,0,0,.6)",

  display: "flex",

  justifyContent: "center",

  alignItems: "center",

  zIndex: 1000,

},

popup: {

  width: 420,

  background: "var(--card-bg)",

  border: "1px solid var(--border)",

  borderRadius: 24,

  padding: 35,

  textAlign: "center",

},

popupToken: {

  width: 90,

  height: 90,

  borderRadius: "50%",

  margin: "0 auto 25px",

},

homeTokens: {

  display: "flex",

  justifyContent: "center",

  flexWrap: "wrap",

  gap: 12,

},

homeToken: {

  width: 22,

  height: 22,

  borderRadius: "50%",

  border: "2px solid white",

},

gameBar: {

  width: "min(calc(100vw - 40px),680px)",

  margin: "0 auto 20px",

},

topRollButton: {

  width: "100%",

  padding: 22,

  borderRadius: 18,

  border: "none",

  background: "var(--accent-glow)",

  color: "var(--accent)",

  fontSize: 26,

  fontWeight: "bold",

  cursor: "pointer",

},

rollResult: {

  display: "grid",

  gridTemplateColumns: "120px 1fr 80px 80px",

  alignItems: "center",

  gap: 15,

  background: "var(--card-bg)",

  border: "1px solid var(--border)",

  borderRadius: 18,

  padding: 18,

},

rollDice: {

  display: "flex",

  alignItems: "center",

  gap: 14,

},

diceEmoji: {

  fontSize: 46,

},

rollNumber: {

  fontSize: 54,

  fontWeight: "bold",

  lineHeight: 1,

},

rollSkill: {

  fontSize: 24,

  fontWeight: "bold",

  color: "var(--accent)",

},

smallStick: {

  width: 70,

  height: 70,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  border: "none",

  borderRadius: 18,

  background: "#22c55e",

  color: "white",

  boxShadow: "0 0 20px rgba(34,197,94,.6)",

  cursor: "pointer",

},

smallMiss: {

  width: 70,

  height: 70,

  display: "flex",

  alignItems: "center",

  justifyContent: "center",

  border: "none",

  borderRadius: 18,

  background: "#ef4444",

  color: "white",

  boxShadow: "0 0 20px rgba(239,68,68,.6)",

  cursor: "pointer",

},

}