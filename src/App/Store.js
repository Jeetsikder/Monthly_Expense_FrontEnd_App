import { configureStore } from "@reduxjs/toolkit";
import generateSignUpRequestReducer from "../Features/SignUpForm_Slice";
import logInRequestReducer from "../Features/LoginForm_Slice";
import userStateReducer from "../Features/UserState";
import expenseReducer from "../Features/expense_Slice";
import GetAllExpenseReducer from "../Features/GetExpenses/GetAllExpenses";
import AddExpenseRequestReducer from "../Features/AddExpense";
import GetMonthExpenseRequestReducer from "../Features/GetExpenses/GetMonthExpense";
import GetdateExpenseRequestReducer from "../Features/GetExpenses/GetdateExpense";
import GetUserProfileRequestReducer from "../Features/GetUserProfile";
import UpdateCurrencyRequestReducer from "../Features/GetExpenses/Update/UpdateCurrency";

export default configureStore({
  reducer: {
    userState: userStateReducer,
    signUp: generateSignUpRequestReducer,
    login: logInRequestReducer,
    addExpense: AddExpenseRequestReducer,
    expense: expenseReducer,
    getAllExpenses: GetAllExpenseReducer,
    GetMonthExpense: GetMonthExpenseRequestReducer,
    GetdateExpense: GetdateExpenseRequestReducer,
    GetUserProfile: GetUserProfileRequestReducer,
    UpdateCurrency: UpdateCurrencyRequestReducer,
  },
});
