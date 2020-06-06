import React, { useState, useRef, useEffect } from "react";
import { Sampler, Part, Transport } from "tone";
import { Key, Note } from "@tonaljs/tonal";
import * as ChordDetect from "@tonaljs/chord-detect";
import { Wheel } from "./Wheel";
import { KeyChart } from "./KeyChart";
import { Keyboard } from "./Keyboard";
import { Selected } from "./Selected";
import { Chords } from "./Chords";
import { Menu } from "./Menu";
import { Staff } from "./Staff";
import { selectedToNotes } from "./Utils";

// Keyboard
function Layout() {
  const [pianoLoaded, setPianoLoaded] = useState(false);
  const piano = useRef(null);

  useEffect(() => {
    piano.current = new Sampler(
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
        volume: 0,
        release: 1.2,
        baseUrl: window.location.hostname.includes("localhost")
          ? process.env.PUBLIC_URL + "/samples/"
          : "https://www.jamescarmichael.ca/chords/samples/",
        onload: () => {
          setPianoLoaded(true);
          console.log("Piano loaded!");
        },
      }
    ).toDestination();
    // piano.current.volume.value = -5;
    // Tone.context.resume();
  }, []);

  function playPlaylist(playlist) {
    if (pianoLoaded) {
      new Part(function (time, note) {
        piano.current.triggerAttackRelease(note.note, note.duration, time);
      }, playlist).start();
      Transport.start();
    }

    // Highlight keys
    highlightKeys(playlist);
  }

  function pianoAttack(note) {
    pianoLoaded && piano.current.triggerAttack(note);
  }
  function pianoRelease(note) {
    pianoLoaded && piano.current.triggerRelease(note);
  }
  function pianoAttackRelease(note, duration) {
    pianoLoaded && piano.current.triggerAttackRelease(note, duration);
  }

  // Selected Notes
  const [selectedNotes, setSelectedNotes] = useState([]);

  // Chord Detection
  const [chordDetect, setChordDetect] = useState("");

  // Selected Key
  const [myKey, setMyKey] = useState({ key: {}, note: "", type: "" });

  // to handle playing keys by dragging mouse while mouse is down
  const [mouseDown, setMouseDown] = useState(false);

  // for auto play keys
  const autoplayDelay = 0.3;
  const autoplayLength = "8n";

  function setKey(key, note, type) {
    setMyKey({ key: key, note: note, type: type });

    setSelectedNotes(pitchedScale(key, type));
  }

  function findKey(note, type) {
    var key = {};
    if (type === "major") {
      key = Key.majorKey(note);
    } else if (type === "minor") {
      key = Key.minorKey(note);
    } else {
      return;
    }

    setKey(key, note, type);
  }

  function setLeftButtonState(e) {
    setMouseDown(e.buttons === undefined ? e.which === 1 : e.buttons === 1);
  }
  document.body.onmousedown = setLeftButtonState;
  document.body.onmouseup = setLeftButtonState;

  // Update selected notes
  function updateSelected(index, active) {
    const list = selectedNotes;

    if (active) {
      list.push(index);
      list.sort((a, b) => a - b);
    } else {
      for (var i = 0; i < list.length; i++) {
        if (list[i] === index) {
          list.splice(i, 1);
        }
      }
    }

    setSelectedNotes(list);

    // Predict chords
    const chords = ChordDetect.detect(selectedToNotes(list));
    setChordDetect(chords);
  }

  function clearSelected() {
    setSelectedNotes([]);
    setChordDetect("");
  }

  const [autoplaying, setAutoplaying] = useState(false);

  function highlightKeys(playlist) {
    var timeouts = [];

    for (let i = 0; i < playlist.length; i++) {
      const midi = Note.midi(playlist[i].note);

      let keyToPress = document.querySelector(`.key[data-midi='${midi}'`);

      setAutoplaying(true);

      timeouts.push(
        setTimeout(() => {
          keyToPress.classList.add("highlighted");
        }, autoplayDelay * i * 1000)
      );

      timeouts.push(
        setTimeout(function () {
          keyToPress.classList.remove("highlighted");
        }, autoplayDelay * i * 1000 + autoplayDelay * 1000)
      );

      timeouts.push(
        setTimeout(function () {
          setAutoplaying(false);
        }, autoplayDelay * playlist.length * 1000 + autoplayDelay * 1000)
      );
    }
  }

  function scaleFromKey(key, type) {
    if (type === "major") {
      return key.scale;
    } else if (type === "minor") {
      return key.natural.scale;
    }
    return;
  }

  function pitchedScale(key, type, startPitch = 4) {
    var pitch = startPitch;
    var scale = scaleFromKey(key, type);
    var pitched = [];

    for (var i = 0; i < scale.length; i++) {
      pitched.push(scale[i] + pitch.toString());

      if (scale[i].includes("B")) {
        pitch++;
      }
    }
    pitched.push(scale[0] + pitch.toString());

    return pitched;
  }

  function playSelectedKeys() {
    if (autoplaying || selectedNotes.length === 0) return;

    const playlist = [];
    for (var i = 0; i < selectedNotes.length; i++) {
      playlist.push({
        time: i * autoplayDelay,
        note: selectedNotes[i],
        duration: autoplayLength,
      });
    }

    playPlaylist(playlist);
  }

  function playScale() {
    if (Object.keys(myKey.key).length === 0) {
      return;
    }

    var scale = pitchedScale(myKey.key, myKey.type);

    const playlist = [];
    for (var i = 0; i < scale.length; i++) {
      playlist.push({
        time: i * autoplayDelay,
        note: scale[i],
        duration: autoplayLength,
      });
    }

    playPlaylist(playlist);
  }

  return (
    <>
      <Menu
        selectedNotes={selectedNotes}
        clearSelected={clearSelected}
        playSelectedKeys={playSelectedKeys}
      />
      <div className="layout">
        {/* <div className={`loader ${pianoLoaded ? "loaded" : "loading"}`}>
          <div className="loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div> */}
        <div className="layout-keyboard">
          <Staff selectedNotes={selectedNotes} myKey={myKey} />
          <Keyboard
            pianoAttack={pianoAttack}
            pianoRelease={pianoRelease}
            pianoAttackRelease={pianoAttackRelease}
            mouseDown={mouseDown}
            selectedNotes={selectedNotes}
            updateSelected={updateSelected}
            clearSelected={clearSelected}
            playSelectedKeys={playSelectedKeys}
            autoplaying={autoplaying}
          />
          <Selected selectedNotes={selectedNotes} />

          <div className="wheel-and-chart">
            <Wheel
              playScale={playScale}
              findKey={findKey}
              myKey={myKey}
              autoplaying={autoplaying}
            />
            <KeyChart myKey={myKey} />
          </div>
          <Chords chordDetect={chordDetect} />
        </div>
      </div>
    </>
  );
}

export default Layout;
