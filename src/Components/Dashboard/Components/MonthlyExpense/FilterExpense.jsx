import React from "react";
import ByDate from "../../FilterExpense/ByDate";
import ByMonth from "../../FilterExpense/ByMonth";

export default function FilterExpense() {
  return (
    <>
      <section className=" ">
        <h1 className=" text-xl font-bold mx-auto w-4/5 ">Filter Expense</h1>
        <article className="flex flex-wrap justify-around items-center md:space-y-0 space-y-6">
          <div className="basis-full md:basis-1/3 ">
            <ByDate />
          </div>
          <div className="basis-full md:basis-1/3">
            <ByMonth />
          </div>
        </article>
      </section>
    </>
  );
}
