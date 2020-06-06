import React from "react";

const Sound = ({ className = "" }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    className={`svg-icon sharp ${className || ""}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="sound">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14 4.65181V4.45181C14 3.82181 14.63 3.37181 15.21 3.60181C18.6 4.89181 21 8.16181 21 12.0018C21 15.8418 18.6 19.1118 15.21 20.4018C14.63 20.6218 14 20.1818 14 19.5518V19.3518C14 18.9718 14.24 18.6418 14.6 18.5018C17.18 17.4718 19 14.9418 19 12.0018C19 9.06181 17.18 6.53181 14.6 5.50181C14.25 5.36181 14 5.03181 14 4.65181ZM3 10.0018V14.0018C3 14.5518 3.45 15.0018 4 15.0018H7L10.29 18.2918C10.92 18.9218 12 18.4718 12 17.5818V6.41181C12 5.52181 10.92 5.07181 10.29 5.70181L7 9.00181H4C3.45 9.00181 3 9.45181 3 10.0018ZM16.5 12.0018C16.5 10.2318 15.48 8.71181 14 7.97181V16.0218C15.48 15.2918 16.5 13.7718 16.5 12.0018Z"
        fill="black"
      />
    </g>
  </svg>
);

export default Sound;
