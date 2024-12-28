import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ValidationStep } from "../types/types";

interface ValidationStepsProps {
  steps: ValidationStep[];
}

const ValidationSteps: React.FC<ValidationStepsProps> = ({ steps }) => (
  <AnimatePresence>
    {steps.map((step, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ delay: index * 0.2 }}
        className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500"
      >
        <h3 className="font-semibold text-gray-700">{step.title}</h3>
        <div className="mt-2 font-mono text-gray-600">
          Result: {step.result}
        </div>
      </motion.div>
    ))}
  </AnimatePresence>
);

export default ValidationSteps;
