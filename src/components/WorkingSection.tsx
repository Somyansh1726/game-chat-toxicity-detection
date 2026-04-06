import { motion } from "framer-motion";
import { Cpu, ArrowRight } from "lucide-react";

const steps = [
  { title: "Input Text", desc: "User enters a chat message to analyze" },
  { title: "TF-IDF Vectorization", desc: "Text is converted into numerical features using TF-IDF" },
  { title: "Multi-Label Classification", desc: "ML model predicts toxic, insult, obscene & threat labels" },
  { title: "Severity Assessment", desc: "System determines LOW / MEDIUM / HIGH severity" },
  { title: "Visual Feedback", desc: "Results displayed with color-coded indicators & toxicity bar" },
];

const WorkingSection = () => {
  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Cpu className="w-7 h-7 text-primary" />
        <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">
          How It Works
        </h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            className="flex items-start gap-4 group"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="font-heading text-xs font-bold text-primary">{i + 1}</span>
            </div>
            <div>
              <h4 className="font-heading text-sm font-semibold text-foreground mb-1">
                {step.title}
              </h4>
              <p className="text-muted-foreground text-xs font-body">{step.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <ArrowRight className="w-3 h-3 text-muted-foreground/30 mt-2 ml-auto hidden sm:block" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 rounded-lg bg-secondary/50 border border-border">
        <p className="text-xs text-muted-foreground font-body">
          <span className="text-primary font-semibold">Tech Stack:</span> Python, Scikit-learn,
          TF-IDF Vectorizer, Logistic Regression, Flask API
        </p>
      </div>
    </motion.div>
  );
};

export default WorkingSection;
