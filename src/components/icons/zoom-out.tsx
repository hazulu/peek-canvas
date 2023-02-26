import React from "react";

const SVG = ({ fill = "currentColor", className = "" }) => (
    <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={fill}
        className={className}
    >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6" />
    </svg>
);

export default SVG;