const whiteNotes = ["C", "D", "E", "F", "G", "A", "B"];
const blackNotesMap = {
  C: "C#",
  D: "D#",
  F: "F#",
  G: "G#",
  A: "A#",
};

const whiteContainer = document.getElementById("white-keys");
const blackContainer = document.getElementById("black-keys");

const startOctave = 2;
const endOctave = 3;
let whiteIndex = 0;

const quarterToneMap = {}; // { noteName (lowercase): true/false }

// دالة لإنشاء مفتاح + زر تحكم ربع تون
function createKey(container, noteName, isBlack = false, positionLeft = null) {
  const key = document.createElement("div");
  key.classList.add(isBlack ? "black-key" : "white-key");
  key.dataset.note = noteName;

  if (positionLeft !== null) {
    key.style.left = `${positionLeft}px`;
  }

  const toggle = document.createElement("button");
  toggle.className = "quarter-toggle";
  toggle.innerText = "¼";
  toggle.title = "Quarter tone on/off";

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const lowered = noteName.toLowerCase();
    quarterToneMap[lowered] = !quarterToneMap[lowered];
    toggle.classList.toggle("active");
  });

  key.appendChild(toggle);
  key.addEventListener("click", playNote);
  container.appendChild(key);
}

for (let octave = startOctave; octave <= endOctave; octave++) {
  whiteNotes.forEach((note) => {
    const fullNote = `${note}${octave}`;
    createKey(whiteContainer, fullNote, false);

    const blackNote = blackNotesMap[note];
    if (blackNote) {
      const fullBlackNote = `${note}${octave}_d`;
      const leftPosition = whiteIndex * 40 + 28;
      createKey(blackContainer, fullBlackNote, true, leftPosition);
    }

    whiteIndex++;
  });
}

// إضافة C4
createKey(whiteContainer, "C4", false);

function playNote(e) {
  const key = e.currentTarget;
  const rawNote = key.dataset.note.toLowerCase();
  const isQuarter = quarterToneMap[rawNote];
  const finalNote = isQuarter ? `${rawNote}_q` : rawNote;

  const audio = new Audio(`sounds/${finalNote}.mp3`);
  audio.play();

  key.classList.add("active");
  setTimeout(() => key.classList.remove("active"), 150);
  console.log("Playing:", finalNote);
}
