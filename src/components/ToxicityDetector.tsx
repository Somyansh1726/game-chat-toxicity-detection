import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ToxicityDetectorProps {
  onResult: (confidence: number) => void;
}

const ToxicityDetector = ({ onResult }: ToxicityDetectorProps) => {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyze = useCallback(async () => {
    if (!message.trim()) return;

    setIsAnalyzing(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: message }),
      });

      const data = await response.json();

      const formatted = {
        labels: data.labels,
        max_label: data.max_label,
        max_confidence: data.max_confidence,
        severity: data.severity,
        explanation: data.explanation,
        resultText:
          data.labels.threat.value
            ? "🔴 Threat Detected"
            : data.labels.obscene.value
            ? "🔴 Obscene Content"
            : data.labels.insult.value
            ? "🟡 Insult Detected"
            : data.labels.toxic.value
            ? "🟡 Toxic Message"
            : "🟢 Clean Message",
        resultColor:
          data.labels.threat.value || data.labels.obscene.value
            ? "red"
            : data.labels.insult.value || data.labels.toxic.value
            ? "yellow"
            : "green",
      };

      setResult(formatted);
      onResult(data.max_confidence);

    } catch (error) {
      console.error("API ERROR:", error);
    }

    setIsAnalyzing(false);
  }, [message, onResult]);

  const getIcon = () => {
    if (!result) return <Search className="w-7 h-7 text-primary" />;
    if (result.resultColor === "red") return <AlertTriangle className="w-7 h-7 text-danger" />;
    if (result.resultColor === "yellow") return <AlertCircle className="w-7 h-7 text-warning" />;
    return <CheckCircle className="w-7 h-7 text-safe" />;
  };

  return (
    <motion.div
      className="glass-card p-8 transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        {getIcon()}
        <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">
          Analyze Message
        </h2>
      </div>

      <div className="space-y-4">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && analyze()}
          placeholder="Type a message to analyze..."
        />

        <Button
          onClick={analyze}
          disabled={isAnalyzing || !message.trim()}
          className="w-full"
        >
          {isAnalyzing ? "Analyzing..." : "Analyze Message"}
        </Button>

        {result && (
          <motion.div
            className="mt-4 space-y-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center text-lg font-bold">
              {result.resultText}
            </div>

            <div className="text-center">
              <p>
                {result.max_label.toUpperCase()} → {result.max_confidence}%
              </p>
              <p>Severity: {result.severity}</p>
              <p>{result.explanation}</p>
            </div>

            <div className="w-full h-[18px] bg-gray-700 rounded overflow-hidden">
              <motion.div
                className="h-full"
                style={{
                  background:
                    result.max_confidence >= 80
                      ? "red"
                      : result.max_confidence >= 50
                      ? "yellow"
                      : "green",
                }}
                initial={{ width: 0 }}
                animate={{ width: `${result.max_confidence}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ToxicityDetector;