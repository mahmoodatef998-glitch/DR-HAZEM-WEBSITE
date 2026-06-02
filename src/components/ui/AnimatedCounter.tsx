"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReduced = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  const numericPart = match ? parseFloat(match[2]) : null;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const isDecimal = numericPart !== null && !Number.isInteger(numericPart);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(
    motionValue,
    prefersReduced
      ? { stiffness: 1000, damping: 100 }
      : { stiffness: 40, damping: 20, mass: 1 }
  );
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (isInView && numericPart !== null) {
      motionValue.set(numericPart);
    }
  }, [isInView, numericPart, motionValue]);

  useEffect(() => {
    return springValue.on("change", (v) => {
      setDisplay(isDecimal ? v.toFixed(1) : String(Math.round(v)));
    });
  }, [springValue, isDecimal]);

  if (numericPart === null) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}{isInView ? display : "0"}{suffix}
    </span>
  );
}
