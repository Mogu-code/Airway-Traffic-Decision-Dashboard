import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'On Time' | 'Delayed' | 'Cancelled' | string;
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  const getBadgeClass = () => {
    switch (status) {
      case 'On Time':
        return 'badge-success';
      case 'Delayed':
        return 'badge-warning';
      case 'Cancelled':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  return (
    <span className={cn(getBadgeClass(), className)}>
      {status}
    </span>
  );
};

interface CongestionBadgeProps {
  level: 'Low' | 'Medium' | 'High';
  className?: string;
}

export const CongestionBadge = ({ level, className }: CongestionBadgeProps) => {
  const getBadgeClass = () => {
    switch (level) {
      case 'Low':
        return 'badge-success';
      case 'Medium':
        return 'badge-warning';
      case 'High':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  return (
    <span className={cn(getBadgeClass(), className)}>
      {level}
    </span>
  );
};

interface SeverityBadgeProps {
  severity: 'Low' | 'Medium' | 'High';
  className?: string;
}

export const SeverityBadge = ({ severity, className }: SeverityBadgeProps) => {
  const getBadgeClass = () => {
    switch (severity) {
      case 'Low':
        return 'badge-success';
      case 'Medium':
        return 'badge-warning';
      case 'High':
        return 'badge-danger';
      default:
        return 'badge-primary';
    }
  };

  return (
    <span className={cn(getBadgeClass(), className)}>
      {severity}
    </span>
  );
};
