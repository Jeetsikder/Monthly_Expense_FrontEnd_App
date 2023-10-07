import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFoodAndGroceries,
  setHousing,
  setOthers,
  setTotalExpense_AmountAndTitle,
  setTransportation,
} from "../../../Features/expense_Slice";

export default function SetExpenseState() {
  const getAllExpenses = useSelector((state) => state.getAllExpenses);
  const getAllExpenses_response = getAllExpenses?.response;
  const getAllExpenses_payload = getAllExpenses_response?.payload || [];

  const dispatch = useDispatch();

  return useEffect(() => {
    const transportationExpenses = getAllExpenses_payload.filter(
      (expense) => expense.category === "transportation"
    );
    const housingExpenses = getAllExpenses_payload.filter(
      (expense) => expense.category === "housing"
    );
    const foodAndGroceriesExpenses = getAllExpenses_payload.filter(
      (expense) => expense.category === "food and groceries"
    );
    const othersExpenses = getAllExpenses_payload.filter(
      (expense) => expense.category === "others"
    );

    // # Calculate the total amount for all expenses using reduce
    const totalExpenseAmount = getAllExpenses_payload.reduce(
      (total, expense) => Number(total) + Number(expense.amount),
      0
    );

    // # Total
    const transportationTotal = transportationExpenses.reduce(
      (total, expense) => Number(total) + Number(expense.amount),
      0
    );

    const housingTotal = housingExpenses.reduce(
      (total, expense) => Number(total) + Number(expense.amount),
      0
    );
    const foodAndGroceriesTotal = foodAndGroceriesExpenses.reduce(
      (total, expense) => Number(total) + Number(expense.amount),
      0
    );
    const otherTotal = othersExpenses.reduce(
      (total, expense) => Number(total) + Number(expense.amount),
      0
    );

    // # Set in Redux
    dispatch(
      setTotalExpense_AmountAndTitle({
        title: "Total Expense",
        total: totalExpenseAmount,
      })
    );
    dispatch(
      setTransportation({
        list: transportationExpenses,
        total: transportationTotal,
      })
    );
    dispatch(setHousing({ list: housingExpenses, total: housingTotal }));
    dispatch(
      setFoodAndGroceries({
        list: foodAndGroceriesExpenses,
        total: foodAndGroceriesTotal,
      })
    );
    dispatch(setOthers({ list: othersExpenses, total: otherTotal }));
  });
}
