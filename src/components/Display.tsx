import type { AnchorHTMLAttributes, CSSProperties, HTMLAttributes, ReactNode, Ref } from "react";
import { IconAlertTriangle, IconCheckCircle, IconInfo, IconXCircle } from "../icons";
import { cx } from "../utils";

export type Tone = "neutral" | "accent" | "success" | "warning" | "danger" | "info";

export function Badge({ tone = "neutral", icon, children, className }: { tone?: Tone; icon?: ReactNode; children: ReactNode; className?: string }) {
  return <span className={cx("pr-badge", className)} data-tone={tone}>{icon && <span aria-hidden="true" className="pr-badge__icon">{icon}</span>}{children}</span>;
}

const ALERT_ICON = { info: IconInfo, success: IconCheckCircle, warning: IconAlertTriangle, danger: IconXCircle };

export type AlertProps = { tone?: keyof typeof ALERT_ICON; title?: ReactNode; children?: ReactNode; action?: ReactNode; live?: boolean; className?: string };

export function Alert({ tone = "info", title, children, action, live = false, className }: AlertProps) {
  const Icon = ALERT_ICON[tone];
  const role = live ? (tone === "danger" || tone === "warning" ? "alert" : "status") : undefined;
  return (
    <div role={role} className={cx("pr-alert", className)} data-tone={tone}>
      <Icon className="pr-alert__icon" />
      <div className="pr-alert__body">
        {title && <p className="pr-alert__title">{title}</p>}
        {children && <div className="pr-alert__text">{children}</div>}
      </div>
      {action && <div className="pr-alert__action">{action}</div>}
    </div>
  );
}

export type ProgressProps = { value?: number; max?: number; label: string; showValue?: boolean; tone?: "accent" | "success" | "warning" | "danger"; className?: string };

export function Progress({ value, max = 100, label, showValue = false, tone = "accent", className }: ProgressProps) {
  const pct = value === undefined ? undefined : Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cx("pr-progress", className)}>
      <div className="pr-progress__head">
        <span className="pr-progress__label">{label}</span>
        {showValue && pct !== undefined && <span className="pr-progress__value" aria-hidden="true">{Math.round(pct)}%</span>}
      </div>
      <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} className="pr-progress__track" data-tone={tone} data-indeterminate={pct === undefined || undefined}>
        <span className="pr-progress__bar" style={pct === undefined ? undefined : { width: `${pct}%` }} />
      </div>
    </div>
  );
}

export function Skeleton({ width, height = "1em", radius, className }: { width?: CSSProperties["width"]; height?: CSSProperties["height"]; radius?: "sm" | "md" | "full"; className?: string }) {
  return <span aria-hidden="true" className={cx("pr-skeleton", className)} data-radius={radius} style={{ width, height }} />;
}

export type CardProps = HTMLAttributes<HTMLElement> & { title?: ReactNode; headingLevel?: 2 | 3 | 4; actions?: ReactNode; footer?: ReactNode; padded?: boolean };

export function Card({ title, headingLevel = 2, actions, footer, padded = true, className, children, ...rest }: CardProps) {
  const H = `h${headingLevel}` as "h2";
  return (
    <section className={cx("pr-card", className)} {...rest}>
      {(title || actions) && <header className="pr-card__header">{title && <H className="pr-card__title">{title}</H>}{actions && <div className="pr-card__actions">{actions}</div>}</header>}
      <div className={cx("pr-card__body", padded && "pr-card__body--padded")}>{children}</div>
      {footer && <footer className="pr-card__footer">{footer}</footer>}
    </section>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd className="pr-kbd">{children}</kbd>;
}

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { ref?: Ref<HTMLAnchorElement>; external?: boolean; externalLabel?: string };

export function Link({ className, external = false, externalLabel = "opens in a new tab", children, ref, ...rest }: LinkProps) {
  return (
    <a ref={ref} className={cx("pr-link", className)} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} {...rest}>
      {children}
      {external && <><span aria-hidden="true"> ↗</span><span className="pr-visually-hidden"> ({externalLabel})</span></>}
    </a>
  );
}

export function VisuallyHidden({ children }: { children: ReactNode }) {
  return <span className="pr-visually-hidden">{children}</span>;
}

export type StackProps = HTMLAttributes<HTMLDivElement> & { gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12; direction?: "row" | "column"; align?: CSSProperties["alignItems"]; justify?: CSSProperties["justifyContent"]; wrap?: boolean };

export function Stack({ gap = 4, direction = "column", align, justify, wrap = false, className, style, ...rest }: StackProps) {
  return <div className={cx("pr-stack", className)} style={{ gap: `var(--pr-space-${gap})`, flexDirection: direction, alignItems: align, justifyContent: justify, flexWrap: wrap ? "wrap" : undefined, ...style }} {...rest} />;
}
