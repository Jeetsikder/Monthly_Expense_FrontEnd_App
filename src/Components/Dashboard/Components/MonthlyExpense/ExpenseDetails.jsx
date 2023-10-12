import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

const ExpenseDetails = ({ category, date, amount, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // # Currency symbol
  const userCurrency =
    useSelector((state) => state.GetUserProfile).response?.payload?.currency
      .symbol || "&#36";

  const handleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className=" flex flex-col justify-between border-b border-gray-200 px-2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col relative ">
          <h3 className="text-gray-700 text-lg font-bold">
            {category}{" "}
            {index < 3 &&
            new Date(date).toDateString() === new Date().toDateString() ? (
              <span className="font-bold text-sm text-red-700 absolute -top-3 -right-12">
                New add
              </span>
            ) : (
              <></>
            )}
          </h3>

          <p className="text-gray-500 text-sm">
            {new Date(date).toDateString()}
          </p>
          <p className="text-gray-500 text-sm">
            {new Date(date).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex flex-col justify-end self-start">
          <p className="text-gray-700 text-lg font-bold">
            <span dangerouslySetInnerHTML={{ __html: userCurrency }}></span>
            {"  "}
            {Number(amount) <= 9 ? "0" + Number(amount) : Number(amount)}
          </p>
        </div>
      </div>
      <div className={`mt-4 ${isExpanded ? "block" : "hidden"}`}>
        <p className="text-gray-500 text-sm">
          Expense details not available right now.
        </p>
      </div>
      <div className="flex flex-row justify-end">
        <button
          className="text-gray-700 text-sm font-bold"
          onClick={handleExpand}
        >
          {isExpanded ? "Collapse" : "Expand"}
        </button>
      </div>
    </div>
  );
};

export default ExpenseDetails;
