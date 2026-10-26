import { useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import { formatBnNumber } from "../utils/bn";

interface QuantityStepperProps {
  value: number;
  onChange: (qty: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
  className?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 20,
  disabled,
  className,
}: QuantityStepperProps) {
  const decrement = useCallback(() => onChange(Math.max(min, value - 1)), [
    min,
    value,
    onChange,
  ]);
  const increment = useCallback(() => onChange(Math.min(max, value + 1)), [
    max,
    value,
    onChange,
  ]);

  return (
    <div
      className={`flex items-center gap-1 rounded-xl border border-border bg-surface p-1 ${className ?? ""}`}
    >
      <button
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="পরিমাণ কমাতে চাপুন"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-text transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <Minus className="h-4 w-4" aria-hidden="true" />
      </button>
      <span className="w-6 text-center font-semibold tabular-nums">
        {formatBnNumber(value)}
      </span>
      <button
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="পরিমাণ বাড়াতে চাপুন"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-text transition-colors hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-40"
      >
        <Plus className="h-4 w-4" aria-hidden="true" />
      </button>
    </div>
  );
}
