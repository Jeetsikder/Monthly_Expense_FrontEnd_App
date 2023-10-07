import React from "react";
import Housing from "./Components/DisplayTotalExpense/Housing";
import Transportation from "./Components/DisplayTotalExpense/Transportation";
import FoodAndGroceries from "./Components/DisplayTotalExpense/FoodAndGroceries";
import Others from "./Components/DisplayTotalExpense/Others";
import { useSelector } from "react-redux";
import FilterExpense from "./FilterExpense";

export default function DisplayTotalExpense() {
  const expense = useSelector((state) => state.expense);
  const expense_title = expense?.title;
  const expense_filterAdd = expense?.filterAdd;
  const expense_totalExpenseAmount = expense?.totalExpenseAmount;

  //   # Redux state Save expense
  const { response: addExpenseRes } = useSelector((state) => state.addExpense);
  return (
    <>
      <section className=" h-fit bg-gray-100">
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold mb-6">
            {expense_title + " => "}
            {expense_totalExpenseAmount}{" "}
            {addExpenseRes ? (
              <span className="text-base font-bold text-red-600 ease-in-out duration-500">
                New Add
              </span>
            ) : (
              <></>
            )}
          </h2>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className=" text-lg text-yellow-600">{expense_filterAdd}</h1>
            {/* housing */}
            <Housing />

            {/* transportation */}
            <Transportation />

            {/* food and groceries */}
            <FoodAndGroceries />

            {/* others */}
            <Others />
          </div>
        </div>
        {/*  Add Filter */}
        <div>
          <FilterExpense />
        </div>
      </section>
    </>
  );
}
