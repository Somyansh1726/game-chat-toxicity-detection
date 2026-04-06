import { useState } from "react";
import { motion } from "framer-motion";
import DitherBackground from "@/components/DitherBackground";
import ToxicityBar from "@/components/ToxicityBar";
import AboutSection from "@/components/AboutSection";
import WorkingSection from "@/components/WorkingSection";
import ToxicityDetector from "@/components/ToxicityDetector";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  const [toxicityLevel, setToxicityLevel] = useState(0);

  return (
    <div className="relative min-h-screen">
      <DitherBackground />

      {/* Header */}
      <motion.header
        className="text-center pt-10 pb-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground tracking-wider">
          Real-Time Toxicity Detection
        </h1>
        <p className="font-heading text-sm text-primary mt-2 tracking-widest uppercase">
          in Online Communication Platforms
        </p>
      </motion.header>

      {/* Main layout */}
      <div className="flex justify-center gap-8 px-4 pb-12">
        {/* Left: Toxicity Bar */}
        <div className="hidden md:flex flex-shrink-0 sticky top-8 self-start">
          <ToxicityBar percentage={toxicityLevel} />
        </div>

        {/* Center: Content boxes */}
        <div className="flex-1 max-w-2xl space-y-6">
          <AboutSection />
          <WorkingSection />
          <ToxicityDetector onResult={setToxicityLevel} />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
