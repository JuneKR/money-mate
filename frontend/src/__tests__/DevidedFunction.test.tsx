import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserInputForm from "@/pages/EmergencyPages/emergencyCreateForm";
// import multiply from '@/components/SavingEmergency/EmergencyForm/PlanForm';

export function divided(x: string,  y: string): string {
  const numX = Number(x);
  const numY = Number(y);
  if (Number.isNaN(numX) || Number.isNaN(numY)) {
    return "Invalid input";
  }
  if (numY === 0) {
    throw new Error("You can't divide by zero.");
  }
  const result = numX / numY / 12;
  return result.toString();
}

describe("divide function", () => {
  describe("when given to integers", () => {
    it("should return a division result", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      // In this example 10 / 2 === 5:
      const [a, b, expected] = ["10", "2", "0.417"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = divided(a, b);
      const formattedResult = Number(result).toFixed(3);
      // Assert: compare expected result
      // with a function result.
      expect(formattedResult).toEqual(expected);
    });
  });
});
