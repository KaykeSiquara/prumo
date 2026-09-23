import { cx } from "../utils";

export type SpinnerProps = { size?: "sm" | "md" | "lg"; label?: string; className?: string };

export function Spinner({ size = "md", label, className }: SpinnerProps) {
  return label ? (
    <span role="status" className={cx("pr-spinner", className)} data-size={size}>
      <span className="pr-visually-hidden">{label}</span>
    </span>
  ) : (
    <span aria-hidden="true" className={cx("pr-spinner", className)} data-size={size} />
  );
}
