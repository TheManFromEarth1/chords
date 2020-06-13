export const gradesNumerals = {
  major: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
  natural: ["i", "ii°", "III", "iv", "v", "VI", "VII"],
  harmonic: ["i", "ii°", "III+", "iv", "V", "VI", "vii°"],
  melodic: ["i", "ii", "III+", "IV", "V", "vi°", "vii°"],
};

export const gradesOrder = {
  major: [
    { grade: "I", type: "major" },
    { grade: "V", type: "major" },
    { grade: "ii", type: "minor" },
    { grade: "vi", type: "minor" },
    { grade: "iii", type: "minor" },
    { grade: "vii°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "IV", type: "major" },
  ],
  natural: [
    { grade: "i", type: "minor" },
    { grade: "v", type: "minor" },
    { grade: "ii°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "VI", type: "major" },
    { grade: "III", type: "major" },
    { grade: "VII", type: "major" },
    { grade: "iv", type: "minor" },
  ],
  harmonic: [
    { grade: "i", type: "minor" },
    { grade: "V", type: "major" },
    { grade: "ii°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "vii°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "VI", type: "major" },
    { grade: "III+", type: "augmented" },
    { grade: "", type: "none" },
    { grade: "iv", type: "minor" },
  ],
  melodic: [
    { grade: "i", type: "minor" },
    { grade: "V", type: "major" },
    { grade: "ii", type: "minor" },
    { grade: "vi°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "vii°", type: "diminished" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "", type: "none" },
    { grade: "III+", type: "augmented" },
    { grade: "", type: "none" },
    { grade: "IV", type: "major" },
  ],
};

export const chordList = [
  {
    name: "Triads",
    options: [
      {
        name: "Major",
        formula: "M",
      },
      {
        name: "Minor",
        formula: "m",
      },
      {
        name: "Diminished",
        formula: "dim",
      },
      {
        name: "Augmented",
        formula: "aug",
      },
    ],
  },
  {
    name: "Sevenths",
    options: [
      {
        name: "Major 7th",
        formula: "M7",
      },
      {
        name: "Minor 7th",
        formula: "m7",
      },
      {
        name: "Dominant 7th",
        formula: "7",
      },
      {
        name: "Diminished 7th",
        formula: "dim7",
      },
      {
        name: "Half Diminished 7th",
        formula: "m7b5",
      },
      {
        name: "Augmented 7th",
        formula: "aug7",
      },
      {
        name: "Augmented Major 7th",
        formula: "maj7#5",
      },
    ],
  },
  {
    name: "Extended",
    options: [
      {
        name: "Dominant 9th",
        formula: "9",
      },
      {
        name: "Dominant 11th",
        formula: "11",
      },
      {
        name: "Dominant 13th",
        formula: "13",
      },
    ],
  },
  {
    name: "Alterered",
    options: [
      {
        name: "Seventh Augmented 5th",
        formula: "7b13",
      },
      {
        name: "Seventh Minor 9th",
        formula: "7b9b13",
      },
      {
        name: "Seventh Sharp 9th",
        formula: "7#9",
      },
    ],
  },
];

export const keyList = [
  {
    note: "C3",
    enharmonic: "B#2",
    color: "white",
    label: "C",
    enharmoniclabel: "B#",
    midi: 48,
  },
  {
    note: "C#3",
    enharmonic: "Db3",
    color: "black",
    label: "C#",
    enharmoniclabel: "Db",
    midi: 49,
  },
  {
    note: "D3",
    enharmonic: false,
    color: "white",
    label: "D",
    enharmoniclabel: false,
    midi: 50,
  },
  {
    note: "D#3",
    enharmonic: "Eb3",
    color: "black",
    label: "D#",
    enharmoniclabel: "Eb",
    midi: 51,
  },
  {
    note: "E3",
    enharmonic: "Fb3",
    color: "white",
    label: "E",
    enharmoniclabel: "Fb",
    midi: 52,
  },
  {
    note: "F3",
    enharmonic: "E#3",
    color: "white",
    label: "F",
    enharmoniclabel: "E#",
    midi: 53,
  },
  {
    note: "F#3",
    enharmonic: "Gb3",
    color: "black",
    label: "F#",
    enharmoniclabel: "Gb",
    midi: 54,
  },
  {
    note: "G3",
    enharmonic: false,
    color: "white",
    label: "G",
    enharmoniclabel: false,
    midi: 55,
  },
  {
    note: "G#3",
    enharmonic: "Ab3",
    color: "black",
    label: "G#",
    enharmoniclabel: "Ab",
    midi: 56,
    shortcut: "q",
  },
  {
    note: "A3",
    enharmonic: false,
    color: "white",
    label: "A",
    enharmoniclabel: false,
    midi: 57,
    shortcut: "a",
  },
  {
    note: "A#3",
    enharmonic: "Bb3",
    color: "black",
    label: "A#",
    enharmoniclabel: "Bb",
    midi: 58,
    shortcut: "w",
  },
  {
    note: "B3",
    enharmonic: "Cb4",
    color: "white",
    label: "B",
    enharmoniclabel: "Cb",
    midi: 59,
    shortcut: "s",
  },
  {
    note: "C4",
    enharmonic: "B#3",
    color: "white",
    label: "C",
    enharmoniclabel: "B#",
    midi: 48,
    shortcut: "d",
  },
  {
    note: "C#4",
    enharmonic: "Db4",
    color: "black",
    label: "C#",
    enharmoniclabel: "Db",
    midi: 49,
    shortcut: "r",
  },
  {
    note: "D4",
    enharmonic: false,
    color: "white",
    label: "D",
    enharmoniclabel: false,
    midi: 50,
    shortcut: "f",
  },
  {
    note: "D#4",
    enharmonic: "Eb4",
    color: "black",
    label: "D#",
    enharmoniclabel: "Eb",
    midi: 51,
    shortcut: "t",
  },
  {
    note: "E4",
    enharmonic: "Fb4",
    color: "white",
    label: "E",
    enharmoniclabel: "Fb",
    midi: 52,
    shortcut: "g",
  },
  {
    note: "F4",
    enharmonic: "E#4",
    color: "white",
    label: "F",
    enharmoniclabel: "E#",
    midi: 54,
    shortcut: "h",
  },
  {
    note: "F#4",
    enharmonic: "Gb4",
    color: "black",
    label: "F#",
    enharmoniclabel: "Gb",
    midi: 54,
    shortcut: "u",
  },
  {
    note: "G4",
    enharmonic: false,
    color: "white",
    label: "G",
    enharmoniclabel: false,
    midi: 55,
    shortcut: "j",
  },
  {
    note: "G#4",
    enharmonic: "Ab4",
    color: "black",
    label: "G#",
    enharmoniclabel: "Ab",
    midi: 56,
    shortcut: "i",
  },
  {
    note: "A4",
    enharmonic: false,
    color: "white",
    label: "A",
    enharmoniclabel: false,
    midi: 57,
    shortcut: "k",
  },
  {
    note: "A#4",
    enharmonic: "Bb4",
    color: "black",
    label: "A#",
    enharmoniclabel: "Bb",
    midi: 58,
    shortcut: "o",
  },
  {
    note: "B4",
    enharmonic: "Cb5",
    color: "white",
    label: "B",
    enharmoniclabel: "Cb",
    midi: 59,
    shortcut: "l",
  },
  {
    note: "C5",
    enharmonic: "B#4",
    color: "white",
    label: "C",
    enharmoniclabel: "B#",
    midi: 48,
    shortcut: ";",
  },
  {
    note: "C#5",
    enharmonic: "Db5",
    color: "black",
    label: "C#",
    enharmoniclabel: "Db",
    midi: 49,
    shortcut: "[",
  },
  {
    note: "D5",
    enharmonic: false,
    color: "white",
    label: "D",
    enharmoniclabel: false,
    midi: 50,
    shortcut: "'",
  },
  {
    note: "D#5",
    enharmonic: "Eb5",
    color: "black",
    label: "D#",
    enharmoniclabel: "Eb",
    midi: 51,
    shortcut: "]",
  },
  {
    note: "E5",
    enharmonic: "Fb5",
    color: "white",
    label: "E",
    enharmoniclabel: "Fb",
    midi: 52,
  },
  {
    note: "F5",
    enharmonic: "E#5",
    color: "white",
    label: "F",
    enharmoniclabel: "E#",
    midi: 55,
  },
  {
    note: "F#5",
    enharmonic: "Gb5",
    color: "black",
    label: "F#",
    enharmoniclabel: "Gb",
    midi: 54,
  },
  {
    note: "G5",
    enharmonic: false,
    color: "white",
    label: "G",
    enharmoniclabel: false,
    midi: 55,
  },
  {
    note: "G#5",
    enharmonic: "Ab5",
    color: "black",
    label: "G#",
    enharmoniclabel: "Ab",
    midi: 56,
  },
  {
    note: "A5",
    enharmonic: false,
    color: "white",
    label: "A",
    enharmoniclabel: false,
    midi: 57,
  },
  {
    note: "A#5",
    enharmonic: "Bb5",
    color: "black",
    label: "A#",
    enharmoniclabel: "Bb",
    midi: 58,
  },
  {
    note: "B5",
    enharmonic: "Cb6",
    color: "white",
    label: "B",
    enharmoniclabel: "Cb",
    midi: 59,
  },
];