import React from "react";

const PlaySeparate = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={`svg-icon ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10.8 15.9L15.47 12.4C15.74 12.2 15.74 11.8 15.47 11.6L10.8 8.1C10.47 7.85 10 8.09 10 8.5V15.5C10 15.91 10.47 16.15 10.8 15.9ZM4 12C4 16.41 7.59 20 12 20C16.41 20 20 16.41 20 12C20 7.59 16.41 4 12 4C7.59 4 4 7.59 4 12Z"
        fill="black"
      />
    </g>
  </svg>
);

export default PlaySeparate;
