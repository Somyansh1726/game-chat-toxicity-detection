import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Bubble {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  bottom: number;
}

interface ToxicityBarProps {
  percentage: number;
}

const ToxicityBar = ({ percentage }: ToxicityBarProps) => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  // Match script.js thresholds: <50 green, 50-80 yellow, >=80 red
  const barColor = useMemo(() => {
    if (percentage < 50) return "hsl(var(--safe))";
    if (percentage < 80) return "hsl(var(--warning))";
    return "hsl(var(--danger))";
  }, [percentage]);

  const glowColor = useMemo(() => {
    if (percentage < 50) return "hsla(var(--safe) / 0.4)";
    if (percentage < 80) return "hsla(var(--warning) / 0.4)";
    return "hsla(var(--danger) / 0.4)";
  }, [percentage]);

  // Match app.py severity: <40 LOW, <75 MEDIUM, >=75 HIGH
  const severity = useMemo(() => {
    if (percentage < 40) return "LOW";
    if (percentage < 75) return "MEDIUM";
    return "HIGH";
  }, [percentage]);

  useEffect(() => {
    if (percentage <= 10) {
      setBubbles([]);
      return;
    }

    const bubbleCount = percentage > 75 ? 12 : percentage > 40 ? 6 : 2;
    const interval = setInterval(() => {
      setBubbles((prev) => {
        const newBubble: Bubble = {
          id: Date.now() + Math.random(),
          left: 10 + Math.random() * 80,
          size: 3 + Math.random() * (percentage > 75 ? 8 : 4),
          delay: 0,
          duration: 1.5 + Math.random() * 2,
          bottom: percentage - 5,
        };
        const updated = [...prev, newBubble].slice(-bubbleCount * 3);
        return updated;
      });
    }, percentage > 75 ? 200 : percentage > 40 ? 500 : 1200);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="flex flex-col items-center gap-4">
      <h3 className="font-heading text-sm tracking-widest uppercase text-muted-foreground">
        Toxicity Level
      </h3>

      {/* Vertical bar container */}
      <div
        className="relative w-16 h-80 rounded-2xl overflow-hidden border border-border"
        style={{ background: "hsl(var(--muted))" }}
      >
        {/* Liquid fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl"
          style={{
            background: barColor,
            boxShadow: `0 0 20px ${glowColor}, inset 0 2px 10px rgba(255,255,255,0.1)`,
            animation: percentage > 10 ? "liquidWave 3s ease-in-out infinite" : "none",
          }}
          animate={{ height: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Liquid surface wave */}
          <div
            className="absolute top-0 left-0 right-0 h-3 rounded-t-full opacity-40"
            style={{
              background: `linear-gradient(180deg, rgba(255,255,255,0.3), transparent)`,
            }}
          />
        </motion.div>

        {/* Bubbles */}
        <AnimatePresence>
          {bubbles.map((bubble) => (
            <motion.div
              key={bubble.id}
              className="absolute rounded-full"
              style={{
                left: `${bubble.left}%`,
                bottom: `${Math.max(0, bubble.bottom - 10)}%`,
                width: bubble.size,
                height: bubble.size,
                background: `rgba(255,255,255,0.5)`,
                border: "1px solid rgba(255,255,255,0.3)",
              }}
              initial={{ opacity: 0.8, y: 0, scale: 1 }}
              animate={{ opacity: 0, y: -100, scale: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: bubble.duration, ease: "easeOut" }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Percentage text */}
      <motion.div
        className="text-center"
        key={percentage}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <span className="font-heading text-2xl font-bold" style={{ color: barColor }}>
          {percentage}%
        </span>
        <p className="text-xs text-muted-foreground mt-1 font-heading tracking-wider">
          {severity}
        </p>
      </motion.div>
    </div>
  );
};

export default ToxicityBar;
