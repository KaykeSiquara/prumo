import { createContext, useContext, useId, type ReactNode } from "react";
import { cx } from "../utils";

type FieldState = { id: string; describedBy?: string; invalid: boolean; required: boolean; disabled: boolean };
const FieldContext = createContext<FieldState | null>(null);

export function useField(override: { id?: string; invalid?: boolean; required?: boolean; disabled?: boolean; "aria-describedby"?: string } = {}) {
  const ctx = useContext(FieldContext);
  const own = useId();
  return {
    id: override.id ?? ctx?.id ?? own,
    "aria-describedby": [ctx?.describedBy, override["aria-describedby"]].filter(Boolean).join(" ") || undefined,
    "aria-invalid": override.invalid ?? ctx?.invalid ? true : undefined,
    required: override.required ?? ctx?.required ?? undefined,
    disabled: override.disabled ?? ctx?.disabled ?? undefined,
  };
}

export type FieldProps = {
  label: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  className?: string;
  children: ReactNode;
};

export function Field({ label, description, error, required = false, disabled = false, hideLabel = false, className, children }: FieldProps) {
  const id = useId();
  const descId = description ? `${id}-description` : undefined;
  const errId = error ? `${id}-error` : undefined;
  return (
    <FieldContext.Provider value={{ id, describedBy: [errId, descId].filter(Boolean).join(" ") || undefined, invalid: !!error, required, disabled }}>
      <div className={cx("pr-field", className)} data-disabled={disabled || undefined}>
        <label htmlFor={id} className={cx("pr-field__label", hideLabel && "pr-visually-hidden")}>
          {label}
          {required && <span className="pr-field__required" aria-hidden="true"> *</span>}
        </label>
        {description && <p id={descId} className="pr-field__description">{description}</p>}
        {children}
        {error && <p id={errId} className="pr-field__error"><span aria-hidden="true">◆ </span>{error}</p>}
      </div>
    </FieldContext.Provider>
  );
}
