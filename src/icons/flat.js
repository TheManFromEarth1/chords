import React from "react";

const Flat = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={`svg-icon ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="icon-flat">
      <path
        id="icon-flat_2"
        d="M8.855 13.9023C8.855 9.26096 8.85451 4.64154 8.85451 0H7.36566C7.36566 7.90116 7.36688 16.0991 7.36688 24C8.53808 23.353 9.86506 22.0909 11.5124 21.0238C13.5544 19.7019 16.3649 18.4983 16.6145 16.0281C17.0279 11.9426 10.8737 12.2447 8.855 13.9023ZM8.855 21.4493C8.855 19.5006 8.855 17.5522 8.855 15.603C9.76299 13.8135 12.8702 13.8187 13.1067 15.8157C13.4078 18.3605 10.0172 20.1952 8.855 21.4493Z"
        fill="black"
      />
    </g>
  </svg>
);

export default Flat;