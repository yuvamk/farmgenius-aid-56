
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedTooltipProps {
  content: React.ReactNode;
  children?: React.ReactNode;
  showIcon?: boolean;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
}

export const EnhancedTooltip = ({
  content,
  children,
  showIcon = true,
  className,
  side = "top",
}: EnhancedTooltipProps) => {
  return (
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>
        <div className={cn("inline-flex items-center gap-1 cursor-help", className)}>
          {children}
          {showIcon && <HelpCircle className="h-4 w-4 text-muted-foreground" />}
        </div>
      </TooltipTrigger>
      <TooltipContent 
        side={side}
        className="bg-background/95 backdrop-blur-sm border shadow-lg animate-fadeIn"
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};
