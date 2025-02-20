
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  label?: string;
  showValue?: boolean;
  animate?: boolean;
}

export const ProgressBar = ({
  value,
  max = 100,
  className,
  label,
  showValue = true,
  animate = true,
}: ProgressBarProps) => {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        {label && <span className="text-muted-foreground">{label}</span>}
        {showValue && (
          <span className="text-foreground font-medium">{percentage}%</span>
        )}
      </div>
      <Progress 
        value={percentage} 
        className={cn(
          "h-2 transition-all duration-300",
          animate && "animate-progress"
        )}
      />
    </div>
  );
};
