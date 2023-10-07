import React from "react";
import ProgressBarCustom from "../../../../../HelperComponents/ProgressBarCustom";
import { useSelector } from "react-redux";
import { totalExpenseMsg } from "../../../Helper/Functions";

export default function Housing() {
  // # Redux state
  const expense = useSelector((state) => state.expense);
  const expense_totalExpenseAmount = expense.totalExpenseAmount;
  const { housing } = expense.expenseList;
  const { totalAmount } = housing;

  // Calculate the percentage
  const calculatePercentage = (totalAmount / expense_totalExpenseAmount) * 100;

  return (
    <>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Housing
        </label>
        {/* Display the progress bar */}
        <div className="text-gray-900 text-lg">
          <ProgressBarCustom percentage={calculatePercentage} />
        </div>
        {/* Display the percentage */}
        <p className="text-sm text-gray-500 mt-1">
          {totalExpenseMsg(calculatePercentage)}
        </p>
      </div>
    </>
  );
}
