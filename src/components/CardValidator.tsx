import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";
import { CardType } from "../types/types";

interface CardValidatorProps {
  isValid: boolean | null;
  cardType: CardType | null;
}

const CardValidator: React.FC<CardValidatorProps> = ({ isValid, cardType }) => (
  <AnimatePresence>
    {isValid !== null && (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`w-full p-4 rounded-lg shadow-lg flex items-center justify-between ${
          isValid ? "bg-green-500" : "bg-red-500"
        } text-white`}
      >
        <div className="flex items-center space-x-3">
          {isValid ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
          <span className="text-lg font-semibold">
            {isValid ? "Valid Card Number" : "Invalid Card Number"}
          </span>
        </div>
        {cardType && (
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
            {cardType.name}
          </span>
        )}
      </motion.div>
    )}
  </AnimatePresence>
);

export default CardValidator;
