import React, { useState } from "react";
import CardValidator from "./CardValidator";
import CardDisplay from "./CardDisplay";
import ValidationSteps from "./ValidationSteps";
import { CardType, ValidationStep } from "../types/types";

const cardTypes: Record<number, CardType> = {
  4: { name: "Visa", color: "border-blue-600" },
  5: { name: "MasterCard", color: "border-orange-600" },
  6: { name: "Rupay", color: "border-green-600" },
};

const ATMCardValidator: React.FC = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [validationSteps, setValidationSteps] = useState<ValidationStep[]>([]);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [cardType, setCardType] = useState<CardType | null>(null);

  const formatCardNumber = (value: string): string => {
    const cleaned = value.replace(/\D/g, "");
    const chunks = cleaned.match(/.{1,4}/g) || [];
    return chunks.join(" ");
  };

  const validateCard = (number: string): void => {
    const steps: ValidationStep[] = [];
    const cleaned = number.replace(/\s/g, "");

    if (cleaned.length !== 16) return;

    const firstDigit = parseInt(cleaned[0], 10);
    const cardIssuer = cardTypes[firstDigit];
    setCardType(cardIssuer);

    const doubled: number[] = [];
    for (let i = 0; i < cleaned.length - 1; i += 2) {
      const digit = parseInt(cleaned[i], 10);
      const doubledValue = digit * 2;
      doubled.push(doubledValue);
    }
    steps.push({
      title: "Step 1: Double alternate digits",
      result: doubled.join(", "),
    });

    let sumDoubled = 0;
    doubled.forEach((num) => {
      if (num > 9) {
        sumDoubled += Math.floor(num / 10) + (num % 10);
      } else {
        sumDoubled += num;
      }
    });
    steps.push({
      title: "Step 2: Sum doubled digits",
      result: sumDoubled.toString(),
    });

    let sumOthers = 0;
    for (let i = 1; i < cleaned.length - 1; i += 2) {
      sumOthers += parseInt(cleaned[i], 10);
    }
    steps.push({
      title: "Step 3: Sum remaining digits",
      result: sumOthers.toString(),
    });

    const totalSum = sumDoubled + sumOthers;
    const checksum = (10 - (totalSum % 10)) % 10;
    const lastDigit = parseInt(cleaned[cleaned.length - 1], 10);

    steps.push({
      title: "Step 4: Calculate checksum",
      result: `Expected: ${checksum}, Actual: ${lastDigit}`,
    });

    setValidationSteps(steps);
    setIsValid(checksum === lastDigit);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.length <= 19) {
      setCardNumber(formatted);
      if (formatted.replace(/\s/g, "").length === 16) {
        validateCard(formatted);
      } else {
        setValidationSteps([]);
        setIsValid(null);
        setCardType(null);
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-8">
      <CardValidator isValid={isValid} cardType={cardType} />
      <CardDisplay cardNumber={cardNumber} cardType={cardType} />
      <div className="space-y-4">
        <input
          type="text"
          value={cardNumber}
          onChange={handleInputChange}
          placeholder="Enter 16-digit card number"
          className="w-full p-3 border rounded-lg text-lg font-mono"
          maxLength={19}
        />
      </div>
      <ValidationSteps steps={validationSteps} />
    </div>
  );
};

export default ATMCardValidator;
