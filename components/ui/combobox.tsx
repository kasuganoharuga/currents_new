"use client";

import * as React from "react";
import { Check, Loader2 } from "lucide-react";
import { Command as CommandPrimitive } from "cmdk";

export interface ComboboxOption {
  value: string;
  label: string;
}

const inputClass =
  "w-full rounded-md border border-cream/20 bg-cream/[0.06] px-3.5 py-3 font-display text-[15px] text-cream transition-colors placeholder:text-cream/30 focus:border-lime focus:bg-cream/[0.09] focus:outline-none disabled:cursor-not-allowed disabled:opacity-45";

function Combobox({
  disabled,
  emptyText = "No results.",
  label,
  loading = false,
  onQueryChange,
  onSelect,
  options,
  placeholder = "Select an option",
  query,
  searchPlaceholder,
  value,
}: {
  disabled?: boolean;
  emptyText?: string;
  /** Accessible name for the field — cmdk renders this as its own linked (visually hidden) label, since it generates the input's id itself rather than accepting a custom one. */
  label: string;
  loading?: boolean;
  /** When provided, the combobox is "search" mode: filtering happens server-side and `options` is the current result set for `query`. */
  onQueryChange?: (query: string) => void;
  onSelect: (option: ComboboxOption) => void;
  options: readonly ComboboxOption[];
  placeholder?: string;
  query?: string;
  searchPlaceholder?: string;
  value: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [localQuery, setLocalQuery] = React.useState("");
  const serverDriven = onQueryChange !== undefined;
  const selected = options.find((option) => option.value === value);

  // The field itself is the search input — it shows the selected label when
  // closed, and whatever's being typed while open (searching resets it).
  const typed = serverDriven ? (query ?? "") : localQuery;
  const inputValue = open ? typed : (selected?.label ?? "");

  const wrapperRef = React.useRef<HTMLDivElement | null>(null);

  function openAndReset() {
    setOpen(true);
    setLocalQuery("");
    onQueryChange?.("");
  }

  function handleValueChange(next: string) {
    if (!open) setOpen(true);
    if (serverDriven) onQueryChange?.(next);
    else setLocalQuery(next);
  }

  // The list renders inline (not in a portal) so it stays inside the dialog's
  // focus scope — a portalled popover fights the modal dialog's focus trap.
  // That means dismissal is ours to handle.
  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      const wrapper = wrapperRef.current;
      if (wrapper && !wrapper.contains(event.target as Node)) setOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative">
      <CommandPrimitive shouldFilter={!serverDriven} label={label}>
        <CommandPrimitive.Input
          disabled={disabled}
          value={inputValue}
          onValueChange={handleValueChange}
          onFocus={(event) => {
            openAndReset();
            // Select the old text so the first keystroke replaces it rather
            // than appending to the label that was showing.
            event.currentTarget.select();
          }}
          onKeyDown={(event) => {
            if (event.key === "Escape") setOpen(false);
          }}
          placeholder={open ? (searchPlaceholder ?? placeholder) : placeholder}
          className={inputClass}
        />
        {open && (
          <CommandPrimitive.List
            // Keeping the press from blurring the input means the click still
            // reaches the item instead of dismissing the list first.
            onMouseDown={(event) => event.preventDefault()}
            className="themed-scrollbar-dark absolute top-full right-0 left-0 z-50 mt-1.5 max-h-60 overflow-y-auto rounded-md border border-cream/15 bg-[#161616] p-1 font-display text-cream shadow-xl"
          >
            {loading ? (
              <div className="flex items-center gap-2 px-3 py-2.5 text-[13px] text-cream/45">
                <Loader2 className="size-3.5 animate-spin" />
                Loading…
              </div>
            ) : (
              <CommandPrimitive.Empty className="px-3 py-2.5 text-[13px] text-cream/45">
                {emptyText}
              </CommandPrimitive.Empty>
            )}
            {options.map((option) => (
              <CommandPrimitive.Item
                key={option.value}
                value={serverDriven ? option.value : option.label}
                onSelect={() => {
                  onSelect(option);
                  setOpen(false);
                }}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3 py-2 text-[14px] text-cream/75 aria-selected:bg-lime aria-selected:text-ink"
              >
                {option.label}
                {option.value === value && <Check className="size-3.5" />}
              </CommandPrimitive.Item>
            ))}
          </CommandPrimitive.List>
        )}
      </CommandPrimitive>
    </div>
  );
}

export { Combobox };
