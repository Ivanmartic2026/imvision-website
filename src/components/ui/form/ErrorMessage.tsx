"use client";

import { motion, AnimatePresence } from "motion/react";

interface ErrorMessageProps {
  id: string;
  message?: string;
}

export function ErrorMessage({ id, message }: ErrorMessageProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          className="mt-2 text-sm text-red-400"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
