import React, { useEffect, useState } from "react";
import DisplayTotalExpense from "./MonthlyExpense/DisplayTotalExpense";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseDetails from "./MonthlyExpense/ExpenseDetails";
import { useSelector } from "react-redux";

export default function AddExpenseAndProgressBars() {
  const getAllExpenses = useSelector((state) => state.getAllExpenses);
  const getAllExpenses_response_payload = getAllExpenses?.response?.payload;
  const [mappedExpenses, setMappedExpenses] = useState([]);

  useEffect(() => {
    if (getAllExpenses_response_payload) {
      setMappedExpenses(getAllExpenses_response_payload);
    }
  }, [getAllExpenses_response_payload]);
  return (
    <>
      <section className="bg-gray-100 px-3 md:px-6 py-5 md:py-7 flex flex-wrap justify-center items-start  ">
        <div className="basis-full md:basis-1/3 ">
          <DisplayTotalExpense />
        </div>
        <div className="basis-full md:basis-2/3">
          <AddExpenseForm />
        </div>
        <div className="basis-full space-y-6">
          <h1 className=" text-2xl font-bold mt-3 ">Expense list</h1>
          {mappedExpenses.length > 0 ? (
            [...mappedExpenses]
              .reverse()
              .map((element, index) => (
                <ExpenseDetails
                  category={element?.category}
                  date={element?.date}
                  amount={element?.amount}
                  index={index}
                  key={element?.category + element?.date + index}
                />
              ))
          ) : (
            <></>
          )}
        </div>
      </section>
    </>
  );
}
