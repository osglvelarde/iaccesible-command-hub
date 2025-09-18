import { ArrowLeftRight, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ToolCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  badge?: {
    text: string;
    variant?: "default" | "success" | "warning" | "destructive";
  };
  className?: string;
}

export function ToolCard({ icon: Icon, title, description, href, badge, className = "" }: ToolCardProps) {
  const handleClick = () => {
    window.location.href = href;
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  };

  const getBadgeStyles = (variant: string = "default") => {
    const variants = {
      default: "bg-primary text-primary-foreground",
      success: "bg-success text-success-foreground",
      warning: "bg-warning text-warning-foreground",
      destructive: "bg-destructive text-destructive-foreground",
    };
    return variants[variant as keyof typeof variants] || variants.default;
  };

  return (
    <Card
      className={`group relative card-hover cursor-pointer border border-border bg-card hover:bg-card-hover focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 ${className}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${title} — Opens in a new page`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4 flex-1">
            {/* Icon */}
            <div className="flex-shrink-0">
              <div className="p-3 bg-primary/10 rounded-lg">
                <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-card-foreground">
                  {title}
                </h3>
                {badge && (
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getBadgeStyles(badge.variant)} badge-animate`}>
                    {badge.text}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {description}
              </p>
            </div>
          </div>

          {/* Arrow Indicator */}
          <div className="flex-shrink-0 ml-4">
            <ArrowLeftRight 
              className="w-5 h-5 text-muted-foreground arrow-slide" 
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Tooltip for screen readers */}
        <span className="sr-only">Opens in a new page</span>
      </div>
    </Card>
  );
}