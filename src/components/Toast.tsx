import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { IconCheckCircle, IconInfo, IconX, IconXCircle } from "../icons";
import { IconButton } from "./Button";

type ToastTone = "neutral" | "success" | "danger";
type Toast = { id: number; message: ReactNode; tone: ToastTone; action?: { label: string; onClick: () => void } };
type Push = (message: ReactNode, options?: { tone?: ToastTone; action?: Toast["action"]; duration?: number }) => void;

const ToastContext = createContext<Push | null>(null);
const ICON = { neutral: IconInfo, success: IconCheckCircle, danger: IconXCircle };

export function useToast(): Push {
  const push = useContext(ToastContext);
  if (!push) throw new Error("useToast needs a ToastProvider");
  return push;
}

export function ToastProvider({ children, dismissLabel = "Dismiss" }: { children: ReactNode; dismissLabel?: string }) {
  const [items, setItems] = useState<Toast[]>([]);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());
  const dismiss = useCallback((id: number) => {
    setItems((xs) => xs.filter((x) => x.id !== id));
    clearTimeout(timers.current.get(id));
    timers.current.delete(id);
  }, []);
  const push = useCallback<Push>((message, { tone = "neutral", action, duration = 5000 } = {}) => {
    const id = Date.now() + Math.random();
    setItems((xs) => [...xs.slice(-2), { id, message, tone, action }]);
    timers.current.set(id, setTimeout(() => dismiss(id), duration));
  }, [dismiss]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pr-toast-region" role="status" aria-live="polite" aria-atomic="false">
        {items.map((t) => {
          const Icon = ICON[t.tone];
          return (
            <div key={t.id} className="pr-toast" data-tone={t.tone}>
              <Icon className="pr-toast__icon" />
              <p className="pr-toast__message">{t.message}</p>
              {t.action && <button type="button" className="pr-toast__action" onClick={() => { t.action!.onClick(); dismiss(t.id); }}>{t.action.label}</button>}
              <IconButton label={dismissLabel} size="sm" onClick={() => dismiss(t.id)}><IconX /></IconButton>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
