import { motion } from "framer-motion";

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  margin = "-60px",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  margin?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
