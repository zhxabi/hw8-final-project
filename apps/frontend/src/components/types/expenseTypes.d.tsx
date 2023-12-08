import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ExpenseObj {
  expenseAmount: number
  owner: string
  comment? : string
  categories: [string]
  _id: number
  __v: number
  createdAt: Date
  updatedAt: Date
  sharedUsers: [String]
  sharedAmount: number
}

export interface UserObj {
  _id: number,
  username: string,
}

export interface MonthlySumObj {
  date: String
  dayTotal: Number
}

export interface YearlySumObj {
  month: String
  monthTotal: Number
}

// const initialState : ExpenseObj = {
//   expenseAmount: 0,
//   owner: "",
//   _id: -1,
//   __v: -1,
//   createdAt : new Date(),
//   updatedAt : new Date(),
// }

// export const expenseSlice = createSlice({
//   name: 'intro',
//   initialState,
//   reducers: {
//     setExpense: (state, action: PayloadAction<ExpenseObj>) => {
//       state = action.payload
//     },
//     setExpenseAmount: (state, action: PayloadAction<number>) => {
//       state.expenseAmount = action.payload
//     },
//     setOwner: (state, action: PayloadAction<string>) => {
//       state.owner = action.payload
//     },
//     setComment: (state, action: PayloadAction<string>) => {
//       state.comment = action.payload
//     },
//   },
// })

// export const { setExpense, setExpenseAmount, setOwner, setComment } = expenseSlice.actions
// // export const selectImg = (state: RootState) => state.intro.image
// // export const selectDescription = (state: RootState) => state.intro.description

// export default expenseSlice.reducer