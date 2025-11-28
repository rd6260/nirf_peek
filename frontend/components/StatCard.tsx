import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'primary' | 'secondary' | 'accent' | 'green' | 'red';
}

export default function StatCard({ title, value, subtitle, icon: Icon, trend, color = 'primary' }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent/10 text-accent border-accent/20',
    green: 'bg-accent-green/10 text-accent-green border-accent-green/20',
    red: 'bg-accent-red/10 text-accent-red border-accent-red/20',
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-muted-foreground text-sm font-medium">{title}</p>
          <h3 className="text-3xl font-bold text-foreground mt-2">{value}</h3>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-2">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}