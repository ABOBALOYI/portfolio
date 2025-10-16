import React from 'react';

const IconLoader = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <title>Loader Logo</title>
    <g>
      <g id="A" transform="translate(11.000000, 5.000000)">
        <g id="letter-a">
          {/* Main A structure with modern styling */}
          <path
            d="M39 28 L45 28 L58 62 L52 62 L49.5 55.5 L34.5 55.5 L32 62 L26 62 L39 28 Z"
            fill="currentColor"
          />
          {/* Crossbar with rounded ends */}
          <rect x="36" y="48" width="12" height="3" rx="1.5" fill="currentColor" />
          {/* Accent triangle at top */}
          <path d="M39 28 L42 32 L45 28 Z" fill="currentColor" opacity="0.7" />
          {/* Side accent lines */}
          <line
            x1="30"
            y1="45"
            x2="33"
            y2="50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
          <line
            x1="54"
            y1="45"
            x2="51"
            y2="50"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.5"
          />
        </g>
      </g>
      <path
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M 50, 5
                  L 11, 27
                  L 11, 72
                  L 50, 95
                  L 89, 73
                  L 89, 28 z"
      />
    </g>
  </svg>
);

export default IconLoader;
