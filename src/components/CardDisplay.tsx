import React from "react";
import { motion } from "framer-motion";
import { CardType } from "../types/types";
import Visa from "../assets/Visa.svg";
import MasterCard from "../assets/Mastercard.svg";
import Rupay from "../assets/Rupay.svg";

interface CardDisplayProps {
  cardNumber: string;
  cardType: CardType | null;
}

const cardImages: Record<string, string> = {
  Visa: Visa,
  MasterCard: MasterCard,
  Rupay: Rupay,
};

const CardDisplay: React.FC<CardDisplayProps> = ({ cardNumber, cardType }) => (
  <motion.div
    className={`p-6 rounded-xl shadow-xl border ${cardType?.color} text-white`}
    initial={{ scale: 0.95 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.3 }}
  >
    <div className="flex justify-center items-center flex-col space-y-4">
      <div className="text-xl font-mono text-black">
        {cardNumber || "#### #### #### ####"}
      </div>
      {cardType?.name && cardImages[cardType.name] ? (
        <img
          className=" w-20"
          src={cardImages[cardType.name]}
          alt={cardType.name}
        />
      ) : null}{" "}
    </div>
  </motion.div>
);

export default CardDisplay;
