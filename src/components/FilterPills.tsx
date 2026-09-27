import { cn } from "@/lib/utils";

interface FilterPillsProps<T extends string> {
  label: string;
  /** T is inferred from here only, so a typed options array fixes the value type */
  options: readonly T[];
  value: NoInfer<T>;
  onChange: (value: NoInfer<T>) => void;
  /** Optional text shown instead of the raw option value */
  format?: (value: NoInfer<T>) => string;
}

/** Row of mono pill toggles; the selected one is filled. */
// function (not an arrow) so the generic <T> is never mistaken for JSX by the dev-mode tagger
function FilterPills<T extends string>({ label, options, value, onChange, format }: FilterPillsProps<T>) {
  return (
  <div className="flex flex-wrap gap-1.5" role="group" aria-label={label}>
    {options.map((option) => (
      <button
        key={option}
        onClick={() => onChange(option)}
        aria-pressed={value === option}
        className={cn(
          "rounded-full border px-2.5 py-1 font-mono text-xs transition-colors",
          value === option
            ? "border-foreground bg-foreground text-background"
            : "border-border text-muted-foreground hover:text-foreground",
        )}
      >
        {format ? format(option) : option}
      </button>
    ))}
  </div>
  );
}

export default FilterPills;
