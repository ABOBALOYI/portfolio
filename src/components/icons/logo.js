import React from 'react';

const IconLogo = () => (
  <svg id="logo" xmlns="http://www.w3.org/2000/svg" role="img" viewBox="0 0 84 96">
    <title>Logo</title>
    <g transform="translate(-8.000000, -2.000000)">
      <g transform="translate(11.000000, 5.000000)">
        <polygon
          id="Shape"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points="39 0 0 22 0 67 39 90 78 68 78 23"
        />
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
    </g>
  </svg>
);

export default IconLogo;
