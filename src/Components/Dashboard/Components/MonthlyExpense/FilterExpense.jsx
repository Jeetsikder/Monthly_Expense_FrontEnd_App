import React from "react";
import ByDate from "../../FilterExpense/ByDate";
import ByMonth from "../../FilterExpense/ByMonth";

export default function FilterExpense() {
  return (
    <>
      <section className="p-4 ">
        <h1 className=" text-lg">Filter Expense</h1>
        <article className="flex flex-wrap justify-center items-center ">
          <div className="basis-1/2">
            <ByDate />
          </div>
          <div className="basis-1/2">
            <ByMonth />
          </div>
        </article>
      </section>
    </>
  );
}
