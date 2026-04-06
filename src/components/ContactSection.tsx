import { motion } from "framer-motion";
import { Users, Github, Mail } from "lucide-react";

const ContactSection = () => {
  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-7 h-7 text-primary" />
        <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">
          Contact & Team
        </h2>
      </div>

      <div className="space-y-4">
        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
          <h4 className="font-heading text-sm font-semibold text-foreground mb-1">
            Somyansh Bishnoi
          </h4>
          <p className="text-xs text-muted-foreground font-body">Backend & ML Development</p>
        </div>

        <div className="p-4 rounded-lg bg-secondary/30 border border-border">
          <h4 className="font-heading text-sm font-semibold text-foreground mb-1">
            Preksha Verma
          </h4>
          <p className="text-xs text-muted-foreground font-body">Frontend UI Implementation</p>
        </div>

        <div className="flex gap-3 mt-4">
          <a
            href="https://github.com/Somyansh1726/game-chat-toxicity-detection"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-body"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="mailto:contact@toxicitydetector.com"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all text-sm font-body"
          >
            <Mail className="w-4 h-4" />
            Email
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactSection;
