import { ReactNode } from "react";

interface ToolGroupProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function ToolGroup({ title, children, className = "" }: ToolGroupProps) {
  return (
    <section className={`space-y-4 ${className}`}>
      <h2 className="text-2xl font-semibold text-foreground border-b border-border pb-2">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  );
}