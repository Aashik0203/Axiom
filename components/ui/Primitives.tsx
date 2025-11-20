import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const Badge: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className = "" }) => (
  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium ${className}`}>
    {children}
  </span>
);

export const LivePrice = ({ value, format = 'currency', className = "" }: { value: number, format?: 'currency' | 'percent', className?: string }) => {
  const prevValueRef = React.useRef(value);
  const [direction, setDirection] = React.useState<'up' | 'down' | 'neutral'>('neutral');

  React.useEffect(() => {
    if (value > prevValueRef.current) {
      setDirection('up');
      setTimeout(() => setDirection('neutral'), 1000);
    } else if (value < prevValueRef.current) {
      setDirection('down');
      setTimeout(() => setDirection('neutral'), 1000);
    }
    prevValueRef.current = value;
  }, [value]);

  const formatted = format === 'currency' 
    ? `$${value.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
    : `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;

  const colorClass = direction === 'up' 
    ? 'animate-flash-green text-success' 
    : direction === 'down' 
      ? 'animate-flash-red text-danger' 
      : className;

  return (
    <span className={`transition-colors duration-300 ${colorClass}`}>
      {formatted}
    </span>
  );
};

export const PercentBadge = ({ value }: { value: number }) => {
  const isPositive = value >= 0;
  return (
    <div className={`flex items-center space-x-0.5 text-xs ${isPositive ? 'text-success' : 'text-danger'}`}>
      {/* Icon optional at small sizes */}
      <span>{value > 0 ? '+' : ''}{value.toFixed(0)}%</span>
    </div>
  );
};

export const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse bg-surfaceHighlight rounded ${className}`} />
);