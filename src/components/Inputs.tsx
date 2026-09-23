import { useEffect, useId, useRef, useState, type InputHTMLAttributes, type ReactNode, type Ref, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { IconCheck, IconChevronDown, IconMinus } from "../icons";
import { cx } from "../utils";
import { useField } from "./Field";
import { Spinner } from "./Spinner";

type Size = { size?: "sm" | "md" | "lg" };
type Common = { invalid?: boolean };

export type TextInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> & Size & Common & { iconStart?: ReactNode; loading?: boolean; ref?: Ref<HTMLInputElement> };

export function TextInput({ size = "md", invalid, iconStart, loading = false, className, id, required, disabled, ref, ...rest }: TextInputProps) {
  const field = useField({ id, invalid, required, disabled, "aria-describedby": rest["aria-describedby"] });
  return (
    <span className={cx("pr-input", className)} data-size={size} data-invalid={field["aria-invalid"]} data-disabled={field.disabled} data-loading={loading || undefined}>
      {iconStart && <span className="pr-input__icon">{iconStart}</span>}
      <input ref={ref} {...rest} {...field} aria-busy={loading || undefined} className="pr-input__control" />
      {loading && <Spinner size="sm" className="pr-input__spinner" />}
    </span>
  );
}

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & Common & { ref?: Ref<HTMLTextAreaElement> };

export function TextArea({ invalid, className, id, required, disabled, ref, ...rest }: TextAreaProps) {
  const field = useField({ id, invalid, required, disabled, "aria-describedby": rest["aria-describedby"] });
  return <textarea ref={ref} {...rest} {...field} className={cx("pr-textarea", className)} data-invalid={field["aria-invalid"]} />;
}

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> & Size & Common & { ref?: Ref<HTMLSelectElement> };

export function Select({ size = "md", invalid, className, id, required, disabled, children, ref, ...rest }: SelectProps) {
  const field = useField({ id, invalid, required, disabled, "aria-describedby": rest["aria-describedby"] });
  return (
    <span className={cx("pr-select", className)} data-size={size} data-invalid={field["aria-invalid"]} data-disabled={field.disabled}>
      <select ref={ref} {...rest} {...field} className="pr-select__control">{children}</select>
      <IconChevronDown className="pr-select__chevron" />
    </span>
  );
}

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & { label: ReactNode; description?: ReactNode; indeterminate?: boolean; ref?: Ref<HTMLInputElement> };

export function Checkbox({ label, description, indeterminate = false, className, id, ...rest }: CheckboxProps) {
  const own = useId();
  const inputId = id ?? own;
  const local = useRef<HTMLInputElement>(null);
  useEffect(() => { if (local.current) local.current.indeterminate = indeterminate; }, [indeterminate]);
  return (
    <div className={cx("pr-check", className)} data-disabled={rest.disabled || undefined}>
      <span className="pr-check__box">
        <input ref={local} id={inputId} type="checkbox" aria-describedby={description ? `${inputId}-d` : undefined} {...rest} className="pr-check__control" />
        <IconCheck className="pr-check__mark" />
        <IconMinus className="pr-check__dash" />
      </span>
      <span className="pr-check__text">
        <label htmlFor={inputId} className="pr-check__label">{label}</label>
        {description && <span id={`${inputId}-d`} className="pr-check__description">{description}</span>}
      </span>
    </div>
  );
}

export type RadioOption = { value: string; label: ReactNode; description?: ReactNode; disabled?: boolean };
export type RadioGroupProps = { legend: ReactNode; name: string; options: RadioOption[]; value?: string; defaultValue?: string; onValueChange?: (v: string) => void; orientation?: "vertical" | "horizontal"; error?: ReactNode; className?: string };

export function RadioGroup({ legend, name, options, value, defaultValue, onValueChange, orientation = "vertical", error, className }: RadioGroupProps) {
  const id = useId();
  return (
    <fieldset className={cx("pr-radio-group", className)} data-orientation={orientation} aria-describedby={error ? `${id}-error` : undefined} aria-invalid={error ? true : undefined}>
      <legend className="pr-field__label">{legend}</legend>
      <div className="pr-radio-group__options">
        {options.map((o) => (
          <div key={o.value} className="pr-check" data-disabled={o.disabled || undefined}>
            <span className="pr-check__box" data-shape="round">
              <input type="radio" id={`${id}-${o.value}`} name={name} value={o.value} disabled={o.disabled} className="pr-check__control"
                {...(value !== undefined ? { checked: value === o.value } : { defaultChecked: defaultValue === o.value })}
                onChange={(e) => e.target.checked && onValueChange?.(o.value)} aria-describedby={o.description ? `${id}-${o.value}-d` : undefined} />
              <span className="pr-check__dot" aria-hidden="true" />
            </span>
            <span className="pr-check__text">
              <label htmlFor={`${id}-${o.value}`} className="pr-check__label">{o.label}</label>
              {o.description && <span id={`${id}-${o.value}-d`} className="pr-check__description">{o.description}</span>}
            </span>
          </div>
        ))}
      </div>
      {error && <p id={`${id}-error`} className="pr-field__error"><span aria-hidden="true">◆ </span>{error}</p>}
    </fieldset>
  );
}

export type SwitchProps = { label: ReactNode; description?: ReactNode; checked?: boolean; defaultChecked?: boolean; onCheckedChange?: (v: boolean) => void; disabled?: boolean; className?: string; id?: string };

export function Switch({ label, description, checked, defaultChecked = false, onCheckedChange, disabled, className, id }: SwitchProps) {
  const own = useId();
  const sid = id ?? own;
  const [on, setOn] = useControlled(checked, defaultChecked);
  return (
    <div className={cx("pr-switch", className)} data-disabled={disabled || undefined}>
      <button type="button" role="switch" id={sid} aria-checked={on} disabled={disabled} aria-describedby={description ? `${sid}-d` : undefined}
        aria-labelledby={`${sid}-l`} className="pr-switch__track" onClick={() => { setOn(!on); onCheckedChange?.(!on); }}>
        <span className="pr-switch__thumb" aria-hidden="true" />
      </button>
      <span className="pr-check__text">
        <span id={`${sid}-l`} className="pr-check__label" onClick={() => !disabled && document.getElementById(sid)?.click()}>{label}</span>
        {description && <span id={`${sid}-d`} className="pr-check__description">{description}</span>}
      </span>
    </div>
  );
}

function useControlled<T>(value: T | undefined, initial: T): [T, (v: T) => void] {
  const [inner, setInner] = useState(initial);
  return [value !== undefined ? value : inner, (v: T) => { if (value === undefined) setInner(v); }];
}
