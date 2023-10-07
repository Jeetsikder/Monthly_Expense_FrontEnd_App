export const totalExpenseMsg = (overAllPercentage) => {
  const percentage = overAllPercentage.toFixed(2);
  const msg = " % of Total Expenses";
  const createMsg = percentage !== "NaN" ? percentage + msg : "0" + msg;
  return createMsg;
};
