import { createSlice } from "@reduxjs/toolkit";

export const expenseSlice = createSlice({
  name: "expenseState",
  initialState: {
    title: "All Expenses",
    filterAdd: "No filter add",
    totalExpenseAmount: 0,
    expenseList: {
      housing: {
        list: [],
        totalAmount: 0,
      },
      transportation: {
        list: [],
        totalAmount: 0,
      },
      foodAndGroceries: {
        list: [],
        totalAmount: 0,
      },
      others: {
        list: [],
        totalAmount: 0,
      },
    },
  },
  reducers: {
    setAddFilterNameExpenseState: (state, action) => {
      state.filterAdd = action.payload?.filterName;
    },
    setTitleOfExpense: (state, actions) => {
      state.title = actions.payload?.title;
    },
    setTotalExpense_AmountAndTitle: (state, actions) => {
      state.title = actions.payload?.title || "NAN";
      state.totalExpenseAmount = actions.payload?.total || 0;
    },
    setHousing: (state, actions) => {
      state.expenseList.housing.list = actions.payload?.list || [];
      state.expenseList.housing.totalAmount = actions.payload?.total || 0;
    },
    setTransportation: (state, actions) => {
      state.expenseList.transportation.list = actions.payload?.list || [];
      state.expenseList.transportation.totalAmount =
        actions.payload?.total || 0;
    },
    setFoodAndGroceries: (state, actions) => {
      state.expenseList.foodAndGroceries.list = actions.payload?.list || [];
      state.expenseList.foodAndGroceries.totalAmount =
        actions.payload?.total || 0;
    },
    setOthers: (state, actions) => {
      state.expenseList.others.list = actions.payload?.list || [];
      state.expenseList.others.totalAmount = actions.payload?.total || 0;
    },
  },
});

export const {
  setFoodAndGroceries,
  setHousing,
  setOthers,
  setTotalExpense_AmountAndTitle,
  setTransportation,
  setTitleOfExpense,
  setAddFilterNameExpenseState,
} = expenseSlice.actions;

export default expenseSlice.reducer;
