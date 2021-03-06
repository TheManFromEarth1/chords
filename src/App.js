import React, { useState, useRef, useEffect, useReducer } from "react";
import { Sampler, Part, Transport } from "tone";
import { Chord, Note, Key } from "@tonaljs/tonal";
import * as ChordDetect from "@tonaljs/chord-detect";
import {
  getRootAndFormula,
  sortAlpha,
  pitchedNotes,
  pitchedNotesFromKey,
} from "./utils/Utils";
import {
  useLocalStorage,
  useLocallyPersistedReducer,
} from "./utils/LocalStorage";

import { Wheel } from "./components/wheel/Wheel";
import { Keys } from "./components/keys/Keys";
import { Piano } from "./components/piano/Piano";
import { Chords } from "./components/chords/Chords";
import { ChordProg } from "./components/progs/Progs";
import { Nav } from "./components/nav/Nav";
import { Staff } from "./components/staff/Staff";
import { Wave } from "./components/wave/Wave";

import { keyList } from "./utils/Lists";
import "./css/style.scss";

function App() {
  // ===== Synth ===== //
  const synth = useRef(null);
  const defaultVolume = -4;
  const [synthLoaded, setsynthLoaded] = useState(false);
  const [volume, setVolume] = useLocalStorage("volume", defaultVolume);
  const [mute, setMute] = useLocalStorage("mute", false);

  const [autoplaying, setAutoplaying] = useState(false);
  const [pianoLocked, setPianoLocked] = useLocalStorage("pianoLocked", false);
  const [showShortcuts, setShowShortcuts] = useLocalStorage(
    "showShortcuts",
    false
  );

  useEffect(() => {
    synth.current = new Sampler(
      {
        C3: "C3v8.mp3",
        C4: "C4v8.mp3",
        C5: "C5v8.mp3",
        C6: "C6v8.mp3",
        "F#3": "Fs3v8.mp3",
        "F#4": "Fs4v8.mp3",
        "F#5": "Fs5v8.mp3",
        "F#6": "Fs6v8.mp3",
        A3: "A3v8.mp3",
        A4: "A4v8.mp3",
        A5: "A5v8.mp3",
        A6: "A6v8.mp3",
      },
      {
        volume: -2,
        // mute: mute,
        release: 1.2,
        baseUrl: window.location.hostname.includes("localhost")
          ? process.env.PUBLIC_URL + "/samples/"
          : "https://updownupdown.github.io/chords/samples/",
        onload: () => {
          setsynthLoaded(true);
        },
      }
    ).toDestination();
    // Tone.context.resume();
  }, []);

  // useEffect(() => {
  //   synth.current.volume.value = volume;
  // }, [volume]);

  // useEffect(() => {
  //   synth.current.volume.mute = true;
  // }, [mute]);

  // ===== Notes ===== //
  const [selected, setSelected] = useLocallyPersistedReducer(
    selectedReducer,
    {
      notes: [],
      cat: "notes",
    },
    "selectedNotes"
  );

  function selectedReducer(selected, action) {
    switch (action.type) {
      case "add":
        return { notes: [...selected.notes, action.note], cat: action.cat };
      case "remove":
        return {
          notes: selected.notes.filter((note) => note !== action.note),
          cat: action.cat,
        };
      case "select":
        return { notes: action.notes, cat: action.cat };
      case "clear":
        return { notes: [], cat: action.cat };
      default:
        throw new Error();
    }
  }

  // Predict chords on note select change
  useEffect(() => {
    if (autoplaying) return;
    const chords = ChordDetect.detect(selected.notes).sort(sortAlpha);
    setChordDetect(chords);
  }, [selected, autoplaying]);

  // Toggle selected note (default/enharmonic?/off)
  function toggleNote(index) {
    if (pianoLocked || autoplaying) return;

    const note = keyList[index].note;
    const enharmonic = keyList[index].enharmonic;

    if (enharmonic) {
      if (selected.notes.includes(note)) {
        setSelected({ type: "remove", note: note, cat: "notes" });
        setSelected({ type: "add", note: enharmonic, cat: "notes" });
      } else if (selected.notes.includes(enharmonic)) {
        setSelected({ type: "remove", note: enharmonic, cat: "notes" });
      } else {
        setSelected({ type: "add", note: note, cat: "notes" });
      }
    } else {
      if (selected.notes.includes(note)) {
        setSelected({ type: "remove", note: note, cat: "notes" });
      } else {
        setSelected({ type: "add", note: note, cat: "notes" });
      }
    }
  }

  // Pressed notes on keyboard
  const [pressed, setPressed] = useReducer(pressedReducer, []);
  function pressedReducer(pressed, action) {
    switch (action.type) {
      case "add":
        return [...pressed, action.note];
      case "remove":
        return pressed.filter((note) => note !== action.note);
      case "select":
        return action.notes;
      case "clear":
        return [];
      default:
        throw new Error();
    }
  }

  // ===== Keys ===== //
  const [myKey, setMyKey] = useLocalStorage("myKey", {
    key: Key.majorKey("C"),
    root: "C",
    type: "major",
    subtype: "",
  });

  // Find key
  function getKey(root, type, subtype) {
    var key = {};

    if (type === "major") {
      key = Key.majorKey(root);
    } else if (type === "minor") {
      key = Key.minorKey(root);
    }

    setMyKey({ key: key, root: root, type: type, subtype: subtype });

    !pianoLocked &&
      setSelected({
        type: "select",
        notes: pitchedNotesFromKey(key, type, subtype),
        cat: "key",
      });
  }

  // ====== Chords ===== //
  const [myChord, setMyChord] = useLocalStorage("myChord", {
    chord: Chord.get("CM"),
    root: "C",
    formula: "M",
  });
  const [chordDetect, setChordDetect] = useState("");

  // Get chord
  function getChord(name) {
    const chord = Chord.get(name);
    if (!chord || chord.empty) {
      return;
    }

    const rootAndFormula = getRootAndFormula(chord);

    setMyChord({
      chord: chord,
      root: rootAndFormula.root,
      formula: rootAndFormula.formula,
    });

    !pianoLocked &&
      setSelected({
        type: "select",
        notes: pitchedNotes(chord.notes),
        cat: "chord",
      });
  }

  // ===== Chord Progressions ===== //
  const [myProg, setMyProg] = useLocallyPersistedReducer(
    progReducer,
    [],
    "myProg"
  );
  function progReducer(myProg, action) {
    switch (action.type) {
      case "add":
        return [...myProg, myChord];
      case "copy":
        return [...myProg, myProg[action.index]];
      case "remove":
        return myProg.filter((chord, i) => i !== action.index);
      case "clear":
        return [];
      default:
        throw new Error();
    }
  }

  const [playingProg, setPlayingProg] = useReducer(playingProgReducer, -1);
  function playingProgReducer(playingProg, action) {
    switch (action.type) {
      case "increment":
        return playingProg + 1;
      case "reset":
        return -1;
      default:
        throw new Error();
    }
  }

  // Play single note
  function playNote(note, action, duration = "8n") {
    if (!synthLoaded) return;

    switch (action) {
      case "attack":
        synth.current.triggerAttack(note);
        break;
      case "release":
        synth.current.triggerRelease(note);
        break;
      case "attackrelease":
        synth.current.triggerAttackRelease(note, duration);
        break;
      default:
        throw new Error();
    }
  }

  // Play Piano
  function playPiano(playType, playTogether, playNote) {
    if (!synthLoaded || autoplaying) return;

    var playlist = [];
    var notes = [];
    var delayMs = playTogether || playType === "prog" ? 1000 : 300;
    var delayNote = playTogether || playType === "prog" ? "2n" : "8n";

    // set vars
    switch (playType) {
      case "notes":
        if (selected.notes.length === 0) return;
        notes = Note.sortedNames(selected.notes);
        break;

      case "note":
        if (playNote === undefined) return;
        notes = [playNote];
        break;

      case "scale":
        notes = pitchedNotesFromKey(myKey.key, myKey.type, myKey.subtype);
        break;

      case "chord":
        notes = pitchedNotes(myChord.chord.notes);
        break;

      case "prog":
        if (myProg.length === 0) return;
        for (var i = 0; i < myProg.length; i++) {
          notes.push(pitchedNotes(myProg[i].chord.notes));
        }
        break;

      default:
        throw new Error();
    }

    // prepare playlist
    if (playTogether) {
      playlist.push({
        time: 0,
        note: notes,
        duration: delayNote,
      });
    } else {
      for (var n = 0; n < notes.length; n++) {
        playlist.push({
          time: (n * delayMs) / 1000,
          note: notes[n],
          duration: delayNote,
        });
      }
    }

    // play on synth
    new Part(function (time, note) {
      synth.current.triggerAttackRelease(note.note, note.duration, time);
    }, playlist).start();
    Transport.start();

    // highlight Keys
    var timeouts = [];

    for (let i = 0; i < playlist.length; i++) {
      setAutoplaying(true);

      timeouts.push(
        setTimeout(() => {
          setPressed({ type: "select", notes: playlist[i].note });
          playType === "prog" && setPlayingProg({ type: "increment" });
        }, delayMs * i)
      );

      timeouts.push(
        setTimeout(() => {
          setPressed({ type: "clear" });
          playType === "prog" && setPlayingProg({ type: "reset" });
          setAutoplaying(false);
        }, delayMs * playlist.length)
      );
    }
  }

  return (
    <>
      <Nav showShortcuts={showShortcuts} setShowShortcuts={setShowShortcuts} />
      <div className="layout">
        {/* <div className={`loader ${synthLoaded ? "loaded" : "loading"}`}>
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div> */}
        <div className="layout-center">
          <Piano
            autoplaying={autoplaying}
            volume={volume}
            setVolume={setVolume}
            mute={mute}
            setMute={setMute}
            selected={selected}
            setSelected={setSelected}
            pressed={pressed}
            setPressed={setPressed}
            toggleNote={toggleNote}
            playNote={playNote}
            playPiano={playPiano}
            pianoLocked={pianoLocked}
            setPianoLocked={setPianoLocked}
            showShortcuts={showShortcuts}
          />

          <div className="layout-bottom">
            <div className="layout-bottom-left">
              <Wheel
                myChord={myChord}
                myKey={myKey}
                getKey={getKey}
                getChord={getChord}
                selected={selected}
                playPiano={playPiano}
              />
              <Staff myKey={myKey} selected={selected} />
            </div>
            <div className="layout-bottom-right">
              <Keys
                pianoLocked={pianoLocked}
                autoplaying={autoplaying}
                selected={selected}
                myKey={myKey}
                getKey={getKey}
                myChord={myChord}
                getChord={getChord}
                playPiano={playPiano}
              />
              <Chords
                pianoLocked={pianoLocked}
                autoplaying={autoplaying}
                selected={selected}
                myChord={myChord}
                getChord={getChord}
                playPiano={playPiano}
                chordDetect={chordDetect}
              />
              <ChordProg
                autoplaying={autoplaying}
                myChord={myChord}
                getChord={getChord}
                myProg={myProg}
                setMyProg={setMyProg}
                playPiano={playPiano}
                playingProg={playingProg}
              />
              <Wave selected={selected} playPiano={playPiano} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
