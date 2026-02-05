import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

export const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon,
  trend,
  variant = 'default',
  className 
}: StatCardProps) => {
  const variantStyles = {
    default: 'text-primary',
    success: 'text-success',
    warning: 'text-warning',
    danger: 'text-danger',
  };

  const iconBgStyles = {
    default: 'bg-primary/10',
    success: 'bg-success/10',
    warning: 'bg-warning/10',
    danger: 'bg-danger/10',
  };

  return (
    <div className={cn("stat-card", className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className={cn("text-3xl font-bold", variantStyles[variant])}>
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
          {trend && (
            <p className={cn(
              "text-sm mt-2 flex items-center gap-1",
              trend.isPositive ? "text-success" : "text-danger"
            )}>
              <span>{trend.isPositive ? '↑' : '↓'}</span>
              <span>{Math.abs(trend.value)}% from yesterday</span>
            </p>
          )}
        </div>
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center",
          iconBgStyles[variant]
        )}>
          <Icon className={cn("w-6 h-6", variantStyles[variant])} />
        </div>
      </div>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
}

export const ChartCard = ({ title, children, className, actions }: ChartCardProps) => {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-foreground">{title}</h3>
        {actions}
      </div>
      {children}
    </div>
  );
};

interface TableCardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export const TableCard = ({ title, children, className }: TableCardProps) => {
  return (
    <div className={cn("dashboard-card overflow-hidden", className)}>
      <h3 className="font-semibold text-foreground mb-4">{title}</h3>
      <div className="overflow-x-auto -mx-5">
        <div className="px-5">
          {children}
        </div>
      </div>
    </div>
  );
};
