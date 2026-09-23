import * as RDialog from "@radix-ui/react-dialog";
import * as RMenu from "@radix-ui/react-dropdown-menu";
import * as RPopover from "@radix-ui/react-popover";
import * as RTabs from "@radix-ui/react-tabs";
import * as RTooltip from "@radix-ui/react-tooltip";
import type { ReactNode } from "react";
import { IconX } from "../icons";
import { cx } from "../utils";
import { Button, IconButton } from "./Button";

type OverlayBase = { open?: boolean; defaultOpen?: boolean; onOpenChange?: (open: boolean) => void; trigger?: ReactNode };

export type DialogProps = OverlayBase & { title: ReactNode; description?: ReactNode; children?: ReactNode; footer?: ReactNode; size?: "sm" | "md" | "lg"; closeLabel?: string; role?: "dialog" | "alertdialog" };

export function Dialog({ open, defaultOpen, onOpenChange, trigger, title, description, children, footer, size = "md", closeLabel = "Close", role = "dialog" }: DialogProps) {
  return (
    <RDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>}
      <RDialog.Portal>
        <RDialog.Overlay className="pr-overlay" />
        <RDialog.Content className="pr-dialog" data-size={size} role={role}>
          <header className="pr-dialog__header">
            <RDialog.Title className="pr-dialog__title">{title}</RDialog.Title>
            <RDialog.Close asChild><IconButton label={closeLabel} size="sm"><IconX /></IconButton></RDialog.Close>
          </header>
          {description ? <RDialog.Description className="pr-dialog__description">{description}</RDialog.Description> : <RDialog.Description className="pr-visually-hidden">{title}</RDialog.Description>}
          {children && <div className="pr-dialog__body">{children}</div>}
          {footer && <footer className="pr-dialog__footer">{footer}</footer>}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}

export const DialogClose = RDialog.Close;

export type ConfirmDialogProps = Omit<DialogProps, "footer" | "role"> & { confirmLabel: string; cancelLabel?: string; onConfirm: () => void; tone?: "primary" | "danger"; loading?: boolean };

export function ConfirmDialog({ confirmLabel, cancelLabel = "Cancel", onConfirm, tone = "primary", loading, children, ...rest }: ConfirmDialogProps) {
  return (
    <Dialog {...rest} role="alertdialog" size="sm"
      footer={<>
        <RDialog.Close asChild><Button>{cancelLabel}</Button></RDialog.Close>
        <Button variant={tone} loading={loading} onClick={onConfirm}>{confirmLabel}</Button>
      </>}>
      {children}
    </Dialog>
  );
}

export type SheetProps = OverlayBase & { title: ReactNode; description?: ReactNode; children?: ReactNode; footer?: ReactNode; side?: "left" | "right"; closeLabel?: string };

export function Sheet({ open, defaultOpen, onOpenChange, trigger, title, description, children, footer, side = "right", closeLabel = "Close" }: SheetProps) {
  return (
    <RDialog.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      {trigger && <RDialog.Trigger asChild>{trigger}</RDialog.Trigger>}
      <RDialog.Portal>
        <RDialog.Overlay className="pr-overlay" />
        <RDialog.Content className="pr-sheet" data-side={side}>
          <header className="pr-dialog__header">
            <div>
              <RDialog.Title className="pr-dialog__title">{title}</RDialog.Title>
              {description ? <RDialog.Description className="pr-dialog__description">{description}</RDialog.Description> : <RDialog.Description className="pr-visually-hidden">{title}</RDialog.Description>}
            </div>
            <RDialog.Close asChild><IconButton label={closeLabel} size="sm"><IconX /></IconButton></RDialog.Close>
          </header>
          <div className="pr-sheet__body">{children}</div>
          {footer && <footer className="pr-dialog__footer">{footer}</footer>}
        </RDialog.Content>
      </RDialog.Portal>
    </RDialog.Root>
  );
}

export type PopoverProps = OverlayBase & { children: ReactNode; label?: string; align?: "start" | "center" | "end" };

export function Popover({ open, defaultOpen, onOpenChange, trigger, children, label, align = "center" }: PopoverProps) {
  return (
    <RPopover.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <RPopover.Trigger asChild>{trigger}</RPopover.Trigger>
      <RPopover.Portal>
        <RPopover.Content className="pr-popover" align={align} sideOffset={8} aria-label={label}>{children}</RPopover.Content>
      </RPopover.Portal>
    </RPopover.Root>
  );
}

export function Tooltip({ content, children, side = "top" }: { content: ReactNode; children: ReactNode; side?: "top" | "right" | "bottom" | "left" }) {
  return (
    <RTooltip.Provider delayDuration={400}>
      <RTooltip.Root>
        <RTooltip.Trigger asChild>{children}</RTooltip.Trigger>
        <RTooltip.Portal>
          <RTooltip.Content className="pr-tooltip" side={side} sideOffset={6}>{content}</RTooltip.Content>
        </RTooltip.Portal>
      </RTooltip.Root>
    </RTooltip.Provider>
  );
}

export function Menu({ trigger, children, align = "start", label }: { trigger: ReactNode; children: ReactNode; align?: "start" | "center" | "end"; label?: string }) {
  return (
    <RMenu.Root>
      <RMenu.Trigger asChild>{trigger}</RMenu.Trigger>
      <RMenu.Portal>
        <RMenu.Content className="pr-menu" align={align} sideOffset={6} aria-label={label}>{children}</RMenu.Content>
      </RMenu.Portal>
    </RMenu.Root>
  );
}

export function MenuItem({ children, onSelect, disabled, tone, icon, shortcut }: { children: ReactNode; onSelect?: () => void; disabled?: boolean; tone?: "danger"; icon?: ReactNode; shortcut?: string }) {
  return (
    <RMenu.Item className="pr-menu__item" onSelect={onSelect} disabled={disabled} data-tone={tone}>
      {icon && <span className="pr-menu__icon" aria-hidden="true">{icon}</span>}
      <span className="pr-menu__text">{children}</span>
      {shortcut && <span className="pr-menu__shortcut" aria-hidden="true">{shortcut}</span>}
    </RMenu.Item>
  );
}
export const MenuSeparator = () => <RMenu.Separator className="pr-menu__separator" />;
export const MenuLabel = ({ children }: { children: ReactNode }) => <RMenu.Label className="pr-menu__label">{children}</RMenu.Label>;

export function Tabs({ defaultValue, value, onValueChange, label, children, className }: { defaultValue?: string; value?: string; onValueChange?: (v: string) => void; label: string; children: ReactNode; className?: string }) {
  return <RTabs.Root className={cx("pr-tabs", className)} defaultValue={defaultValue} value={value} onValueChange={onValueChange} aria-label={label}>{children}</RTabs.Root>;
}
export function TabList({ children, label }: { children: ReactNode; label: string }) {
  return <RTabs.List className="pr-tabs__list" aria-label={label}>{children}</RTabs.List>;
}
export function Tab({ value, children, disabled }: { value: string; children: ReactNode; disabled?: boolean }) {
  return <RTabs.Trigger className="pr-tabs__tab" value={value} disabled={disabled}>{children}</RTabs.Trigger>;
}
export function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  return <RTabs.Content className="pr-tabs__panel" value={value}>{children}</RTabs.Content>;
}
