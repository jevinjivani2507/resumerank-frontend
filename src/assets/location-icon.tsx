import * as React from "react";
import type { SVGProps } from "react";
const LocationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={13}
    fill="none"
    {...props}
  >
    <path
      fill="#79819A"
      d="M4.993 12.928a20 20 0 0 1-2.37-2.39C1.54 9.243.254 7.316.254 5.48A4.739 4.739 0 0 1 8.345 2.13 4.7 4.7 0 0 1 9.732 5.48c0 1.836-1.287 3.763-2.37 5.056a20 20 0 0 1-2.37 2.39m0-9.478a2.03 2.03 0 1 0 0 4.062 2.03 2.03 0 0 0 0-4.062"
    />
  </svg>
);
export default LocationIcon;
