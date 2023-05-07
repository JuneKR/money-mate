import { render, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { GoalForm } from "@/components/SavingEmergency/EmergencyForm/GoalForm";

test("form inputs should update state when changed", () => {
  const goalData = {
    expense: 15000,
    period: 6,
    monthlySaving: 1000,
    totalBalance: 0,
  };

  const updateFields = jest.fn();
  const { getByLabelText } = render(
    <GoalForm {...goalData} updateFields={updateFields} />
  );

  // Find input elements by their respective labels
  const expenseInput = getByLabelText(/ค่าใช้จ่ายรายเดือนของคุณ/i);
  const savingInput = getByLabelText(/จำนวนเงินที่จะออมต่อเดือน/i);
  const periodInput = getByLabelText(/จำนวนเดือน/i);

  // Simulate user input events
  fireEvent.change(expenseInput, { target: { value: "15000" } });
  fireEvent.change(savingInput, { target: { value: "1000" } });
  fireEvent.change(periodInput, { target: { value: "6" } });

  // Check that the inputs update state correctly
  expect(expenseInput).toHaveAttribute("value", "15000");
  expect(savingInput).toHaveAttribute("value", "1000");
  expect(periodInput).toHaveAttribute("value", "6");

  // Check that the updateFields function is called with the correct arguments
  expect(updateFields).toHaveBeenCalledWith({ expense: 15000 });
  expect(updateFields).toHaveBeenCalledWith({ monthlySaving: 1000 });
  expect(updateFields).toHaveBeenCalledWith({ period: 6 });
});
