import React from "react";

const SVG = ({ fill = "currentColor", className = "" }) => (
    <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={fill}
        className={className}
    >
        <rect strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x="3.8" y="3.8" width="16.4" height="16.4" style={{ opacity: '1' }} />
        <rect strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit={10} x="3.8" y="3.8" width="8.9" height="8.2" fill={fill} />
    </svg>
);

export default SVG;