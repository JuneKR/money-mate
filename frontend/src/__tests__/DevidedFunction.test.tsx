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
    // throw new Error("You can't divide by zero.");
    return "You can't divide by zero.";
  }
  const result = numX / numY / 12;
  return result.toString();
}

describe("divide function test 1", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
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

describe("divide function test 2", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["foo", "bar", "NaN"];
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

describe("divide function test 3", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["-10", "2", "-0.417"];
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

describe("divide function test 4", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["10", "-2", "-0.417"];
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

describe("divide function test 5", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["5.5", "2.5", "0.183"];
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

describe("divide function test 6", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["10000000", "50000", "16.67"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = divided(a, b);
      const formattedResult = Number(result).toFixed(2);
      // Assert: compare expected result
      // with a function result.
      expect(formattedResult).toEqual(expected);
    });
  });
});

describe("divide function test 7", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["10", "0", "NaN"];
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

describe("divide function test 8", () => {
  describe("when given to integers", () => {
    it("should return a division result a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["0", "10", "0.000"];
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

describe("divide function test 9", () => {
  describe("when given to integers", () => {
    it("should return a division result  a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["10", "0.25", "3.3333333333333335"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = divided(a, b);
      const formattedResult = Number(result).toFixed(16);
      // Assert: compare expected result
      // with a function result.
      expect(formattedResult).toEqual(expected);
    });
  });
});

describe("divide function test 10", () => {
  describe("when given to integers", () => {
    it("should return a division result  a / b / 12", () => {
      // Arrange: prepare function arguments
      // and the expected division result.
      const [a, b, expected] = ["10", "1.5", "0.5555555555555556"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = divided(a, b);
      const formattedResult = Number(result).toFixed(16);
      // Assert: compare expected result
      // with a function result.
      expect(formattedResult).toEqual(expected);
    });
  });
});
