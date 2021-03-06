import React, { useState } from "react";
import classNames from "classnames";
import { Note } from "@tonaljs/tonal";
import { keyList } from "../../utils/Lists";
import { Key } from "./Key";
import Sound from "../../icons/sound";
import Play from "../../icons/play";
import PlaySeparate from "../../icons/playsep";
import Mute from "../../icons/mute";
import Locked from "../../icons/locked";
import Unlocked from "../../icons/unlocked";
import Clear from "../../icons/clear";
import "./piano.scss";

export const Piano = (props) => {
  const [keyDown, setKeyDown] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  const minVolume = -20;
  const maxVolume = 0;

  // Handle mouse down state
  function setLeftButtonState(e) {
    setMouseDown(e.buttons === undefined ? e.which === 1 : e.buttons === 1);
  }
  document.body.onmousedown = setLeftButtonState;
  document.body.onmouseup = setLeftButtonState;

  function checkFocus() {
    const activeElement = document.activeElement;
    const inputs = ["input", "select", "textarea"];

    if (
      activeElement &&
      inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1
    ) {
      return true;
    }
  }

  // Key Down
  document.body.onkeydown = function (e) {
    // Prevent repeat key presses
    if (keyDown) return;

    // Bail if something important is focused
    if (checkFocus()) return;

    switch (e.key) {
      // Shift key temporarily (un)locks keyboard
      case "Shift":
        props.setPianoLocked(!props.pianoLocked);
        break;
      // Change key locked
      case "CapsLock":
        props.setPianoLocked(!props.pianoLocked);
        break;
      // Delete key = Unselect keys
      case "Delete":
        !props.pianoLocked &&
          props.setSelected({ type: "clear", cat: "notes" });
        break;
      // Enter key = play selected
      case "Enter":
        props.playPiano("notes", false);
        break;
      default:
        // Play keys if it's a shortcut
        if (e.key.toLowerCase() in keyShortcuts) {
          props.playNote(keyShortcuts[e.key.toLowerCase()], "attack");
          props.setPressed({
            type: "add",
            note: keyShortcuts[e.key.toLowerCase()],
          });
        }
        break;
    }

    setKeyDown(true);
  };

  // Key Up
  document.body.onkeyup = function (e) {
    // Bail if something important is focused
    if (checkFocus()) return;

    switch (e.key) {
      // Shift key temporarily (un)locks keyboard
      case "Shift":
        props.setPianoLocked(!props.pianoLocked);
        break;
      default:
        if (e.key.toLowerCase() in keyShortcuts) {
          props.playNote(keyShortcuts[e.key.toLowerCase()], "release");
          props.setPressed({
            type: "remove",
            note: keyShortcuts[e.key.toLowerCase()],
          });
        }
        break;
    }

    setKeyDown(false);
  };

  return (
    <div
      className={classNames("piano", {
        [`theme-${props.selected.cat}`]: true,
        "theme-locked": props.pianoLocked,
        "show-shortcuts": props.showShortcuts,
      })}
    >
      <div className="piano-buttons">
        <button
          className={`small-on-mobile ${props.pianoLocked && "theme-locked"}`}
          onClick={() => {
            props.setPianoLocked(!props.pianoLocked);
          }}
        >
          {props.pianoLocked ? <Locked /> : <Unlocked />}

          <span className="text">Lock</span>
        </button>
        <div
          className={classNames("piano-volume", {
            mute: props.mute,
          })}
        >
          <button
            onClick={() => {
              props.setMute(!props.mute);
            }}
          >
            {props.mute ? <Mute /> : <Sound />}
          </button>
          <input
            type="range"
            min={minVolume}
            max={maxVolume}
            className="piano-volume-slider"
            value={props.volume}
            onChange={(e) => {
              props.setMute(false);
              props.setVolume(e.target.value);
            }}
          />
        </div>
        <div className="button-group touching">
          <button
            className="play small-on-mobile"
            onClick={() => {
              props.playPiano("notes", false);
            }}
            disabled={props.autoplaying || props.selected.notes.length === 0}
          >
            <PlaySeparate />
            <span className="text">Play as Scale</span>
          </button>
          <button
            className="play small-on-mobile"
            onClick={() => {
              props.playPiano("notes", true);
            }}
            disabled={props.autoplaying || props.selected.notes.length === 0}
          >
            <Play />
            <span className="text">Play as Chord</span>
          </button>
          <button
            className="small-on-mobile"
            onClick={() => {
              props.setSelected({ type: "clear", cat: "notes" });
            }}
            disabled={
              props.autoplaying ||
              props.pianoLocked ||
              props.selected.notes.length === 0
            }
          >
            <Clear />
            <span className="text">Clear</span>
          </button>
        </div>
      </div>

      <div className="piano-shortcuts">
        {props.showShortcuts && (
          <div className="piano-shortcuts-list">
            <span className="shortcut">
              <span className="key">Enter</span>
              <span className="action">Play Notes</span>
            </span>
            <span className="shortcut">
              <span className="key">Caps Lock</span>
              <span className="key">Shift</span>
              <span className="action">Toggle Keyboard Lock</span>
            </span>
            <span className="shortcut">
              <span className="key">Delete</span>
              <span className="action">Clear Notes</span>
            </span>
          </div>
        )}
      </div>

      <div className="piano-keys-wrap">
        <div className="piano-keys">
          {keyList.map((key, i) => (
            <Key
              key={i}
              index={i}
              color={key.color}
              note={key.note}
              enharmonic={key.enharmonic}
              label={key.label}
              enharmoniclabel={key.enharmoniclabel}
              midi={Note.midi(key.note)}
              shortcut={key.shortcut}
              playNote={props.playNote}
              selected={props.selected}
              pressed={props.pressed}
              toggleNote={props.toggleNote}
              mouseDown={mouseDown}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const keyShortcuts = {
  q: "G#3",
  a: "A3",
  w: "A#3",
  s: "B3",
  d: "C4",
  r: "C#4",
  f: "D4",
  t: "D#4",
  g: "E4",
  h: "F4",
  u: "F#4",
  j: "G4",
  i: "G#4",
  k: "A4",
  o: "A#4",
  l: "B4",
  ";": "C5",
  "[": "C#5",
  "'": "D5",
  "]": "D#5",
};
