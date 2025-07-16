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

// من C2 إلى B3
for (let octave = startOctave; octave <= endOctave; octave++) {
  whiteNotes.forEach((note) => {
    const fullNote = `${note}${octave}`;
    const whiteKey = document.createElement("div");
    whiteKey.classList.add("white-key");
    whiteKey.dataset.note = fullNote;
    whiteKey.addEventListener("click", playNote);
    whiteContainer.appendChild(whiteKey);

    const blackNote = blackNotesMap[note];
    if (blackNote) {
      const fullBlackNote = `${note}${octave}_d`; // new naming: e.g., c2_d
      const blackKey = document.createElement("div");
      blackKey.classList.add("black-key");
      blackKey.dataset.note = fullBlackNote;
      blackKey.style.left = `${whiteIndex * 40 + 28}px`;
      blackKey.addEventListener("click", playNote);
      blackContainer.appendChild(blackKey);
    }

    whiteIndex++;
  });
}

// نضيف C4
const finalKey = document.createElement("div");
finalKey.classList.add("white-key");
finalKey.dataset.note = "C4";
finalKey.addEventListener("click", playNote);
whiteContainer.appendChild(finalKey);

function playNote(e) {
  const note = e.target.dataset.note.toLowerCase(); // make everything lowercase
  const audio = new Audio(`sounds/${note}.mp3`);
  audio.play();

  e.target.classList.add("active");
  setTimeout(() => e.target.classList.remove("active"), 150);
}
