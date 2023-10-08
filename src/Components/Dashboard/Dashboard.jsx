import { useEffect } from "react";
import DisplayTotalExpense from "./Components/MonthlyExpense/DisplayTotalExpense";
import UserInfo from "./Components/UserInfo";
import { useDispatch, useSelector } from "react-redux";
import { GetAllExpense } from "../../Features/GetExpenses/GetAllExpenses";
import SetExpenseState from "./Hooks/SetExpenseState";
import AddExpenseForm from "./Components/AddExpenseForm";
import { getTokensFromLocalStorage } from "../../Utility/SaveGetCleanAccessTokenFromLoacl";

export default function Dashboard() {
  const getAllExpenses = useSelector((state) => state.getAllExpenses);
  const { loading: getAllExpensesLoading } = getAllExpenses;
  const getAllExpenses_statusCode = getAllExpenses.statusCode;
  const getAllExpenses_error = getAllExpenses?.error;
  const getAllExpenses_msg = getAllExpenses_error?.msg;

  //   # Redux state Save expense
  const { response: addExpenseRes } = useSelector((state) => state.addExpense);

  const dispatch = useDispatch();

  const { accessToken } = getTokensFromLocalStorage();

  // # Get all expense
  useEffect(() => {
    if (accessToken) {
      console.log(accessToken);
      dispatch(GetAllExpense());
    }
  }, [dispatch, addExpenseRes, accessToken]);

  // # All Expense state set
  SetExpenseState();

  return (
    <>
      <UserInfo />
      <AddExpenseForm />

      {getAllExpensesLoading ? (
        <h1 className=" text-2xl text-center font-bold">
          We are try to fetching your expense please wait..
        </h1>
      ) : (
        <></>
      )}
      {getAllExpenses_statusCode === 200 ? <DisplayTotalExpense /> : <></>}
      {getAllExpenses_statusCode !== 200 ? (
        <h2 className="text-lg text-center font-bold">{getAllExpenses_msg}</h2>
      ) : (
        <></>
      )}
    </>
  );
}
