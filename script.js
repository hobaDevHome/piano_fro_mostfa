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
const whiteQuarterControls = document.getElementById("quarter-controls-white");
const blackQuarterControls = document.getElementById("quarter-controls-black");

const startOctave = 1;
const endOctave = 2;
let whiteIndex = 0;

const quarterToneMap = {}; // { noteName (lowercase): true/false }

function createQuarterButton(noteName, targetContainer) {
  const btn = document.createElement("button");
  btn.className = "quarter-button";
  btn.innerText = "💙";
  btn.title = `${noteName} quarter tone`;

  btn.addEventListener("click", () => {
    const lowered = noteName.toLowerCase();
    quarterToneMap[lowered] = !quarterToneMap[lowered];
    btn.classList.toggle("active");
  });

  targetContainer.appendChild(btn);
}

function createKey(container, noteName, isBlack = false, positionLeft = null) {
  const key = document.createElement("div");
  key.classList.add(isBlack ? "black-key" : "white-key");
  key.dataset.note = noteName;

  if (positionLeft !== null) {
    key.style.left = `${positionLeft}px`;
  }

  key.addEventListener("click", playNote);
  container.appendChild(key);
}

// إنشاء المفاتيح البيضاء وزراير الربع تون ليها
for (let octave = startOctave; octave <= endOctave; octave++) {
  whiteNotes.forEach((note) => {
    const fullNote = `${note}${octave}`;
    createQuarterButton(fullNote, whiteQuarterControls);
    createKey(whiteContainer, fullNote, false);

    const blackNote = blackNotesMap[note];
    if (blackNote) {
      const fullBlackNote = `${note}${octave}_d`;
      const leftPosition = whiteIndex * 40 + 40;

      createQuarterButton(fullBlackNote, blackQuarterControls);
      createKey(blackContainer, fullBlackNote, true, leftPosition);
    }

    whiteIndex++;
  });
}

// آخر مفتاح أبيض: C4
createQuarterButton("C3", whiteQuarterControls);
createKey(whiteContainer, "C3", false);

function playNote(e) {
  const key = e.currentTarget;
  const rawNote = key.dataset.note.toLowerCase();
  const isQuarter = quarterToneMap[rawNote];
  const finalNote = isQuarter ? `${rawNote}_q` : rawNote;

  const audio = new Audio(`sounds/${finalNote}.mp3`);
  audio.play();

  key.classList.add("active");
  setTimeout(() => key.classList.remove("active"), 150);
}
