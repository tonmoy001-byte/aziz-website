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
      className={`flex items-center gap-1 border border-border rounded-xl bg-surface p-1 ${className ?? ""}`}
    >
      <button
        onClick={decrement}
        disabled={disabled || value <= min}
        aria-label="পরিমাণ কমাতে চাপুন"
        className="flex w-8 h-8 items-center justify-center rounded-lg text-text transition-colors disabled:opacity-50 disabled:pointer-events-none hover:bg-primary hover:text-surface"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className="w-6 text-center font-medium tabular-nums">
        {formatBnNumber(value)}
      </span>
      <button
        onClick={increment}
        disabled={disabled || value >= max}
        aria-label="পরিমাণ বাড়াতে চাপুন"
        className="flex w-8 h-8 items-center justify-center rounded-lg text-text transition-colors disabled:opacity-50 disabled:pointer-events-none hover:bg-primary hover:text-surface"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
