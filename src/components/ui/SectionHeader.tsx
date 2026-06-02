"use client";

import { motion, type Variants } from "framer-motion";
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

const E = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const badgeVariant: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.94 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: E } },
};

const headingVariant: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: E } },
};

const descVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease: E } },
};

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
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      className={cn(centered && "text-center", "max-w-3xl", centered && "mx-auto", className)}
    >
      {badge && (
        <motion.div variants={badgeVariant} className={cn("mb-4", centered && "flex justify-center")}>
          <Badge variant="blue">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 inline-block" />
            {badge}
          </Badge>
        </motion.div>
      )}

      <motion.h2
        variants={headingVariant}
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
      >
        {parts[0]}
        {highlight && (
          <span className="bg-gradient-to-r from-sky-500 to-teal-500 bg-clip-text text-transparent">
            {highlight}
          </span>
        )}
        {parts[1]}
      </motion.h2>

      {description && (
        <motion.p variants={descVariant} className="text-slate-500 text-lg leading-relaxed">
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
