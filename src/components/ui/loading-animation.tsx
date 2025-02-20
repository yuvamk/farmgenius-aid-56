
import { Loader2, Tractor, Sprout, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingAnimationProps {
  type?: "spinner" | "tractor" | "plant" | "success";
  size?: "sm" | "md" | "lg";
  className?: string;
  text?: string;
}

export const LoadingAnimation = ({
  type = "spinner",
  size = "md",
  className,
  text
}: LoadingAnimationProps) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12"
  };

  const renderAnimation = () => {
    switch (type) {
      case "tractor":
        return <Tractor className={cn("text-primary animate-tractor", sizeClasses[size])} />;
      case "plant":
        return <Sprout className={cn("growing-plant", sizeClasses[size])} />;
      case "success":
        return <Check className={cn("checkmark-animation", sizeClasses[size])} />;
      default:
        return <Loader2 className={cn("animate-spin text-primary", sizeClasses[size])} />;
    }
  };

  return (
    <div className={cn("flex flex-col items-center justify-center gap-2", className)}>
      {renderAnimation()}
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
};
