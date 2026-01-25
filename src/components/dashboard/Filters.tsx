import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export const FilterSelect = ({ label, value, onChange, options, className }: FilterSelectProps) => {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <label className="text-xs text-muted-foreground">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="filter-select"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

interface FilterBarProps {
  children: ReactNode;
  className?: string;
}

export const FilterBar = ({ children, className }: FilterBarProps) => {
  return (
    <div className={cn("dashboard-card flex flex-wrap items-end gap-4 mb-5", className)}>
      {children}
    </div>
  );
};
