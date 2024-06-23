import * as React from "react";
import type { SVGProps } from "react";
const JobIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={31}
    height={33}
    fill="none"
    {...props}
  >
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.096}
      d="M27.107 15.147c1.183 3.461 4.366 9.721 1.884 13.106-3.197 4.36-23.523 3.513-26.1 0-2.48-3.385.687-9.645 1.87-13.106"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={2.096}
      d="M15.939 21.434c1.765 0 4.189 3.592 1.787 4.042-1.075.2-2.517.198-3.575 0-2.402-.45.022-4.042 1.788-4.042Z"
    />
    <path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={2.096}
      d="M9.652 21.434c-2.485-1.67-4.036-4.063-4.65-6.889-.26-1.198-.39-1.798.032-2.345.422-.546 1.107-.546 2.478-.546h16.854c1.37 0 2.056 0 2.477.546.422.547.292 1.147.032 2.345-.613 2.826-2.165 5.219-4.649 6.889M15.939 21.434v-9.78"
    />
    <path
      stroke="#141B34"
      strokeWidth={2.096}
      d="M8.254 11.654c.796-5.6 3.935-9.78 7.685-9.78s6.888 4.18 7.684 9.78"
    />
  </svg>
);
export default JobIcon;
