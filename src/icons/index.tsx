import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;
const make = (paths: string[]) =>
  function Icon(props: IconProps) {
    return (
      <svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false" {...props}>
        {paths.map((d) => <path key={d} d={d} />)}
      </svg>
    );
  };

export const IconCheck = make(["M20 6 9 17l-5-5"]);
export const IconMinus = make(["M5 12h14"]);
export const IconX = make(["M18 6 6 18", "M6 6l12 12"]);
export const IconChevronDown = make(["m6 9 6 6 6-6"]);
export const IconChevronLeft = make(["m15 18-6-6 6-6"]);
export const IconChevronRight = make(["m9 18 6-6-6-6"]);
export const IconArrowUp = make(["M12 19V5", "m5 12 7-7 7 7"]);
export const IconArrowDown = make(["M12 5v14", "m19 12-7 7-7-7"]);
export const IconArrowUpDown = make(["m21 16-4 4-4-4", "M17 20V4", "m3 8 4-4 4 4", "M7 4v16"]);
export const IconInfo = make(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "M12 16v-4", "M12 8h.01"]);
export const IconCheckCircle = make(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "m9 12 2 2 4-4"]);
export const IconAlertTriangle = make(["M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z", "M12 9v4", "M12 17h.01"]);
export const IconXCircle = make(["M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z", "m15 9-6 6", "m9 9 6 6"]);
export const IconSearch = make(["M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z", "m21 21-4.3-4.3"]);
export const IconMoreHorizontal = make(["M12 12h.01", "M19 12h.01", "M5 12h.01"]);
