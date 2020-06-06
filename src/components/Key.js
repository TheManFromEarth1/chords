import React from "react";
import classNames from "classnames";

export const Key = (props) => {
  return (
    <button
      className={classNames(`key key-${props.color}`, {
        active: props.selectedNotes.includes(props.note),
      })}
      data-midi={props.midi}
      data-note={props.note}
      data-shortcut={props.shortcut}
      onMouseDown={() => {
        props.pianoAttack(props.note);

        if (props.enharmonic) {
          if (props.selectedNotes.includes(props.note)) {
            props.updateSelected(props.note, false);
            props.updateSelected(props.enharmonic, true);
          } else if (props.selectedNotes.includes(props.enharmonic)) {
            props.updateSelected(props.enharmonic, false);
          } else {
            props.updateSelected(props.note, true);
          }
        } else {
          props.updateSelected(
            props.note,
            !props.selectedNotes.includes(props.note)
          );
        }
      }}
      onMouseUp={() => {
        props.pianoRelease(props.note);
      }}
      onMouseLeave={() => {
        props.pianoRelease(props.note);
      }}
      onMouseEnter={(e) => {
        if (props.mouseDown) {
          props.pianoAttackRelease(props.note, "8n");
        }
      }}
    >
      {props.shortcut && (
        <div className="key-shortcut">
          <span className="key-shortcut-line"></span>
          <span className="key-shortcut-btn">{props.shortcut}</span>
        </div>
      )}

      <span className="key-labels">
        <span
          className={classNames(`key-label`, {
            active: props.selectedNotes.includes(props.note),
            flat: props.note.includes("b"),
            sharp: props.note.includes("#"),
          })}
        >
          {props.label}
        </span>

        {props.enharmonic && (
          <span
            className={classNames(`key-label`, {
              active: props.selectedNotes.includes(props.enharmonic),
              flat: props.enharmonic.includes("b"),
              sharp: props.enharmonic.includes("#"),
            })}
          >
            {props.enharmoniclabel}
          </span>
        )}
      </span>
    </button>
  );
};
