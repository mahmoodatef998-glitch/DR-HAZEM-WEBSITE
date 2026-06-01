import { cn } from "@/lib/utils";
import Badge from "./Badge";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeader({
  badge,
  title,
  highlight,
  description,
  centered = true,
  className,
}: SectionHeaderProps) {
  const parts = highlight ? title.split(highlight) : [title];

  return (
    <div className={cn(centered && "text-center", "max-w-3xl", centered && "mx-auto", className)}>
      {badge && (
        <div className={cn("mb-4", centered && "flex justify-center")}>
          <Badge variant="blue">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
            {badge}
          </Badge>
        </div>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4">
        {parts[0]}
        {highlight && (
          <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
        {parts[1]}
      </h2>
      {description && (
        <p className="text-slate-500 text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
