import React from "react";
import { Key } from "@tonaljs/tonal";
import { notesWithIntervals, chordsWithGrades } from "./Utils";
import Sound from "../icons/sound";
import Piano from "../icons/piano";
import Clear from "../icons/clear";
import "../css/charts.scss";

export const KeyChart = (props) => {
  function keyInfo() {
    if (props.myKey.type === "major") {
      const details = Key.majorKey(props.myKey.note);

      return (
        <>
          <div className="detail">
            <span className="label">Relative Minor</span>
            <span className="value">
              {details["minorRelative"] && (
                <button
                  className="small theme-key"
                  onClick={() => {
                    props.findKey(details["minorRelative"], "minor");
                  }}
                >
                  {details["minorRelative"]} minor
                </button>
              )}
            </span>
          </div>

          {notesWithIntervals(details["scale"], details["intervals"])}
          {chordsWithGrades(details["chords"], details["grades"])}
        </>
      );
    } else if (props.myKey.type === "minor") {
      const details = Key.minorKey(props.myKey.note);

      return (
        <div className="detail">
          <span className="label">Relative Major</span>
          <span className="value">
            {details["relativeMajor"] && (
              <button
                className="small theme-key"
                onClick={() => {
                  props.findKey(details["relativeMajor"], "major");
                }}
              >
                {details["relativeMajor"]} major
              </button>
            )}
          </span>
          <p>More minor chord info coming soon...</p>
        </div>
      );
    }

    return;
  }

  return (
    <div className="chart">
      <div className="chart-title">
        <span className="chart-title-label">
          {Object.keys(props.myKey.key).length === 0 ? (
            <span className="empty">Key</span>
          ) : (
            <span className="color-theme-key">
              {props.myKey.key.tonic} {props.myKey.key.type}
            </span>
          )}
        </span>

        <div className="button-group touching">
          <button
            className="outline theme-key select-key"
            onClick={() => {
              if (Object.keys(props.myKey.key).length !== 0) {
                props.selectNotesFromKey(props.myKey.key, props.myKey.type);
              }
            }}
            disabled={
              props.autoplaying ||
              props.keyboardLocked ||
              props.selNotesType === "key" ||
              Object.keys(props.myKey.key).length === 0
            }
          >
            <Piano />
            <span className="text">Select</span>
          </button>
          <button
            className="outline theme-key play-key"
            onClick={
              Object.keys(props.myKey.key).length !== 0 ? props.playScale : null
            }
            disabled={
              props.autoplaying || Object.keys(props.myKey.key).length === 0
            }
          >
            <Sound />
            <span className="text">Play</span>
          </button>
          <button
            className="outline theme-key"
            onClick={() => {
              props.findKey("", "");
            }}
            disabled={
              props.autoplaying || Object.keys(props.myKey.key).length === 0
            }
          >
            <Clear />
            <span className="text">Clear</span>
          </button>
        </div>
      </div>

      <div className="chart-details">
        {Object.keys(props.myKey.key).length === 0 ? (
          <span className="empty">No key selected.</span>
        ) : (
          props.myKey.note && keyInfo()
        )}
      </div>
    </div>
  );
};
