import React from "react";
import { render, fireEvent } from "@testing-library/react";
import UserInputForm from "@/pages/EmergencyPages/emergencyCreateForm";

const tvmCalculator = require("tvm-calculator");
function numberPeriods(
    pvInput: number,
    fvInput: number,
    pmInputt: number,
    rateInput: number
  ) {
    const remainTimeTvmResult = tvmCalculator.calcNPer({
      pv: -pvInput,
      fv: fvInput,
      pmt: -pmInputt,
      rate: rateInput,
    });
    return remainTimeTvmResult;
  }

  describe("Time Value Money Number of Period function Test 1", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["9.99"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, 100, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 2", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["9.99"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(-1000, -2000, -100, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 3", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["0.00"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(0, 0, -100, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 4", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["16635.88"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, 0, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 5", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["10.00"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, 100, 0);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 6", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["10.01"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, 100, -0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 7", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["0.00"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 1000, 100, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 8", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["-10.01"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, -100, 0.05);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 9", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["Infinity"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(1000, 2000, 0, 0);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });

  describe("Time Value Money Number of Period function Test 10", () => {
    describe("when given to string", () => {
      it("should return in Number", () => {
        // Arrange: prepare function arguments
        const [expected] = ["10.00"];
        // Act: use the `divide` function
        // to get an actual function result.
        const result = numberPeriods(0.0001, 0.0002, 0.00001, 0.001);
        // Assert: compare expected result
        // with a function result.
        expect(result).toEqual(expected);
      });
    });
  });