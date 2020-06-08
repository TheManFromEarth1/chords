import React from "react";

const Piano = ({ className = "" }) => (
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
        d="M20.7152 2.06862H4.46521C3.42966 2.06862 2.59021 2.90807 2.59021 3.94362V20.1936C2.59021 21.2292 3.42966 22.0686 4.46521 22.0686H20.7152C21.7508 22.0686 22.5902 21.2292 22.5902 20.1936V3.94362C22.5902 2.90807 21.7508 2.06862 20.7152 2.06862ZM6.96521 20.8186H4.46521C4.12001 20.8186 3.84021 20.5388 3.84021 20.1936V3.94362C3.84021 3.59842 4.12001 3.31862 4.46521 3.31862H5.71521V12.6936C5.71521 13.0388 5.99501 13.3186 6.34021 13.3186H6.96521V20.8186ZM11.9652 20.8186H8.21521V13.3186H8.84021C9.18541 13.3186 9.46521 13.0388 9.46521 12.6936V3.31862H10.7152V12.6936C10.7152 13.0388 10.995 13.3186 11.3402 13.3186H11.9652V20.8186ZM16.9652 20.8186H13.2152V13.3186H13.8402C14.1854 13.3186 14.4652 13.0388 14.4652 12.6936V3.31862H15.7152V12.6936C15.7152 13.0388 15.995 13.3186 16.3402 13.3186H16.9652V20.8186ZM21.3402 20.1936C21.3402 20.5388 21.0604 20.8186 20.7152 20.8186H18.2152V13.3186H18.8402C19.1854 13.3186 19.4652 13.0388 19.4652 12.6936V3.31862H20.7152C21.0604 3.31862 21.3402 3.59842 21.3402 3.94362V20.1936Z"
        fill="black"
      />
    </g>
  </svg>
);

export default Piano;
