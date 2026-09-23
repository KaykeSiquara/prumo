import type { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from "react";
import { cx } from "../utils";
import { Spinner } from "./Spinner";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  ref?: Ref<HTMLButtonElement>;
};

export function Button({ variant = "secondary", size = "md", loading = false, iconStart, iconEnd, className, children, type = "button", onClick, ref, ...rest }: ButtonProps) {
  const guard = (e: MouseEvent<HTMLButtonElement>) => (loading ? e.preventDefault() : onClick?.(e));
  return (
    <button ref={ref} type={type} className={cx("pr-button", className)} data-variant={variant} data-size={size} data-loading={loading || undefined} aria-disabled={loading || undefined} aria-busy={loading || undefined} onClick={guard} {...rest}>
      {iconStart && <span className="pr-button__icon">{iconStart}</span>}
      <span className="pr-button__label">{children}</span>
      {iconEnd && <span className="pr-button__icon">{iconEnd}</span>}
      {loading && <Spinner size="sm" className="pr-button__spinner" />}
    </button>
  );
}

export type IconButtonProps = Omit<ButtonProps, "children" | "iconStart" | "iconEnd"> & { label: string; children: ReactNode };

export function IconButton({ label, children, variant = "ghost", size = "md", className, ...rest }: IconButtonProps) {
  return (
    <Button variant={variant} size={size} className={cx("pr-icon-button", className)} aria-label={label} {...rest}>
      {children}
    </Button>
  );
}
