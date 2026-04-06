import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

const AboutSection = () => {
  return (
    <motion.div
      className="glass-card p-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="w-7 h-7 text-primary" />
        <h2 className="font-heading text-xl font-bold tracking-wider text-foreground">
          About
        </h2>
      </div>

      <h3 className="font-heading text-lg font-semibold text-primary mb-4 leading-relaxed">
        Real-Time Toxicity Detection in Online Communication Platforms
      </h3>

      <div className="space-y-4 text-muted-foreground font-body text-sm leading-relaxed">
        <p>
          This project focuses on addressing one of the most critical challenges in today's digital
          world—managing harmful and toxic interactions in online environments. With the rapid growth
          of social media platforms, gaming communities, and online discussion forums, communication
          has become instant and global. While this has improved connectivity, it has also led to an
          increase in toxic behavior such as abusive language, hate speech, and offensive comments,
          which negatively impact user experience and platform credibility.
        </p>
        <p>
          In many existing systems, moderation of such harmful content is either manual or
          semi-automated, which makes it inefficient and inconsistent. Human moderators cannot handle
          the massive volume of messages generated every second, and delays in moderation allow toxic
          content to spread quickly. This creates an urgent need for an intelligent, automated
          solution that can analyze and filter harmful content in real time without human
          intervention.
        </p>
        <p>
          To address this issue, we propose the development of an AI-based system that uses Natural
          Language Processing (NLP) and Machine Learning (ML) techniques to detect and classify
          toxic messages instantly.
        </p>
        <p>
          Overall, this project aims to contribute toward building safer and more respectful online
          communities by automating the detection of harmful language. It not only improves
          moderation efficiency but also enhances user trust and engagement by ensuring a healthier
          communication environment.
        </p>
      </div>
    </motion.div>
  );
};

export default AboutSection;
