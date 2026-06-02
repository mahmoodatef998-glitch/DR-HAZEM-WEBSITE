"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface Props {
  value: string;
  className?: string;
}

export default function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Parse: "200+" -> prefix="", num=200, suffix="+"
  //        "4.9/5" -> prefix="", num=4.9, suffix="/5"
  //        "98%"  -> prefix="", num=98,  suffix="%"
  //        "GCC"  -> no match — just render as-is
  const match = value.match(/^([^\d]*)(\d+\.?\d*)(.*)$/);
  const numericPart = match ? parseFloat(match[2]) : null;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[3] : "";
  const isDecimal = numericPart !== null && !Number.isInteger(numericPart);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: 2000, bounce: 0 });
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
