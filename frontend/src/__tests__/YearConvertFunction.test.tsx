import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserInputForm from "@/pages/EmergencyPages/emergencyCreateForm";

export function yearsToYearsMonthsDays(value: string) {
  if (Number(value) < 0) {
    return "The Year cannot be negative number";
  }
  const totalDays = Number(value) * 365;
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays - years * 365) / 30);
  const days = Math.floor(totalDays - years * 365 - months * 30);
  const result = years + " ปี " + months + " เดือน " + days + " วัน";
  if (isNaN(years) || isNaN(months) || isNaN(days)) {
    return "0 ปี 0 เดือน 0 วัน";
  }

  return result.toString();
}

describe("yearsToYearsMonthsDays function Test 1", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["60", "60 ปี 0 เดือน 0 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 2", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["60.73", "60 ปี 8 เดือน 26 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 3", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["", "0 ปี 0 เดือน 0 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 4", () => {
  describe("when given to string", () => {
    it("should return [The Year cannot be negative number]", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["-60", "The Year cannot be negative number"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 5", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["10.5", "10 ปี 6 เดือน 2 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 6", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["-5", "The Year cannot be negative number"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 7", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["1000.1000", "1000 ปี 1 เดือน 6 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 8", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["abc", "0 ปี 0 เดือน 0 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 9", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["0.0123", "0 ปี 0 เดือน 4 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});

describe("yearsToYearsMonthsDays function Test 10", () => {
  describe("when given to string", () => {
    it("should return year fornat as nปี nเดือน nวัน", () => {
      // Arrange: prepare function arguments
      const [a, expected] = ["365.785", "365 ปี 9 เดือน 16 วัน"];
      // Act: use the `divide` function
      // to get an actual function result.
      const result = yearsToYearsMonthsDays(a);
      // Assert: compare expected result
      // with a function result.
      expect(result).toEqual(expected);
    });
  });
});