import { useEffect } from "react";
import UserInfo from "./Components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { GetAllExpense } from "../../Features/GetExpenses/GetAllExpenses";
import SetExpenseState from "./Hooks/SetExpenseState";
import { getTokensFromLocalStorage } from "../../Utility/SaveGetCleanAccessTokenFromLoacl";
import AddExpenseAndProgressBars from "./Components/AddExpenseAndProgressBars";

export default function Dashboard() {
  const getAllExpenses = useSelector((state) => state.getAllExpenses);
  const { loading: getAllExpensesLoading } = getAllExpenses;
  const getAllExpenses_statusCode = getAllExpenses?.statusCode;
  const getAllExpenses_error = getAllExpenses?.error;
  const getAllExpenses_msg = getAllExpenses_error?.msg;

  const dispatch = useDispatch();

  const { accessToken } = getTokensFromLocalStorage();

  // # Get all expense
  useEffect(() => {
    if (accessToken) {
      dispatch(GetAllExpense());
    }
  }, [dispatch, accessToken]);

  // # All Expense state set
  SetExpenseState();

  return (
    <>
      <UserInfo />

      {getAllExpensesLoading ? (
        <h1 className=" text-2xl text-center font-bold">
          We are try to fetching your expense please wait..
        </h1>
      ) : (
        <></>
      )}
      {getAllExpenses_statusCode === 200 && !getAllExpensesLoading ? (
        <AddExpenseAndProgressBars />
      ) : (
        <></>
      )}
      {getAllExpenses_statusCode !== 200 ? (
        <h2 className="text-lg text-center font-bold">{getAllExpenses_msg}</h2>
      ) : (
        <></>
      )}
    </>
  );
}
